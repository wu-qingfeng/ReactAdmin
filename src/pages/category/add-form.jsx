import React from 'react'
import PropType from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item  
const Option = Select.Option

class AddForm extends React.Component{
    static propTypes = {
        categorys: PropType.array.isRequired,  // 一级分类的数组
        parentId: PropType.string.isRequired,  // 父分类的ID
        setForm: PropType.func.isRequired      // 用来传递对象的函数
    }
    componentWillMount(){
        this.props.setForm(this.props.form) // 调用父组件的函数传递form
        // console.log('添加组件 id：',this.props.categorys);
        console.log(this.props.parentId);
    }
    render(){
        const {getFieldDecorator} = this.props.form 
        const {categorys,parentId} = this.props
        return (
           <Form>
               <Item>
                   {
                    getFieldDecorator('parentId',{
                        initialValue : parentId
                    })(
                        <Select>
                            <Option value='0'>一级分类</Option>
                            {categorys.map((c)=>
                            <Option key={c.id} value={c._id}>{c.names}</Option>
                            )}
                        </Select>
                    )   
                   }                    
               </Item>
               <Item>
               {
                    getFieldDecorator('categoryName',{
                        initialValue:'',
                        rules:[
                            {required:true,message:"添加内容不能为空！"}
                        ]
                    })(
                        <Input placeholder='请输入添加内容'/>
                    )   
                }                      
               </Item>
           </Form>
        )
    }
}
export default Form.create()(AddForm);