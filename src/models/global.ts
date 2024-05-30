// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import {message} from "antd";
import {url} from "../../cache_string";
import {useModel} from "@umijs/max";
import {history} from "umi";
const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  return {
    name,
    setName,
  };
};
export const getItem=()=>{
    let item = window.sessionStorage.getItem("current_user");
    if (item == null) {
        history.push("/login")
        return {}
    }
    // @ts-ignore
    return JSON.parse(item)
}

export const getShoppingCart=()=>{
    const obj_string=window.sessionStorage.getItem("shoppingCart")
    // @ts-ignore
    return obj_string!=null? JSON.parse(obj_string):[]
}

export const removeItem=()=>{
    if (getItem()!=null) {
        let id = getItem().id;
        window.sessionStorage.removeItem("current_user");
        return id;
    }
}

window.url=url()
window.cart=getShoppingCart()

try {
    const { data } = await fetch('/api/v1/ancient_books/menu/list?current=1&size=100', {
        method:"GET"
    }).then((res) => res.json());
    if (data.records) {
        window.dynamicRoutes = data.records;
    }
} catch {
    // message.error('路由加载失败');
}

export default useUser;
