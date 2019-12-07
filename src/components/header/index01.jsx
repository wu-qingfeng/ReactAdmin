import React from 'react';
import {withRouter} from 'react-router-dom';
import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {reqWeather} from '../../api';
import menuList from '../../config/menuList';
import {Modal} from 'antd';
import './index.less';

//  头部信息
class Header extends React.Component{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         // currentTime : formateDate(Date.now()), // 当前事件字符串
    //         currentTime:formateDate(Date.now()),
    //         dayPictureUrl: 'https://hao1.qhimg.com/d/inn/52059c57ec88/weather/1.png',//图片路劲
    //         weather: '雾'
    //     }
    // }
    state = {
        // currentTime : formateDate(Date.now()), // 当前事件字符串
        currentTime:formateDate(Date.now()),
        dayPictureUrl: 'https://hao1.qhimg.com/d/inn/52059c57ec88/weather/1.png',//图片路劲
        weather: '雾'
    }
    getTime = () => {
        // 每隔一秒种获取当前时间，并更新状态数据currentTime
        this.timer = setInterval(()=>{
            let currentTime = formateDate(Date.now());
            this.setState({currentTime})
        },1000)
    }
    getWeather = async () => {
        // 调用接口请求异步获取数据
        // const {daypictureUrl,weather} = await reqWeather("广州");
        // // 更新状态
        // this.setState({daypictureUrl,weather})
    }
    getTitle = ()=>{
        //得到当前请求路劲
        const path = this.props.location.pathname;
        let title ;
        menuList.forEach(item=>{
            if(item.key === path){  // 如果当前item对象的key与path一样，item的title就是需要显示title
                title = item.title ;
            }else if(item.children){
                // 在所有子的item中查找匹配的title
                const cItem = item.children.find(cItem => cItem.key===path);
                if(cItem){
                    title = cItem.title ; 
                }
            }
        })
        return title
    }
    //退出登录方法
    logout = (e) => {
        e.preventDefault();

        // 显示对话框
        Modal.confirm({
            content: '你确定退出吗？',
            onOk: ()=>{
                // 删除内存中的值
                storageUtils.removeUser();
                memoryUtils.user = {};
                debugger
                // 跳转到登录页面
                this.props.history.replace('/login');
            }
        });
    }
    /**
     * 第一次render()之后执行一次
     * 一般在此执行异步操作：发ajax请求/启动定时器
    */
    componentDidMount(){
        this.getTime();
        // 发起请求 获取天气信息
        // this.getgetWeather("广州")
    }
    componentWillUnmount(){
        console.log("最后执行");
        clearInterval(this.timer);
        this.timer = null;
    }
    render(){
        // 取出title
        const title = this.getTitle();
        const {currentTime,dayPictureUrl,weather} = this.state;
        const uname = memoryUtils.user.uname;   
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎: {uname}</span>
                    <a href="#" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="晴"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
            )
        }
}
export default withRouter(Header);