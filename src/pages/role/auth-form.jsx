import React,{PureComponent} from 'react'
import PropType from 'prop-types'
import {
    Tree,
    Form,
    Input,
} from 'antd'
import menuList from '../../config/menuList.js'


const {TreeNode} = Tree

const Item = Form.Item  

/*
    PureComponent 数据没更新的话不会渲染 render
    PureVomponent 基本原理：
    原理：重写shouldComponentUpdate(),判断如果数据有变化返回true，否则返回false
*/
export default class AddForm extends PureComponent{
    static propTypes = {
        role: PropType.object
    }

    constructor(props){
        super(props)
        // 根据传入角色的menus生成初始状态
        const {menus} = this.props.role
        this.state = {
            checkedKeys: menus
        }
    }

    // 为父组件提交取最新menus数据的方法
    getMenus = ()=> this.state.checkedKeys

    getTreeNodes = (menuList) => {
        //console.log(menuList);
        return menuList.reduce((pre,item) => {
            /*    如果有item.children 就递归      */ 
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    { item.children ? this.getTreeNodes(item.children) : null }
                </TreeNode>
            )
            return pre
        },[])
    }
    // 选中某个node时的回调
    onCheck = checkedKeys => {
        // console.log('checkedKeys',checkedKeys);
        this.setState({
            checkedKeys
        })
    }
    componentWillMount () {
        this.treeNodes = this.getTreeNodes(menuList);
    }
    // 根据新传入的role来更新checkdKeys状态
    /*
        当组件接收到新的属性时自动调用 
    */
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps()',nextProps);
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys: menus
        })
    }

    render () {
        console.log('AuthForm render()');
        const {role} = this.props;
        const {checkedKeys} = this.state

        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
              span: 16
            },
          };

        return (
           <div>
               <Item {...formItemLayout} label="角色名称">
                    <Input value={role.uname} disabled />     
               </Item>
               <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    selectedKeys={role.menus}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
           </div>
        )
    }
}
