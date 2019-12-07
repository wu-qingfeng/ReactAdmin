import React from 'react';
import {Route,Switch} from 'react-router-dom';
import ProductHome from './home';
import ProductAddUpdate from './add-update';
import ProductDetail from './detail';

class Product extends React.Component{
   constructor(props){
       super(props)
       this.state = {}
   }
  
  render(){
       return (
            <Switch>
                <Route path='/product' component={ProductHome} exact></Route>
                <Route path='/product/addupdate' component={ProductAddUpdate} ></Route>
                <Route path='/product/detail' component={ProductDetail}></Route>
            </Switch>
        )
    }
}
export default Product;