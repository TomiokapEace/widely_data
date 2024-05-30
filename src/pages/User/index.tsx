import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import {Button, Dropdown, message, RowProps, Space, Tag} from 'antd';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-components';
import { useRef,useState } from 'react';
import request from 'umi-request';
import {UserDelete, UserGetDataSelect, UserGetData,UserSave, UserUpdate} from "./UserController";
import {ProFormLayoutType} from "@ant-design/pro-form/lib";
import {wrap} from "@umijs/utils/compiled/cheerio/lib/api/manipulation";

export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {resolve(true);}, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
    name: string;
    color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        title: "id",
        dataIndex: "id",
        width:'md',
        formItemProps: () => {
           return {
           rules: [{ required: true, message: '此项为必填项' }],
           };
    },
        editable: (text, record, index) => {
   return false;
},
        hideInForm: true,
        ellipsis: true,
    },


    {
        title: "姓名",
        dataIndex: "name",
        width:'md',
        formItemProps: () => {
           return {
           rules: [{ required: true, message: '此项为必填项' }],
           };
    },
        ellipsis: true,
    },


    {
        title: "账号",
        dataIndex: "username",
        width:'md',
        formItemProps: () => {
           return {
           rules: [{ required: true, message: '此项为必填项' }],
           };
    },
        ellipsis: true,
    },


    {
        title: "密码",
        dataIndex: "password",
        width:'md',
        formItemProps: () => {
           return {
           rules: [{ required: true, message: '此项为必填项' }],
           };
    },
        ellipsis: true,
    },


    {
        title: "邮箱",
        dataIndex: "email",
        width:'md',
        formItemProps: () => {
           return {
           rules: [{ required: true, message: '此项为必填项' }],
           };
    },
        ellipsis: true,
    },


    {
        title: "创建时间",
        dataIndex: "createTime",
        width:'md',
        formItemProps: () => {
           return {
           rules: [{ required: true, message: '此项为必填项' }],
           };
    },
        editable: (text, record, index) => {
   return false;
},
        hideInForm: true,
        ellipsis: true,
        valueType: "dateTime",
        sorter: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },


    {
        title: "修改时间",
        dataIndex: "updateTime",
        width:'md',
        editable: (text, record, index) => {
   return false;
},
        hideInForm: true,
        ellipsis: true,
        valueType: "dateTime",
        sorter: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },


    {
        title: "管理员标志",
        dataIndex: "admin",
        width:'md',
        formItemProps: () => {
           return {
           rules: [{ required: true, message: '此项为必填项' }],
           };
    },
        ellipsis: true,
    },


    {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
    <a
        key="editable"
        onClick={() => {
        console.log(action)
        action?.startEditable?.(record.id);
    }}>
    编辑
    </a>,
    <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
    </a>,
    <TableDropdown
            key="actionGroup"
            onSelect={() => action?.reload()}
    menus={[
    { key: 'copy', name: '复制' },
    { key: 'delete', name: '删除' },
    ]}
    />,
    ],
    },
]
export default () => {
    const actionRef = useRef<ActionType>();
        const [layoutType, setLayoutType] = useState<ProFormLayoutType>('DrawerForm');
            // actionRef.current?.pageInfo?.pageSize=10
            const row:RowProps={
                align:"middle",
                wrap:false,
                // @ts-ignore
                gutter:"xs",
                justify:"space-evenly"
            }
            return (
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params = {}, sort, filter) => {
                // @ts-ignore
                const result=await UserGetDataSelect(params).then(res =>{
                    const result = {
                        data:res.data.records,
                        total:res.data.total,
                        success:true,
                        pageSize:params.pageSize,
                        current:res.current
                    }
                    return result
                })
                return Promise.resolve(result);
                }}
                editable={{
                type: 'multiple',
                onSave:(key, record, originRow, newLineConfig)=>{
                return UserUpdate(record).then((resolve)=>{
                if(resolve.code==200){
                    message.success("保存成功");
                    actionRef.current?.reload();
                }
                else
                    message.error("保存失败："+resolve.message)
                },(reject)=>{message.error("无法连接至服务器");
                })
                },
                onDelete:(key, row)=>{
                return UserDelete(row.id).then((resolve)=>{
                    if(resolve.code==200){
                        message.success("删除成功");
                        actionRef.current?.reload();
                    return {success:true}
                    }
                else {
                    message.error("删除失败：" + resolve.message)
                return {success: false}
                }
            })
        }
                }}
                columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                onChange(value) {
                console.log('value: ', value);
                },
                }}
                rowKey="id"
                search={{
                labelWidth: 'auto',
                }}
                options={{
                setting: {
                listsHeight: 400,
                },
                }}
                form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                if (type === 'get') {
                return {
                ...values,
                created_at: [values.startTime, values.endTime],
                };
                }
                return values;
                },
                }}
                pagination={{
                pageSize: 10,
                onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle=" "
                toolBarRender={() => [
                <BetaSchemaForm<GithubIssueItem>
                    trigger={<Button type="primary" icon={<PlusOutlined />}>新建</Button>}
                    layoutType={layoutType as 'ModalForm'}

                    onFinish={async (values) => {
                    console.log(values)
                    return  UserSave(values).then((resolve)=>{
                    if(resolve.code==200){
                        message.success("新建成功");
                        actionRef.current?.reload();
                        return true
                    }
                    else {
                        message.error("新建失败：" + resolve.message)
                        return false
                    }
                })
                }}
                    {...(layoutType === 'ModalForm'
                    ? {
                    modalProps: { destroyOnClose: true },
                    }
                    : {
                    drawerProps: { destroyOnClose: true },
                    })}
                    // @ts-ignore
                    columns={columns}
                    rowProps={row}
                    />,

                    ]}
                    />
                    );
                    };
