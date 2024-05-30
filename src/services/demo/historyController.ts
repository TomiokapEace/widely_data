import { request } from '@umijs/max';
const model:string="/history"
const default_url:string="/api/v1/library"+model



export async function history_borrow(user_id:string,book_id:string){
    return request(default_url+'/borrow?user_id='+user_id+"&book_id="+book_id,{
        method:"GET"
    })
}
export async function get_history_borrow(user_id:string){
    return request(default_url+'/getBorrow?user_id='+user_id,{
        method:"GET"
    })
}
export async function history_save(obj:any) {
    return request(default_url+'/add',{
        method:'POST',
        data:obj
    })
}
export async function history_update(obj:any) {
    return request(default_url+'/update',{
        method:'POST',
        data:obj
    })
}
export async function history_delete(obj:any){
    return request(default_url+'/deleted?ids='+[obj],{
        method:"GET"
    })
}
export async function history_get_data(current:number,size:number){
    return request(default_url+"/list?current="+current+"&size="+size,{
        method:'GET',
    })
}
export async function history_get_data_select(obj:any){
    return request(default_url+"/select",{
        method:'POST',
        data:obj
    })
}