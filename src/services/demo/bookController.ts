import { request } from '@umijs/max';
const model:string="/book"
const default_url:string="/api/v1/library"+model

export async function get_book_key(key:string){
    return request(default_url+'/selectByKey?key='+key,{
        method:"GET"
    })
}
export async function book_select() {
    return request("/api/v2/user/login", {
        method: 'post'
    })
}
export async function book_upload(obj:any){
    return request(default_url+'/upload',{
        method:'POST',

    })
}

export async function book_save(obj:any) {
    return request(default_url+'/add',{
        method:'POST',
        data:obj
    })
}
export async function book_update(obj:any) {
    return request(default_url+'/update',{
        method:'POST',
        data:obj
    })
}
export async function book_delete(obj:any){
    return request(default_url+'/deleted?ids='+[obj],{
        method:"GET"
    })
}
export async function book_get_data(current:number,size:number){
    return request(default_url+"/list?current="+current+"&size="+size,{
        method:'GET',
    })
}
export async function book_get_data_select(obj:any){
    return request(default_url+"/select",{
        method:'POST',
        data:obj
    })
}