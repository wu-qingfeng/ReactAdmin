import React from 'react'
import {
    Card,
    Table,
    Button,
    Icon,
    Modal
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api'
import { message } from 'antd'
import AddForm from './add-form'
import UpdateForm from './update-form'

/**
 * 商品分类路由
*/
class Category extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading: false,     // 是否正在获取数据中
      categorys: [],      // 一级分类列表
      subCategorys: [],   // 二级分类列表
      parentId: '0',      // 当前需要显示的分类列表的父分类Id
      parentName: '',     // 当前需要显示的分类列表的父分类名称
      showStatus: 0, // 标识添加/更新的确认框是否显示，0: 读不显示，1：显示添加 2：显示更新
      
    }
  }  
  initColumns = () => {   // 初始化Table所有列的数组
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'names',
      },
      {
        title: '操作',
        width:230,
        render: (category) => (
          <span>
            <LinkButton onClick={ ()=>this.showUpdate(category) }>修改分类</LinkButton>
            {/* 如何向事件回调函数传递参数：
                先定义一个匿名函数，在函数调用处理的函数并传入数据 
            */}
            { this.state.parentId==='0'?    // 如果parentId不等于0的就隐藏按钮 
              <LinkButton       
                onClick = {
                ()=>{ this.showSubCategorys(category) } 
              }>查看子分类</LinkButton>:null 
            }
          </span>
        )
      }
    ];
  }
  /**
   * 点击获取二级分类的内容
   * 显示二级路由状态
  */
  showSubCategorys = (category) => {
    //console.log("更新： ",category);
    // 更新状态
    this.setState({
      parentId: category._id,
      parentName: category.names
    },()=>{
      // console.log('parentName',this.state.parentName);
      // 获取二级分类列表显示 ：  
      // 注意:setSate异步执行 设置完再回调函数获取最新的数据
      this.getCategorys() 
    });
  }
  /**
   *  显示指定一级分类列表
   * */ 
  showCategorys = () => {
    // 重新更新一级分类状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    },()=>{
      this.getCategorys()
    })
  }
  /**
   * 响应点击取消：隐藏确定框
  */
  handleCancel = () => {
    console.log(' 这是隐藏对话框 ')
    // 清除输入数据
    this.form.resetFields();
    // 取消
    this.setState({
      showStatus: 0
    })
  }
  showAdd = () => {   // 显示添加分类确认框
    this.setState({
      showStatus : 1
    })
  }
  /**
   * 添加分类
  */
  addCategory = () => {
    console.log('addCategory()')
    // 对表单验证通过才处理
    this.form.validateFields(async ( err, values ) => {
      if(!err){
        // console.log('values: ',values);
        this.setState({ // 隐藏确认框
          showStatus: 0
        })
        // 收集数据，并提交添加分类的请求
        const {parentId,categoryName} = values;
        // 清除输入数据
        this.form.resetFields();
        const result = await reqAddCategory(categoryName,parentId)
        console.log('添加数据成功：' ,result);
        if(result.status === 0){
          
          // 添加的分类就是当前分类列表下的分类
          if(parentId === this.state.parentId){ 
            // 重新获取当前分类列表显示
            this.getCategorys()
          } else if (parentId === '0') { 
            // 在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示一级列表
            this.getCategorys('0')
          }
        }
      }
    })
  }
  showUpdate = (category) => {  // 显示修改分类确认框
    // 保存分类对象
    this.category = category
    // 弹出更改分类框
    this.setState({
      showStatus: 2
    })
  }
  /**
   *  更新分类
  */
  updateCategory = () => {
    console.log('upDateCategory()');
    // 进行表单验证，只有通过了才处理
    this.form.validateFields(async (err,values) => {
      if(!err){
        // vlaues 是对象 
        // console.log('Object:',values);
        // 1.隐藏确认框
        this.setState({
          showStatus: 0 
        })
        const categoryId = this.category._id || this.category.id;
        const { categoryName } = values 
        // 清除输入数据
        this.form.resetFields()
        //  2.发请求更新分类
        const result = await reqUpdateCategory({categoryId,categoryName})
        if(result.status === 0){
          // console.log(result);
          //  3.重新显示列表
          this.getCategorys()
        }
      }
    })

  }
  /**
   * 异步获取 一级/二级 分类列表显示 
   * parentId: 如果没有指定根据状态中的parentId请求，如果指定了根据指定的请求
  */
  getCategorys = async (parentId) => {
    
    // 请求之前显示loading
    this.setState({
      loading : !this.state.loading 
    });
    parentId = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);

    // console.log('result',result);

    if(result.status === 0){
      // 取出分类数组（可能是一级状态也可以是二级状态的）
      const categorys =  result.data;
      if(parentId === '0'){
        // 更新一级分类状态
        this.setState({
          categorys,                       // 获取一级分类显示
          loading : !this.state.loading    // 请求到数据后关闭loading
        });
      }else{
        // 更新二级分类状态
        this.setState({
          subCategorys : categorys,         // 获取二级分类列表
          loading : !this.state.loading     // 请求到数据后关闭loading
        });
      }      
    }else{
      message.error('获取分类列表失败：'+ result.status);
    }
  }

  // 为第一次render()准备数据
  componentWillMount(){
    this.initColumns();
  }
  
  componentDidMount () {    // 执行异步任务： 发异步ajax请求
    this.getCategorys()     
  } 

  render(){
    // 读取状态数据
    const {
      categorys,
      subCategorys,
      parentId,
      parentName,
      loading,
      showStatus
    } = this.state;
    // 读取指定的分类
    const category = this.category || {names:''}  // 如果空想给个初始对象
    
    // card 的左侧
    const title = parentId==='0'?'一级分类列表':(
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' />
        <span style={{ marginLeft: 8 }}>{parentName}</span>
      </span>
    );
    // Card 的右侧
    const extra = (
        <Button type='primary' onClick={this.showAdd}>
            <Icon type='plus'/>
            添加
        </Button>
    );
    
    return (
        <Card title={title} extra={extra} style={{ width: '100%' }}>
            <Table
              dataSource={parentId==='0' ? categorys : subCategorys }
              columns={this.columns}
              bordered
              rowKey="id"
              pagination={{defaultPageSize:5,showQuickJumper:true}}
              loading={loading}
            />
            <Modal
              title="添加分类"
              visible={showStatus===1}
              onOk={this.addCategory}
              onCancel={this.handleCancel}
            >
              <AddForm 
                categorys={categorys}
                parentId={parentId} 
                setForm= {(form)=>{this.form = form}}
              />
            </Modal>

            <Modal
              title="更新分类"
              visible={this.state.showStatus===2}
              onOk={this.updateCategory}
              onCancel={this.handleCancel}
            >
              <UpdateForm 
                categoryName={category.names} setForm={(form)=>{this.form = form} } 
              />
            </Modal>
        </Card>
         )
    }
}
export default Category;