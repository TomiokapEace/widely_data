import exports from "@umijs/bundler-webpack/compiled/webpack";
interface IConfigTypes {
    codeSplitting: {
        jsStrategy: "bigVendors" | "depPerChunk" | "granularChunks";
        jsStrategyOptions?: ({} | undefined);
        cssStrategy?: ("mergeAll" | undefined);
        cssStrategyOptions?: ({} | undefined);
    };
}

const routes: Array<{
    component?: (string | undefined);
    layout?: (false | undefined);
    path?: (string | undefined);
    redirect?: (string | undefined);
    // @ts-ignore
    routes?: IConfigTypes['routes'];
    wrappers?: (Array<string> | undefined);
} | { [x: string]: any }> = [

    {
        name: '首页',
        path: '/',
        redirect:"/index",
        layout:false

    },
    {
        name: '首页',
        path: '/index',
        component: './Home',

    },
    {
        name:'数据管理',
        path:"/widelyData",
        component:'./WidelyData',
        access:'isAdmin'
    },
    {
        name: '用户管理',
        path: '/user',
        component: './User',
        access:'isAdmin'
    },

    {
        name: '图片管理',
        path: '/icon',
        component: './IconGroup',
        access:'isAdmin'
    },
    {
        name: ' 登录',
        path: '/login',
        component: './Login',
        layout:false
    },
]
export default routes
