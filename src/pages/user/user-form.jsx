import React,{PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Select
} from 'antd'

const Item = Form.Item  
const {Option} = Select


class UserForm extends PureComponent{
    static propTypes = {
        setForm: PropTypes.func.isRequired,      // 用来传递对象的函数
        roles: PropTypes.array.isRequired,       // 用来传递数组
        user: PropTypes.object
    }
    componentWillMount(){
        this.props.setForm(this.props.form) // 调用父组件的函数传递form
        console.log("userForm",this.props.user);
    }
    render(){
        const {getFieldDecorator} = this.props.form 
        const {roles,user} = this.props
        // console.log(roles)
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
              span: 16
            },
          };
        return (
           <Form {...formItemLayout}>
               <Item label="用户名">
               {
                    getFieldDecorator('uname',{
                        initialValue: user.role_uname,
                        rules:[
                            {required:true,message:"用户名不能为空！"}
                        ]
                    })(
                        <Input placeholder='请输入角色名称'/>
                    )   
                }       
               </Item>
               {
                   user._id ? null : (
                    <Item label="密码">
                    {
                            getFieldDecorator('password',{
                                initialValue: user.password,
                                rules:[
                                    {required:true,message:"密码不能为空！"}
                                ]
                            })(
                                <Input type="password" placeholder='请输入密码'/>
                            )   
                        }       
                    </Item>
                   )
               }
               
               <Item label="手机号">
               {
                    getFieldDecorator('phone',{
                        initialValue: user.phone,
                        rules:[
                            {required:true,message:"手机号不能为空！"}
                        ]
                    })(
                        <Input placeholder='请输入手机号'/>
                    )   
                }       
               </Item>
               <Item label="邮箱">
               {
                    getFieldDecorator('email',{
                        initialValue: user.email,
                        rules:[
                            {required:true,message:"email不能为空！"}
                        ]
                    })(
                        <Input type="email" placeholder='请输入邮箱'/>
                    )   
                }       
               </Item>
               <Item label="角色">
               {
                    getFieldDecorator('role',{
                        initialValue: user._id,
                        rules:[
                            {required:true,message:"email不能为空！"}
                        ]
                    })(
                        <Select placeholder="Select a person">
                            {
                               roles.map(role=><Option key={role._id} value={role._id}>{role.uname}</Option>)
                            }
                        </Select>
                    )   
                }       
               </Item>
           </Form>
        )
    }
}
export default Form.create()(UserForm);