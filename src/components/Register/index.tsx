import { PlusOutlined } from '@ant-design/icons';
import {
    ModalForm,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import {user_save} from "@/services/demo/userController";

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {
    const [form] = Form.useForm<{ name: string; company: string }>();

    return (
        <ModalForm<{
            name: string;
            company: string;
        }>
            title="注册用户"
            trigger={
                <a style={{
                    float: 'right',marginRight:20
                }}>
                    用户注册
                </a>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
                return  user_save(values).then((resolve)=> {
                        if (resolve.code == 200) {
                            waitTime(10)
                            message.success("注册成功");
                            return true
                        } else {
                            message.error("注册失败：" + resolve.message)
                            return false
                        }
                    })
                }
            }>
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="username"
                    label="账号"
                    rules={[{required: true,message:"此项为必填"},{max:24}]}
                    tooltip="最长为 24 位"
                />

                <ProFormText
                    width="md"
                    name="name"
                    rules={[{required: true,message:"此项为必填"}]}
                    label="姓名"
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText.Password
                    width="md"
                    name="password"
                    rules={[{required: true,message:"此项为必填"},{max:24}]}
                    tooltip="最长为 24 位"
                    label="密码"
                />
                <ProFormText
                    width="md"
                    name="email"
                    // @ts-ignore
                    type="email"
                    rules={[{required: true,message:"此项为必填"}]}
                    label="邮箱"
                />
            </ProForm.Group>
        </ModalForm>
    );
};