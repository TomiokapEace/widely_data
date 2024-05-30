import type { SyntheticEvent } from 'react';
import React, {useEffect, useState} from 'react';
import { TreeSelect } from 'antd';
import {BooksGetData} from "@/pages/Books/BooksController";
import {UserGetData} from "@/pages/User/UserController";


const App: React.FC = ( props) => {
    {/*//@ts-ignore*/}
    const {setValue}=props
    const [data, setData] = useState<Object>();
    const [show, setShow] = useState<string>();
    useEffect(()=>{
        const new_data:{title:string,value:string}[]=[]
        UserGetData(1,500).then(res=>{
            const old_data=res.data.records
            for (const key in old_data) {
                const r = old_data[key]
                new_data.push({title:"用户:"+r.name,value:r.id})
            }
            setData(new_data)
        })

    },[])
    const onChange = (newValue: string) => {
        setValue(newValue);
        setShow(newValue)
        console.log(newValue)
    };

    const onPopupScroll = (e: SyntheticEvent) => {
        console.log('onPopupScroll', e);
    };


    return (
        <TreeSelect
            showSearch
    style={{ width: '95%',marginLeft:"5%"}}
    value={show}
    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
    placeholder="选择指定用户"
    allowClear
    treeDefaultExpandAll
    onChange={onChange}
    // @ts-ignore
    treeData={data}
    onPopupScroll={onPopupScroll}
    />
);
};

export default App;
