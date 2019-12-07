import React from 'react';
import { 
    Form,
    Icon,
    Input, 
    Button,
    message
} from 'antd';
import {Redirect} from 'react-router-dom';//引入路由
import './login.less';
import logo from '../../assets/image/logo.jpg';
import {reqLogin} from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from  '../../utils/storageUtils';

/*
    登录的路由组件
*/

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            myClear:null
        }
    }

  handleSubmit = (even)=>{
    // 阻止事件的默认行为；
    even.preventDefault();  
      
    this.props.form.validateFields(async (err, values)=>{
        if(!err){
            var {username,password} = values;
            // console.log(username,password);
            // console.log('提交Ajax请求数据: ', values.data);
            
            const result = await reqLogin(username,password);  // {status:0, data:}
            // console.log('login:　',result);
            if (result.err===0) { // 登录成功
                message.success(result.msg);
                
                // 保存user
                const user = result.data[0];

                // console.log(user);
                memoryUtils.user = user  // 保存在内存中

                // console.log("memoryUtils",memoryUtils);
                storageUtils.saverUser(user)
                // 跳转到管理界面 (不需要在回退到登录)
                this.props.history.replace('/');
               
            }else{ // 登录失败
                // 提示错误信息
                message.error(result.msg)
            }

            // console.log(response.data); 

        }else{
            console.log('检验失败！');
        }
    });
      // 得到form对象
    //   const form = this.props.form;
    //   // 获得表单项的输入数据
    //   const values =form.getFieldsValue();
    //   console.log(values);

      // 对表单进行教证
      
    }
  /*
    密码验证

  */
  validatePwd = (rule,value,callback)=>{
    if(/^\s+$/.test(value) || !value){
        callback("密码不能为空！");
    }else if(value.length <=4 ){
        callback("密码不能小于4位字符！")
    }else if(value.length >= 12){
        
        callback("密码长度不能大于12位字符！");
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
        callback("用户密码必须是字母、数子或下划线，组成");
    }else{
        callback(); // 验证通过
    }
  }


  render(){
    // 如果用户已经登录，自动跳转到管理界面
    const user = memoryUtils.user;
    if(user && user.id != null){ // 没有值不进来
       return <Redirect to='/' /> 
    }
    let {getFieldDecorator} = this.props.form;
    return (
           <div className='login'>
               <header className="login-header">
                    <img  src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
               </header>
               <section className="login-content">
                    <h2>用户登陆</h2>
                    <div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
           {
               getFieldDecorator("username",{
                    rules:[
                        {required:true,whitespace:true,message:"用户名不能为空！"},
                        {min:2,message:'用户名不能小于2位字符！'},
                        {max:12,message:'用户名不能超过12位字符！'},
                        {pattern:/^[(a-zA-Z0-9_)|(\u4e00-\u9fa5)]+$/,message:"不能使用特殊字符"}
                    ],
                    initialValue:"admin"
               })(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
               )
           }
        </Form.Item>
        <Form.Item>
            {
                getFieldDecorator("password",{
                    rules:[
                        {
                            validator:this.validatePwd
                        }
                    ]
                })(
                    <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
                )
            }
        
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 陆
          </Button>
        </Form.Item>
      </Form>
                    </div>
               </section>
           </div>
         )
    }
}
const WarpLogin = Form.create({name:'normal_login'})(Login);



export default WarpLogin;