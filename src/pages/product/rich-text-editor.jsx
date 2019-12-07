import React from 'react';
import {PropTypes} from 'prop-types';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/*
 *  用来指定商品详情的副文本编辑 
 * */ 
class RichTextEditor extends React.Component{
    static PropType = {
        detail:PropTypes.string
    }
    constructor(props){
        super(props)
        const html = this.props.detail;
        if(html){
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            }
        }else{
            this.state = {
                editorState: EditorState.createEmpty(),  // 创建一个编辑对象
            }
        }
    }
    
    /*
     *  输入过程中实时的回调
    */
    onEditorStateChange = (editorState) => {
        //console.log('onEditorStateChange()');

        this.setState({
            editorState,
        });
    }
    getDetail = () => {
        // 返回输入数据对应的 html格式文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    uploadImageCallBack = (file) => {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/manage/img/upload');
            //xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
            const data = new FormData();
            data.append('imgs', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });
          }
        );
      }
    
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border:'1px solid #bbb',minHeight:200,paddingLeft:5}}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { 
                            uploadCallback: this.uploadImageCallBack,
                            alt: { present: true, mandatory: true } 
                        },
                      }}
                />
                {/* <textarea
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> */}
            </div>
        )
    }
}
export default RichTextEditor;
