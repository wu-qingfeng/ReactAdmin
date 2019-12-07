import React from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import {Layout} from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header/index';

import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const {Footer,Sider,Content} = Layout;
/*
    后台管理的路由组件
*/
class Admin extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render(){
        const user = memoryUtils.user;
        // 如果内存中没有存储user ==> 当前没有登录
        
        if(!user || !user.id){
            // 自动跳转到登录页面去
            // this.props.history.push('/login');
            return <Redirect to='/login' />
        }
        
        return (
            <Layout style={{minHeight:"100%"}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:20,height:'100%',background:"#fff"}}>
                        {/* 配置路由显示在内容区 */}
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Redirect to='home' /> {/* 默认在Home 组件 */}
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:"center",fontSize:"13px",color:"#ccc"}}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
export default Admin;