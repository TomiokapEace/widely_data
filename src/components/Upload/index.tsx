import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import {book_upload} from "@/services/demo/bookController";
import {getItem} from "@/models/global";

const { Dragger } = Upload;
const isDisable=(bookId:string)=>{
    return bookId=="test"
}
const  App: React.FC = (props) => {
    {/*//@ts-ignore*/}
    const {id,src,flag}=props
    const user_id = getItem().id
    const uploadProps: UploadProps = {
        accept:".png,jpg,.jpeg,.pdf",
        name: 'file',
        multiple: true,
        method:"post",
        action: src,
        // disabled:isDisable(bookId),
        headers:{id:id,user_id:user_id},
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);

            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (<Dragger {...uploadProps} disabled={flag}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined/>
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>

    </Dragger>)
};

export default App;
