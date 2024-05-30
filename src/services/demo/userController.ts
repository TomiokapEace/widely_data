import {request, useModel} from '@umijs/max';
import {removeItem} from "@/models/global";
import {InitDataType} from "@@/plugin-layout/types";
const model:string="/user"
const default_url:string="/api/v1/widely_known"+model
import { history } from 'umi';

export async function user_retrieve(obj:any){
    return request(default_url+'/retrieve',{
        method:'POST',
        data:obj
    })
}

export async function user_save(obj:any) {
    return request(default_url+'/add',{
        method:'POST',
        data:obj
    })
}

export async function user_select_by_id(id:string){
    let d=[id]
    return request(default_url+'/list',{
        method:"POST",
        data: {ids:d}
    })
}

export async function user_update(obj:any) {
    return request(default_url+'/update',{
        method:'POST',
        data:obj
    })
}
export async function user_delete(obj:any){
    return request(default_url+'/deleted?ids='+[obj],{
        method:"GET"
    })
}
export async function user_get_data(current:number,size:number){
    return request(default_url+"/list?current="+current+"&size="+size,{
        method:'GET',
    })
}
export async function user_get_data_select(obj:any){
    return request(default_url+"/select",{
        method:'POST',
        data:obj
    })
}

export async function login(username:string,password:string){
    return request(default_url+"/login?username="+username+"&password="+password,{
        method:'GET',
    })
}
export async function logout(initialStates: InitDataType['initialState']){
    let id = removeItem();
    history.push("/login?out")
    return request(default_url+"/logout?user_id="+id,{
        method:'GET',

    })
}
