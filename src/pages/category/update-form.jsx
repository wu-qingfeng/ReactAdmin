import React from 'react'
import PropType from 'prop-types'
import {
    Form,
    Input
} from 'antd'

const Item = Form.Item  

class UpdateForm extends React.Component{
    
    static propType = {
        categoryName : PropType.string.isRequired,
        setForm : PropType.func.isRequired
    }
    
    componentWillMount () {
        // 将form对象通过setForm() 传递给父组件
        this.props.setForm(this.props.form)
    }

    render(){
        const {categoryName} = this.props
        const {getFieldDecorator} = this.props.form 
        // console.log('123: ', categoryName);
        return (
           <Form>
               <Item>
               {
                    getFieldDecorator('categoryName',{
                        initialValue: categoryName,
                        rules:[
                            {required:true,message: "分类名称必须输入"}
                        ]
                    })(
                        <Input placeholder='请输入更新内容' />
                    )   
                }                      
               </Item>
           </Form>
        )
    }
}
export default Form.create()(UpdateForm);