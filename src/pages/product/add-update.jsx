import React from 'react';
import RichTextEditor from './rich-text-editor';
import {
    Card,
    Form,
    Input,
    Cascader,
    Icon,
    Button,
    message
} from 'antd';
import LinkButton from '../../components/link-button';
import {reqCategorys,reqAddOrUpdateProduct} from '../../api';
import PicturesWall from './pictures-wall';


const {Item} = Form;
const {TextArea} = Input;
/**
 *  Product的添加和更新的子路由组件
 */ 
class ProductAddUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            options: [],
        }
        this.pw = React.createRef();
        this.editor = React.createRef();
    }

    /*
        验证价格的自定义验证函数
    */ 
   validatePrice = (rule,value,callback) => {
        // console.log(value);
        if(value * 1 > 0){
            // 验证通过就调用
            callback();      
        }else{
            // 回调有内容不通过
            callback("商品价格必须大于0！")   
        }
   }
    
    submit = () => {
        // 进行表单验证，如果通过了，才发送请求
        this.props.form.validateFields( async (error,values)=>{
            if(!error){  
                
                // 1：收集数据
                const {names,goods,price,categoryIds} = values;
                let pCategoryId,categoryId ;
                if (categoryIds.length === 1){
                    pCategoryId = 0;
                    categoryId = categoryIds[0];
                } else {
                    pCategoryId = categoryIds[0];
                    categoryId = categoryIds[1];
                }
                var imgs = this.pw.current.getImgs();
                var detail = this.editor.current.getDetail();
                const product = { names, goods, price, imgs, detail, pCategoryId, categoryId}
                console.log(product);
                // 如果是更新，需要添加_id
                if(this.isUpdate){
                    product._id = this.product.pCategoryId;
                }

                // 2: 调用用接口请求函数去添加、更新
                const result = await reqAddOrUpdateProduct(product);
                console.log("result: ",result);
                // 3: 根据结果提示
                if(result.status === 200){
                    message.success(result.msg);
                    this.props.history.goBack();    
                }else{
                    message.error(result.msg);
                }
            }
        })
    }
    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map((c)=>({
            value: c._id,
            label: c.names,
            isLeaf: false,   // 不是叶子
        }));
        // 如果是二级分类商品的更新
        const {isUpdate,product} = this;
        const {pCategoryId,/*categoryId*/} = product;
        // 获取对应的二级分类列表
        if(isUpdate && pCategoryId !== 0){
            // 获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId);
            // 生成二级下拉列表的options
            const childOptions = subCategorys.map( c =>({
                value: c.categoryId,
                label: c.names,
                isLeaf: true,   
            }))
            // 找到对应前商品对应的一级option对象
            const targetOption = options.find( option => option.value===pCategoryId )

            // 关联对应的一级option上
            targetOption.children = childOptions
        }


        // 更新options状态
        this.setState({
            options
        })
    }
    /*
     *  异步获取一级/二级分类列表，并显示 
     *  async 函数的返回值是新的promise对象，promise的结果和值有async的结果来决定   
    */
    getCategorys = async (parentId) => {
        // 发请求获取数据
        const result =  await reqCategorys(parentId);   // {}
        if(result.status === 0){
            const categorys = result.data;
            // console.log('categorys:　',categorys);
            // 如果是一级分类列表
            if(parentId === 0){
                this.initOptions(categorys);
            }else{      // 二级列表 
                // 返回二级列表==> 当前async函数返回的promise就会成功且value为categorys
                return categorys;   
            }
        }
    }


    /**
     *  用加载下一级列表的回调函数
     */
    loadData = async selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        // console.log(targetOption);
        // 显示loading 
        targetOption.loading = true;

        // 根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value);
        // console.log("subCategorys: ",subCategorys);
        if(subCategorys && subCategorys.length > 0){
                      
            const childOptions = subCategorys.map( c => ({
                    value: c.categoryId,      
                    label: c.names,
                    isLeaf:true
                })
            )
            // console.log('subCategorys: ',subCategorys); /// 
            // 关联到当前的option上
            targetOption.children = childOptions;
            targetOption.loading = false;           // 隐藏loading
        }else{  // 当前选中的分类每有二级分类
            targetOption.isLeaf = true;
        }
    
        
          // 更新options状态
          this.setState({
            options: [...this.state.options],
          });
    };
    
    componentDidMount(){

        this.getCategorys(0);

    }
    componentWillMount () {
        
        // 取出携带的state
        const product = this.props.location.state;  // 如果是添加没值，否则有值
        // 保存是否是更新的标识
        this.isUpdate = !!product;
        //console.log("product: ",product);
        // 保存商品 (如果每有，保存是{})
        this.product = product || {}; 
        console.log(this.product);
    }

    render(){
        const {isUpdate,product} = this;
        const {pCategoryId, categoryId,detail} = product;
        // console.log("22:" ,detail);
        //debugger
        // 用来接收级联分类Id的数组
        const categoryIds = [];
        if(isUpdate){
            // 商品一个一级分类的商品
            if(pCategoryId === 0){
                categoryIds.push(pCategoryId);
            }else{
                // 商品一个二级分类的商品
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            }
        }
        // console.log(categoryIds);
        const title = (
            <span>
                <LinkButton onClick={()=>{this.props.history.goBack()}}>
                    <Icon type='arrow-left' />
                </LinkButton>
                <span>{ isUpdate ? '修改商品' : '添加商品' }</span>
            </span>
        )
        // 指定Item布局配置对象
        const formItemLayout = {
            labelCol: { span: 2 },    // 指定左侧label的宽度 
            wrapperCol: { span: 8 },  // 指定右侧包裹的宽度
        };

        const {getFieldDecorator} = this.props.form;

        const { options } = this.state;
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator("names",{
                                initialValue: product.pname,
                                rules:[
                                    {required:true,message:"商品名称是必须的！"}
                                ]
                            })(
                                <Input placeholder='请输入商品名称' />
                            )
                        }
                    </Item>
                    <Item label="商品描述" hasFeedback>
                        {
                            getFieldDecorator("goods",{
                                initialValue:product.goods,
                                rules:[
                                    {required:true,message:"商品描述信息是必须的！"},                                
                                ]
                            })(
                                <TextArea 
                                    autoSize={{ minRows:1, maxRows:5}}
                                    placeholder="请输入商品描述">
                                </TextArea>
                            )
                        }
                        
                    </Item>
                    <Item label="商品价格" >
                    {
                        getFieldDecorator("price",{
                            initialValue: product.price,
                            rules:[
                                {required:true,message:"商品价格不能为空"},
                                {validator:this.validatePrice}
                            ]
                        })(
                            <Input addonAfter="元" type="Number"
                                placeholder='请输入商品价格' />
                        )
                    }
                    </Item>
                    <Item label="商品分类" >
                        {
                            getFieldDecorator("categoryIds",{
                                initialValue: categoryIds,
                                rules:[
                                    {required:true,message:"必须指定商品分类"}
                                ]
                            })(
                            <Cascader 
                                placeholder='请输入指定的商品类'
                                options={options}
                                loadData={this.loadData}
                            >                            
                            </Cascader>
                            )
                        }
                    </Item>
                    <Item label="商品图片">

                        <PicturesWall ref={this.pw} obj={{pCategoryId, categoryId}} />
                        
                    </Item>
                    <Item label="商品详情" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                        <RichTextEditor ref={this.editor} detail={detail} />
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }

}
export default Form.create()(ProductAddUpdate);