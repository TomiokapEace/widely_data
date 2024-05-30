import { request } from '@umijs/max';
const model:string="/user"
const default_url:string="/api/v1/widely_known"+model

export async function UserSave(obj:any) {
    return request(default_url+'/add',{
        method:'POST',
        data:obj
    })
}
export async function UserUpdate(obj:any) {
    return request(default_url+'/update',{
        method:'POST',
        data:obj
    })
}
export async function UserDelete(obj:any){
    return request(default_url+'/deleted?ids='+[obj],{
        method:"GET"
    })
}
export async function UserGetData(current:number,size:number){
    return request(default_url+"/list?current="+current+"&size="+size,{
        method:'GET',
    })
}
export async function UserGetDataSelect(obj:any){
    return request(default_url+"/select",{
        method:'POST',
        data:obj
    })
}
