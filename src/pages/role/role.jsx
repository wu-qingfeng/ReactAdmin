import React from 'react';
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd';
import {PAGE_SIZE} from '../../utils/constants.js';
import {reqRoles,reqAddRole,reqUpdateRole} from '../../api';
import AddForm from './add-form';
import AuthForm from './auth-form';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {formateDate} from '../../utils/dateUtils';
/*
 *  角色路由 
*/

class Role extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            roles: [],  // 所有角色的列表
            role: {},    // 选中的role
            isShowAdd: false,    // 是否显示添加
            isShowAuth:false,    // 是否显示设置权限
        }
        this.auth = React.createRef();
    }
    /*
        初始化数据
    */
    initColumn = () => {
        this.columns = [
            {
              title: '角色名称',
              dataIndex: 'uname',
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
              render: create_time => formateDate(create_time)
            },
            {
              title: '授权时间',
              dataIndex: 'auth_time',
              render: formateDate
            },
            {
              title: '授权人',
              dataIndex: 'auth_name',
            },
        ];
    }
    /*
        请求获取到角色列表数据
    */
    getRoles = async () => {
        const result = await reqRoles();
        if(result.status === 200){
            const roles = result.data;
            console.log("roles",roles);
            //console.log(roles)
            this.setState({ 
                roles
            })
        }
    }

    onRow = (role) => {
        return {    // 点击行
            onClick: event =>{
                // console.log('row onClick',role);
                // alert('点击行');
                this.setState({
                    role
                })
            }
        }
    }
    // 添加角色
    addRole = () => {   
        // 进行表单验证，只能通过向下执行
        this.form.validateFields( async (error,values)=>{
            if(!error){
                // 收集输入数据  
                const {roleName} = values;
                // 获取去当前登陆用户id
                const role_id = memoryUtils.user.role_id;
                // this.form.resetFields();     // 不能删除数据了                     
                // 请求添加 
                const result = await reqAddRole(roleName,role_id);
                // console.log('添加角色: ',result);
                if(result.status === 200){
                    // 根据结果提示、更新列表显示
                    message.success("添加角色成功！");
                    const role = result.data;
                    /*  // react 老的做法
                    const roles = this.state.roles;
                    roles.push(role) 
                    this.setState({
                        isShowAdd: false,
                        roles
                    })*/
                    // 更新roles状态，基于原本状态数据更新
                    this.setState((state/*,props*/) => ({
                        isShowAdd: false,
                        roles: [...state.roles,role]
                    }))
                    
                }else{
                    message.error("添加角色失败！");
                }
            }
        });
    }
    /*
    *  更新角色
    */
    updateRole = async () => {
        const role = this.state.role;
        this.setState({
            isShowAuth: false   // 隐藏确认框
        })
        // 得到最新的menus  、时间、授权人  
        const menus = this.auth.current.getMenus();
        role.menus = menus
        role.auth_time = Date.now();
        role.auth_name = memoryUtils.user.uname;
        // 发请求更新
        const result = await reqUpdateRole(role);
    
        if(result.status===200){
            //this.getRoles();        // 重新获取数据
            if ( role._id === memoryUtils.user._id ) {
                memoryUtils.user = {};
                storageUtils.removeUser();
                this.props.history.replace('/login');
            } else {
                message.success('设置角色权限成功！');
                this.setState({
                    roles:[...this.state.roles]
                });
            }
        }else{
            message.error('设置角色权限失败！');
        }
    }
    componentWillMount(){
        this.initColumn();
    }
    componentDidMount(){
        this.getRoles();
    }
    render(){
        

        const {roles,role,isShowAdd,isShowAuth} = this.state;
        // console.log('role',role);

        const title = (
            <span>
                <Button 
                    type="primary" 
                    style={{marginRight:10}} 
                    onClick={()=>{this.setState({isShowAdd:true})}}
                >创建角色</Button>
                <Button 
                    type="primary"
                    disabled={!role._id}
                    onClick={()=>{this.setState({isShowAuth:true})}}
                >设置角色的权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Modal 
                    visible={false}
                ></Modal>
                <Table
                     bordered
                     rowSelection={{
                        type:'radio',
                        selectedRowKeys:[role._id],
                        onSelect:(role)=>{  // 选择某个radio时回调
                            //console.log(role);
                            this.setState({
                                role
                            })
                        }
                    }}
                     onRow={this.onRow}
                     rowKey="_id"
                     dataSource={ roles }
                     columns={this.columns}
                     pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={()=>{
                        this.setState({isShowAdd: false})
                        this.form.resetFields();    // 清除未保存的数据
                    }}
                    >
                    <AddForm 
                        setForm= {(form)=>{this.form = form}}
                    />
                </Modal>
                
                <Modal
                    title="设置角色的权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={()=>{
                        this.setState({isShowAuth: false})
                      }}
                    >
                    <AuthForm ref={this.auth} role={role} />
                </Modal>
            </Card>
            )
        }
}
export default Role;