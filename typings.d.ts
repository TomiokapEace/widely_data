import '@umijs/max/typings';
// ./typing.d.ts
import type { DynamicRoutes } from '@/utils/dynamicRoutes/typing';
import '@umijs/max/typings';

declare global {

    interface shopping{
        id:string
        icon:string
        title:string
        count:number
        price:number
    }
    interface Window {
        dynamicRoutes: DynamicRoutes.RouteRaw[];
        shoppingCart:shopping[]
        user_id:string
        cart:any[]
        url:string
    }
}
