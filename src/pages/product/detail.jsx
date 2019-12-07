import React from 'react';
import {BASE_IMG_URL} from '../../utils/constants';
import {
    Card,
    Icon,
    List,

} from 'antd';
import './product.less';
import LinkButton from "../../components/link-button";
import {reqProductGoodsDetail} from '../../api'; 
const Item = List.Item;

/**
 *  Product 的详情子路由组件
 * */ 
class ProductDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            byCategory: '',
            names: '',
            imgs: [],
        }
    }
    /*
        获取分类属性、数据、图片
    */    
    goodsDetail = async () => {
        // 一次性发送多个请求
        // const result = Promise.all([reqCategoey(pCategoryId),reqCategory(categoryId)]);

        var {pCategoryId,categoryId} = this.props.location.state.product;
        //console.log(pCategoryId,categoryId);
        const result = await reqProductGoodsDetail({pCategoryId,categoryId});
        // console.log(result);
        if(result.status === 200){
            // let {byCategory,goodsName,imgs} = result.output.list;
            this.setState({     // 把返回的值放到 state 中..
                ...result.output.list
            });
        }
        
    }

    componentDidMount () {
        this.goodsDetail();
    }

  render(){     

        // 读取携带过来的state数据
        const { pname,
                goods,
                price,
                detail
        } = this.props.location.state.product;
        const {byCategory,names,imgs} = this.state;
        // console.log(this.state);
        const title = (
            <span>  
                <LinkButton onClick={()=>{this.props.history.goBack()}}>
                    <Icon type="arrow-left" style={{marginRight:10,fontSize:18}}/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        );

        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{ pname }</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{ goods }</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{ price }</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span> {names} {
                            byCategory ? "-->"+byCategory:byCategory
                        }</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                imgs.map((value,i)=>{
                                    return (
                                        <img key={i} src={BASE_IMG_URL+value.imgs} alt="img" />
                                    )
                                })
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={
                            {__html: detail }}
                        >
                        </span>
                    </Item>

                </List>
            </Card>
        )
    }
}
export default ProductDetail;