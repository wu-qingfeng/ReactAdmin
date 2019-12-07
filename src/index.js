import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import {HashRouter,BrowserRouter,Route,Switch} from 'react-router-dom'; // 路由

import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';



// import Login from './pages/login/login';
// import Admin from './pages/admin/admin';



// 读取Local中保存user, 保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render((
    // <HashRouter>
    //     <Switch>
    //         <Route path='/login' component={Login}></Route>
    //         <Route path='/' component={Admin}></Route>
    //     </Switch>
    // </HashRouter>
    <App/>
), document.getElementById('root'));
