import React from 'react';
import {withRouter} from 'react-router-dom';
import {Modal} from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {formateDate} from '../../utils/dateUtils';
import menuList from '../../config/menuList';
import LinkButton from '../../components/link-button';
import './index.less';
//  头部信息
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentDate : formateDate(Date.now()),
            dayPictureUrl: 'https://hao1.qhimg.com/d/inn/52059c57ec88/weather/1.png',
            weather : '晴'
        }
    }
    // 更新时间
    getTime = ()=>{
        this.timer = setInterval(()=>{
            let currentDate = formateDate(Date.now());
            this.setState({currentDate});
        },1000);
    }
    logout = (e) => {   // 退出登录
        e.preventDefault();
        Modal.confirm({
            content:"你确定要退出？",
            onOk:()=>{
                storageUtils.removeUser();
                memoryUtils.user = {id:null};
                this.props.history.replace('/login');
            }
        });
    }
    getTitle = ()=>{
        const path = this.props.location.pathname; // 获取当前的路径
        
        let title;
        menuList.forEach((item)=>{
            if(item.key === path){
                title = item.title
            }else if(item.children){
                let cItem = item.children.find(cItem =>{
                    // console.log('cItem: ',cItem.key);
                    return path.indexOf( cItem.key)===0
                })
                if(cItem){
                    title = cItem.title
                }
            }
        });
        return title;
    }
    /*
        第一次执行render 时候调用
    */ 
    componentDidMount(){
        this.getTime();
        this.getTitle();

    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    render(){  
        const uname = memoryUtils.user.uname; // 去内存中获取用户名
        const {dayPictureUrl,weather,currentDate} =this.state;
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎: {uname}</span>
                    {/* <a href="#" onClick={this.logout}>退出</a> */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentDate}</span>
                        <img src={dayPictureUrl} alt="晴"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
            )
        }
}
export default withRouter(Header);