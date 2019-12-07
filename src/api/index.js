/*
    包含应用中的所有接口请求函数的模块
*/ 
/*
    要求：根据接口文档定义接口请求
    包含应用中所有接口请求函数模块
    每个函数返回值都是Promise

    基本要求:能根据接口文档定义接口请求函数
*/
import jsonp from 'jsonp';
import ajax from './ajax';
import { message } from 'antd';

// 登录
// export function reqLogin() {
//     return ajax('/login',{username,password},'POST').then()
// }

// const BASE = "http://127.0.0.1:8080";
const BASE = '';
// 登录 
export const reqLogin = (username,password) => ajax(BASE + '/login',{username,password},'POST');

// 注册用户  添加用户
export const reqAddUser = (user) => ajax(BASE + '/mannage/user/add',user,'POST');

// 获取一级、二级路由分类列表
export const reqCategorys = (parentId)=> ajax(BASE + '/manage/category/list',{parentId})
// 添加分类
export const reqAddCategory = (categoryName,parentId)=> ajax(BASE + '/manage/category/add',{categoryName,parentId},'POST')
// 更新分类
export const reqUpdateCategory = ({categoryId,categoryName})=> ajax(BASE + '/manage/category/update',{categoryId,categoryName},'POST')

// 获取商品分类列表
export const reqProduct = (pageNum,pageSize) => ajax(BASE + '/manage/product/list',{pageNum,pageSize})

// upload 上传图片
export const reqUploads = (upload) => ajax(BASE + "/manage/img/upload",{upload},'POST');

// 搜索商品分页列表
export const reqSearchProducts = ({pageNum,pageSize,searchType,searchName}) => ajax(BASE + '/manage/product/search',{
    pageNum,
    pageSize,
    [searchType]: searchName
})
// 商品详情 获取图片、分类属性数据
export const reqProductGoodsDetail = ({pCategoryId,categoryId}) => ajax(BASE + '/manage/product/detail',{pCategoryId,categoryId})
// 更新商品状态(上架、下架)
export const reqUpdateProductStatus = ({newGoodsStatus,id}) => ajax(BASE +"/manage/product/updateProductStatus",{newGoodsStatus,id},'POST')

// 删除指定名称商品图片
export const reqDeleteImg = (name,categoryId) => ajax(BASE+"/manage/img/delete",{name,categoryId},'POST'); 

// 添加/更新 商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE+"/manage/product/" + (product._id?"update":"add"),product,'POST')
// 更新商品 
//export const reqUpdateProduct = (product) => ajax(BASE+"/manage/product/update",product,'POST')

// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + "/manage/role/list")

// 添加角色
export const reqAddRole = (roleName,role_id) => ajax(BASE + "/manage/role/add",{roleName,role_id},'POST')
// 添加更新角色
export const reqUpdateRole = (role) => ajax(BASE + "/manage/role/update",role,'POST')

// 获取所有用户列表数据
export const reqUsers = () => ajax(BASE + "/manage/users/list")
// 删除指定的用户
export const reqDeleteUsers = (_id) => ajax(BASE +"/manage/users/delete",{_id},'POST')
// 添加\更新 角色用户
export const reqAddOrUpdateUsers = (user) => ajax(BASE +"/manage/users/" + (user._id ? 'update':'add'),user,'POST')

/**
 * jsonp 请求的接口请求函数
 *  
*/
export const reqWeather = (city) => {
    const url = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8uBWr2`;
    // 发送jsonp请求
    jsonp(url,{},(err,data)=>{
        // 如果成功
        return new Promise((resolve,reject) => {
            if(!err && data.status === 'success'){
                // console.log("jsonp()",err,data);
                const {daypictureUrl,weather} = data.results[0].weather_data[0];
                resolve({daypictureUrl,weather})
            }else{
                // 如果失败
                message.error('获取天气信息失败！')
                reject()
            }
        });
    })
}
// reqWeather("广州");


