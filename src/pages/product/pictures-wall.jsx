import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal } from 'antd';
import {BASE_IMG_URL} from '../../utils/constants';
import {/*reqUpload,*/reqDeleteImg,reqProductGoodsDetail} from '../../api';
import { message } from 'antd';

class PicturesWall extends React.Component{
    static propTypes = {
      imgs:PropTypes.array,
      obj:PropTypes.object
    }
    constructor (props){
      super(props);
      // let fileList = [];       // 这个方法由父组件传递过来的值
      // console.log(this.props);
      // // 如果传入了imgs属性
      // const {imgs} = this.props;
      // //console.log(imgs);
      // if(imgs && imgs.length > 0){
      //   fileList = imgs.map((img,index) => ({
      //       uid: -index,              // 每个file都有自己唯一的id
      //       name: img.imgs,      // 图片文件名
      //       status: 'done',         // 图片状态：done - 已上传，upLoading 正在上传中，removed:已删除
      //       url:BASE_IMG_URL + img.imgs
      //   }))
        
      // }

      this.state = {
        previewVisible: false,      // 标识是否显示大图预览Mdal
        previewImage: '',           // 大图的URL
        fileList:[]                   // 所有已上传图片的数组
      };
    }
    
      /**
       *  获取所有已上传图片文件名的数据
      */
      getImgs = () => {
        return this.state.fileList.map(file => file.name)
      }

      /*
        隐藏 Modal
      */
      handleCancel = () => {

        this.setState({ previewVisible: false })
      };
    
      handlePreview = async file => {
        // 显示指定file对应的大图
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };

      // file: 当前操作的图片文件（上传/删除）
      // fileList： 所有已上传图片文件对应的数组
      handleChange = async ({file, fileList }) =>{ 
        //  onchange 在上传的是会调用多次
        // console.log("onchange",
        // file.status,
        // 'file',file,fileList.length,
        // '11',file==fileList[fileList.length-1]
        // );  
        // 一旦上传成功，将当前上传的file的信息修正（name,url）
        
        
        if(file.status === 'done'){       // done状态 上传完成
          
          // {status: 0, data:{name:'xxx.jpg',url:"图片的地址"}}
          const result = file.response;
          if(result.status === 200){
            message.success('上传图片成功!');
            const {name,url} = result.data;
            file = fileList[fileList.length-1];
            file.name = name;
            file.url = url;     
            // console.log(file);       
          }else{
            message.error('上传失败!');
          }
        }else if(file.status === 'removed'){    // 删除服务器的图片
          const {categoryId} = this.props.obj;
          // console.log(categoryId);
          const result = await reqDeleteImg(file.name,categoryId);
          if(result.status === 200){ 
            message.error(result.msg);
          }
        }
        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
      };
      ////////////////////////////////
      getProductImg = async () => {   // 请求图片
        const {pCategoryId,categoryId} = this.props.obj; 
        const result = await reqProductGoodsDetail({pCategoryId,categoryId});
        if(result.status === 200){
          var {imgs} = result.output.list;
          // console.log(imgs);
          var fileList = imgs.map((img,index) => ({
                  uid: -index,    // 每个file都有自己唯一的id
                  name: img.imgs, // 图片文件名
                  status: 'done', // 图片状态：done - 已上传，upLoading 正在上传中，removed:已删除
                  url:BASE_IMG_URL + img.imgs
              }
            )
          )
          this.setState({fileList})
        }
      }
      componentDidMount(){
        this.getProductImg()
      }

      render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div>Upload</div>
          </div>
        );
        return (
          <div className="clearfix">
            <Upload
              action="/manage/img/upload"       // 上传地址 
              accept="image/*"                  // 只接受图片格式
              name='imgs'                       // 请求参数名
              listType="picture-card"           // 卡片样式
              fileList={fileList}               // 所有已上传图片问价对象的数组
              onPreview={this.handlePreview}    // 
              onChange={this.handleChange}      
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal> 
          </div>
        );
      }
}
export default PicturesWall;

/**
 * 1. 子组件调用父组件方法：将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
 * 2. 父组件调用子组件的方法：在父组件中通过ref得到子组件标签对象(也就是组件对象)，调用器方法
 */
