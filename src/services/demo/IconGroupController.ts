import { request } from '@umijs/max';
const model:string="/iconGroup"
const default_url:string="/api/v1/widely_known"+model

export async function IconGroupSave(obj:any) {
    return request(default_url+'/add',{
        method:'POST',
        data:obj
    })
}
export async function IconGroupUpdate(obj:any) {
    return request(default_url+'/update',{
        method:'POST',
        data:obj
    })
}
export async function IconGroupDelete(obj:any){
    return request(default_url+'/deleted?ids='+[obj],{
        method:"GET"
    })
}
export async function IconGroupGetData(current:number,size:number){
    return request(default_url+"/list?current="+current+"&size="+size,{
        method:'GET',
    })
}
export async function IconGroupGetDataSelect(obj:any){
    return request(default_url+"/select",{
        method:'POST',
        data:obj
    })
}
