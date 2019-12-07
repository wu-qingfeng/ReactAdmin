import React from 'react';
import logo from '../../assets/image/logo.jpg';
import {Link,withRouter} from 'react-router-dom';
import { Menu, Icon} from 'antd';
import menuList from '../../config/menuList';  // 引入menuList对象
import memoryUtils from '../../utils/memoryUtils';

import './index.less';

const {SubMenu} = Menu;
// 左侧导航的组件
class LeftNav extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    /*
        判断当前登录用户对item是否有权限
    */
    hasAuth = (item) => {
        const {key,isPublic} = item
        const {menus} = memoryUtils.user  // role.menus
        const uname = memoryUtils.user.uname
        // 1. 如果当前的用户是admin
        // 2. 如果当前的item是公开的
        // 3. 当前用户有此item的权限：key有没有menus中
        if(uname==="admin" || uname==='xiaowu' || isPublic || menus.indexOf(key) !== -1){
            return true
        } else if(item.children){  //  如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.indexOf(child.key)!==-1)
        }
        //console.log("menus: ",menus);
        return false;
    }
    getMenuNode_map = (menuList) => {
        /*
            1.根据menu的数据数组生成对应的标签数组
            2.使用 map() 和 递归 调用
        */
        return menuList.map(item => {
            if(!item.children){
                return (
                <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
                )
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                    { this.getMenuNodes(item.children)/* 递归调用 */ }
                    </SubMenu>
                )
            }            
        })
    }
    getMenuNodes = (menuList)=>{
         // 得到当前的路由路劲
         const path = this.props.location.pathname;
        /*
            1.根据menu的数据数组生成对应的标签数组
            2.使用 reduce() 和 递归 调用
        */
        return menuList.reduce((pre,item)=>{
            // 如果当前用户有item对应的权限，才需要显示对应的菜单项
            if (this.hasAuth(item)) {
                // 向pre添加<Menu.Item>
                if(!item.children){
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }else{
                    // 查找一个当前请求路劲匹配的了Item
                    const cItem = item.children.find( cItem => path.indexOf(cItem.key)===0)
                    // 如果存在，说明当前item的子列表需要打开
                    if(cItem){
                        this.openKey = item.key
                    }
                    // 向pre添加<SubMenu.Item>
                    pre.push((
                        <SubMenu
                            key={item.key}
                            title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                            }
                        >
                            { this.getMenuNodes(item.children) }
                        </SubMenu>
                    ))
                }
            }
            return pre;
        },[])
    }
    // 在第一次render()之前执行一次
    // 为第一次render()准备数据(必须同步的)
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
        // console.log(this.props);
    }

    render(){
        // 得到当前的路由路劲
        let path = this.props.location.pathname;
        
        if(path.indexOf('/product')===0){   // 当前请求路由或子路界面
            path = '/product';
        }
        // console.log('render',path);
        // 得到需要打开菜单的key
        const openKey =this.openKey;
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu  
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={[openKey]}
                    selectedKeys={[path]}
                >
                {/* <Menu.Item key="1">
                    <Link to='/home'>
                        <Icon type="home" />
                        <span>首页</span>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                    <span>
                        <Icon type="appstore" />
                        <span>商品</span>
                    </span>
                    }
                >
                    <Menu.Item key="5">
                        <Link to='/category'>
                            <Icon type='bars' />
                            <span>品类管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to='/product'>
                            <Icon type='tool' />
                            <span>商品管理</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="2">
                    <Link to='/user'>
                        <Icon type="user" />
                        <span>用户管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to='/role'>
                        <Icon type="team" />
                        <span>角色管理</span>
                    </Link>
                </Menu.Item>
                
                <SubMenu
                    key="sub2"
                    title={
                    <span>
                        <Icon type="appstore" />
                        <span>图形图表</span>
                    </span>
                    }
                >
                    <Menu.Item key="7">
                        <Link to='bar'>
                            <Icon type='bar-chart' />
                            <span>柱形图</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to='line'>
                            <Icon type='line-chart' />
                            <span>折线图</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Link to='pie'>
                            <Icon type='pie-chart' />
                            <span>饼图</span>
                        </Link>
                    </Menu.Item>
                </SubMenu> */}

                {
                    // this.getMenuNode_map(menuList)
                    // this.getMenuNodes(menuList)
                    this.menuNodes
                }
            </Menu>
            </div>
        )
    }
}
/**
 *  高阶组件  
 *  withRouter 包装非路由组件，返回一个新的组件
 *  新组件向非路由组件传递3个属性：history/Location/watch
 */
export default withRouter(LeftNav);