import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import {Button, Dropdown, message, Modal, RowProps, Space, Tag} from 'antd';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-components';
import { useRef,useState } from 'react';
import request from 'umi-request';
import {IconGroupDelete, IconGroupGetDataSelect, IconGroupGetData,IconGroupSave, IconGroupUpdate} from "@/services/demo/IconGroupController";
import {ProFormLayoutType} from "@ant-design/pro-form/lib";
import {wrap} from "@umijs/utils/compiled/cheerio/lib/api/manipulation";
import Upload from "@/components/Upload";
import {  Drawer } from 'antd';
import BookName from "@/components/BookName";
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





export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (e:any) => {
        console.log(e)
        setIsModalOpen(true);
    };

    const handleOk = (prop:any) => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        actionRef.current?.reload()
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
            title: "名字",
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
            title: "图片",
            dataIndex: "iconPath",
            valueType:"image",
            width:'md',
            readonly:true,
            hideInSearch:true,
            hideInForm:true
        },
        {
            title: "关联id",
            dataIndex: "relevanceId",
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
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const [value, setValue] = useState<string>("");
    // @ts-ignore
    return (
        <>
        <Drawer title="新建图片" onClose={onClose} open={open}>
            {/*// @ts-ignore*/}
            <BookName setValue={setValue}></BookName>
            <div style={{width:"95%",height:"40%",marginLeft:"5%",marginTop:30}}>
            {/*// @ts-ignore*/}
            <Upload id={value} flag={value==""}  src={"/api/v1/widely_known/iconGroup/upload"} ></Upload>
            </div>
        </Drawer>
        <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params = {}, sort, filter) => {
                // @ts-ignore
                const result=await IconGroupGetDataSelect(params).then(res =>{
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
                    return IconGroupUpdate(record).then((resolve)=>{
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
                    return IconGroupDelete(row.id).then((resolve)=>{
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
            }}
            dateFormatter="string"
            headerTitle=" "
            toolbar={{
                actions:[
                    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>新建</Button>
                ]
            }}


        />
        </>
    );
};
