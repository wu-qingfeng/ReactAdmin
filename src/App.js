import React from 'react';
import {
//    HashRouter,
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

class App extends React.Component{
   constructor(props){
       super(props)
       this.state = {}
   }
  render(){
       return (
           <BrowserRouter>
              <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/' component={Admin}></Route>
              </Switch>
           </BrowserRouter>
         )
    }
}
export default App;