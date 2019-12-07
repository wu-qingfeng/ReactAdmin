import React from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
} from 'antd'

const Item = Form.Item  


class AddForm extends React.Component{
    static propTypes = {
        setForm: PropTypes.func.isRequired      // 用来传递对象的函数
    }
    componentWillMount(){
        this.props.setForm(this.props.form) // 调用父组件的函数传递form
    }
    render(){
        const {getFieldDecorator} = this.props.form 
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
               <Item label="角色名称">
               {
                    getFieldDecorator('roleName',{
                        initialValue:'',
                        rules:[
                            {required:true,message:"角色名称不能为空！"}
                        ]
                    })(
                        <Input placeholder='请输入角色名称'/>
                    )   
                }       
               </Item>
           </Form>
        )
    }
}
export default Form.create()(AddForm);