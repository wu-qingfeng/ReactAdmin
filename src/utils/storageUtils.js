/**
 *  进行local数据存储管理工具模块
 *  cnpm install store
*/
import store from 'store';
const USER_KEY = 'user_key';    // 为了保持一致变量名  存为常量
export default {
    /*
        保存user
    */
   saverUser (user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user);
   },
    /*
        读取user
    */
   getUser (user){
       //return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
       return store.get(USER_KEY,user);
   },
    /*
        删除user
    */
   removeUser (){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
   }
}

