import React from 'react';
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd';
import UserForm from './user-form';
import {formateDate} from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import {PAGE_SIZE} from '../../utils/constants';
import { reqUsers, reqDeleteUsers, reqAddOrUpdateUsers } from '../../api/index';

export default class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],      // 所有用户列表
            roles: [],      // 所有角色列表
            isShow: false   // 是否显示 确认框 
        }
    }
    
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'role_uname'    
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: '所属角色',
                dataIndex: '_id',
                render:(_id)=>this.roleNames[_id]
            },
            {
                title: '操作',
                render: (user)=>(
                    <span>
                        <LinkButton onClick={()=>{this.showUpdate(user)}}>修改</LinkButton>
                        <LinkButton
                           onClick={()=>{this.deleteUsers(user)}}
                        >删除</LinkButton>
                    </span>
                )
            }
        ]
    }
    /*
        根据role的数组，生成包含所有角色名对象(属性名用角色id值)
    */
    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre,role) => {
            pre[role._id] = role.uname;
            return pre
        },{})
        // 保存
        this.roleNames = roleNames
    }
    // 显示更新用户界面
    showUpdate = (user) => {
        this.user = user;
        this.setState({isShow:true});
    }

    /*
        添加、更新用户
    */
    addOrUpdateUser = async () => {
        // 1. 收集输入数据
        const user = this.form.getFieldsValue();
        
        // 如果是更新，需要给user指定_id属性
        if(this.user){
            user._id = this.user._id;
        }
        //console.log('this.form',user);
        // 2. 提交添加到请求
        const result = await reqAddOrUpdateUsers(user);
        // console.log(result);
        if(result.status === 200){
            // 3. 更新列表显示
            if(result.data===0){
                this.getUsers();
                this.setState({isShow:false})
                message.success(`${this.user._id?'修改':'添加'}成功！`)
                this.form.resetFields();        // 清除输入数据
            }else{
                message.error(result.uname + ' 已经被注册过了')
            }
        }else{
            message.error("添加失败！")
        }
    }
    // 删除指定用户
    deleteUsers = (user) => {
        Modal.confirm({         //  弹出确认框 是否要删除
            content: `你确定要删除 : ${user.role_uname}`,
            okText: "确定",
            cancelText:"取消",
            onOk: async ()=>{
                const result = await reqDeleteUsers(user._id);
                if(result.status === 200){
                    message.success('删除成功！');
                    this.getUsers();
                    // console.log(result);
                }
            }
        })
    }
    showAdd = () => {
        this.user = {}
        this.setState({isShow:true})
    }
    /*
        获取所有的用户数据
    */
    getUsers = async () => {
        const result = await reqUsers();
        if(result.status === 200){
            var {users, roles} = result.data;
            //console.log("getUser: ",result);
            this.initRoleNames(roles);
            this.setState({
                users,
                roles
            });
        }
    }



    componentDidMount () {
        this.getUsers();
    }
    componentWillMount () {
        this.initColumns();
    }

    render(){
        const {users,isShow,roles} = this.state;
        const user = this.user || {};
        // console.log('user',user);
        //console.log('users',users);
        const title=<Button 
                        type='primary' 
                        onClick={()=>{this.showAdd()}}
                    >创建用户</Button>;

        return (
            <Card title={title}>
                <Table
                    bordered
                    onRow={this.onRow}
                    rowKey="_id"
                    dataSource={ users }
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                />
                <Modal
                    title={user._id?"修改用户":"添加用户"}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={()=>{
                        this.form.resetFields()
                        this.setState({isShow:false})
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <UserForm
                      setForm={ form => this.form=form }
                      user={user} roles={roles}
                    />
                </Modal>
            </Card>
        )
    }
}
