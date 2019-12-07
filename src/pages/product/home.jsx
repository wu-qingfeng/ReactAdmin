import React from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd';

import LinkButton from '../../components/link-button'
import {reqProduct,reqSearchProducts,reqUpdateProductStatus} from '../../api'

import {PAGE_SIZE} from '../../utils/constants.js'

const Option = Select.Option

/**
 *  ProductHome  的默认子路由组件
 * */ 

class ProductHome extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            total:0,                    // 商品总的数量
            products: [],               // 商品的数组
            searchName: '',             // 搜索关键字
            searchType: 'searchName',   // 按类型搜索
        }
    }
    /*
     初始化table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'pname',
            },
            {
              title: '商品描述',
              dataIndex: 'goods',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render: (price)=> "￥" + price //当前指定了对应的属性，传入的是对应的属性值
            },
            {
                width:90,
                title: '状态',
                //dataIndex: 'goodsStatus',
                render: (product)=>{    
                    const {goodsStatus,id} = product;
                    const newGoodsStatus = goodsStatus===1? 2 : 1 ;
                    return (
                        <span>                        
                            <Button type="primary" 
                                onClick={()=>this.updateProductcStatus(newGoodsStatus,id)}
                            >
                                {newGoodsStatus === 1?"下架":"上架"}
                            </Button>
                            <span>
                                { newGoodsStatus === 1?"在售":"已下架" }
                            </span>
                        </span>
                    )
              }
            },
            {
                width:90,
                title: '操作',
                render: (product)=>{
                    return (
                      <span>                 
                          {/* 将product对象使用state传递给目标路由组件 */}
                          <LinkButton 
                            onClick={()=>{
                                this.props.history.push('/product/detail',{product})
                            }}
                          >详情</LinkButton>

                          <LinkButton 
                            onClick={()=>{this.props.history.push('/product/addupdate',product)}}
                          >修改</LinkButton>
                      </span>
                    )
                }
            },
        ];
    }
    /*
        获取指定页码的列表数据显示
    */
    getProducts = async (pageNum) => {
        this.pageNum = pageNum;         // 保存pageNum,让其它方法可以看到
        console.log('page: ',pageNum)
        this.setState({loading: !this.state.loading});   // 请求前显示loading
        
        const {searchName,searchType} = this.state;  
        // 如果搜索关键字有值，说明我们要做所搜分页
        let result;
        if (searchName) {
           result = await reqSearchProducts({pageNum,pageSize: PAGE_SIZE,searchName,searchType})
        }else{// 一般分页请求
           result = await reqProduct(pageNum, PAGE_SIZE)  // 发送请求
        }
        if(result.status === 200){
            const {total, list} = result.output;
            //console.log(result) // result
            // 取出分页数据，更新状态，显示分页列表
            this.setState({
                loading:!this.state.loading,    // 隐藏loading
                total,
                product: list
            })
        }
        
    }
    /**
     *  更新指定的商品并更新状态 
     */
    updateProductcStatus = async (newGoodsStatus,id)=>{
        const result = await reqUpdateProductStatus({newGoodsStatus,id});
        // console.log(newGoodsStatus,id);
        if(result.status === 200){
            message.success('跟新商品成功');
            this.getProducts(this.pageNum);
        }
    }

    componentWillMount () {
        this.initColumns();

    }
    
    componentDidMount () {
        this.getProducts(1)
    }

    render(){

        // 取出状态数据
        const {product,total,loading,searchName,searchType} = this.state;
        // console.log('product: ',product);
        
        const title = (
            <span>
                <Select value={searchType} onChange={value => this.setState({searchType:value})}  style={{width:150}}>
                    <Option value='searchName'>按名称搜索</Option>
                    <Option value='searchGoods'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder="关键字" 
                    value={searchName} 
                    style={{width: 150,margin:'0 15px'}} 
                    onChange={ e => this.setState({searchName:e.target.value})}
                />
                <Button type='primary' onClick={()=>{this.getProducts(1)}}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' 
                onClick={ ()=>{this.props.history.push('/product/addupdate')} }
            >
                <Icon type='plus' />
                添加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table 
                    bordered
                    rowKey='id'
                    dataSource={product} 
                    columns={this.columns}
                    pagination={{
                        current:this.pageNum,
                        defaultPageSize: PAGE_SIZE ,
                        showQuickJumper:true ,
                        total,
                        onChange:this.getProducts
                    }}
                    loading={loading}
                ></Table>
            </Card>
        )
    }
}
export default ProductHome;