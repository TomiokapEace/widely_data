import { request } from '@umijs/max';
const model:string="/widelyData"
const default_url:string="/api/v1/widely_known"+model

export async function WidelyDataSave(obj:any) {
    return request(default_url+'/add',{
        method:'POST',
        data:obj
    })
}
export async function WidelyDataUpdate(obj:any) {
    return request(default_url+'/update',{
        method:'POST',
        data:obj
    })
}
export async function WidelyDataDelete(obj:any){
    return request(default_url+'/deleted?ids='+[obj],{
        method:"GET"
    })
}
export async function WidelyDataGetData(current:number,size:number){
    return request(default_url+"/list?current="+current+"&size="+size,{
        method:'GET',
    })
}
export async function WidelyDataGetDataSelect(obj:any){
    return request(default_url+"/select",{
        method:'POST',
        data:obj
    })
}
