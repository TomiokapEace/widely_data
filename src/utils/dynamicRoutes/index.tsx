// @/utils/dynamicRoutes/index.ts

export function formatRoutePath(path: string) {
    const words = path.replace(/^\//, '').split(/(?<=\w+)\//); // 提取路径单词
    return `/${words
        .map((word: string) =>
            word.toLowerCase().replace(word[0], word[0].toUpperCase()),
        )
        .join('/')}`;
}
// @/utils/dynamicRoutes/index.ts

export function generateRoutePath(path: string) {
    return path.toLowerCase();
}
// @/utils/dynamicRoutes/index.ts

export function generateComponentPath(path: string) {
    const words = path.replace(/^\//, '').split(/(?<=\w+)\//); // 提取路径单词
    return `${words.join('/pages/')}/index`;
}
// @/utils/dynamicRoutes/index.ts

export function generateFilePath(path: string) {
    const words = path.replace(/^\//, '').split(/(?<=\w+)\//);
    return `@/pages/${words.join('/pages/')}/index.tsx`;
}
// @/utils/dynamicRoutes/index.ts

import type { DynamicRoutes } from './typing';
import { lazy } from 'react';
import { Outlet } from '@umijs/max';

export function parseRoutes(
    routesRaw: DynamicRoutes.RouteRaw[],
    beginIdx: number,
): DynamicRoutes.ParseRoutesReturnType {

    const routes: DynamicRoutes.ParsedRoutes = {}; // 转换后的路由信息
    const routeComponents: DynamicRoutes.ParsedRouteComponent = {}; // 生成的React.lazy组件
    const routeParentMap = new Map<string, number>(); // menuId 与路由记录在 routes 中的键 的映射。如：'role_management' -> 7

    let currentIdx = beginIdx; // 当前处理的路由项的键。把 patchRoutes 传进来的 routes 看作一个数组，这里就是元素的下标。

    routesRaw.forEach((route) => {
        let effectiveRoute = true; // 当前处理中的路由是否有效
        let formattedRoutePath;
        if (route.path!=undefined&&route.path!=null&&route.path!="")
            formattedRoutePath= formatRoutePath(route.path); // 将服务器返回的路由路径中的单词转换为首字母大写其余小写
        else
            formattedRoutePath=formatRoutePath(route.redirect)
        const routePath = generateRoutePath(formattedRoutePath); // 全小写的路由路径
        const componentPath = generateComponentPath(formattedRoutePath); // 组件路径 不含 @/pages/
        const filePath = generateFilePath(formattedRoutePath); // 路由信息中的组件文件路径

        // 是否为直接显示（不含子路由）的路由记录，如：/home; /Dashboard
        if (route.direct) {
            let tempRoute: DynamicRoutes.Route;
            if (route.path!=undefined&&route.path!=null&&route.path!="")
            // 生成路由信息
                tempRoute= {
                id: currentIdx.toString(),
                parentId: 'ant-design-pro-layout',
                name: route.name,
                path: routePath,
                file: filePath,
            };
            else
                // 生成路由信息
                tempRoute= {
                    id: currentIdx.toString(),
                    parentId: 'ant-design-pro-layout',
                    name: route.name,
                    path:"/"+route.redirect.split("t=")[1].split("&")[0],
                    redirect:route.redirect,
                    file: filePath,
                };
            // 存储路由信息
            routes[currentIdx] = tempRoute;

            // 生成组件
            const tempComponent = lazy(() => import(`@/pages/${componentPath}`));
            // 存储组件
            routeComponents[currentIdx] = tempComponent;
        } else {
            // 判断是否非一级路由
            if (!route.parentId) {
                // 正在处理的项为一级路由
                // 生成路由信息
                let tempRoute: DynamicRoutes.Route;
                if (route.path!=undefined&&route.path!=null&&route.path!="")
                    // 生成路由信息
                    tempRoute= {
                        id: currentIdx.toString(),
                        parentId: 'ant-design-pro-layout',
                        name: route.name,
                        path: routePath,
                    };
                else
                    // 生成路由信息
                    tempRoute= {
                        id: currentIdx.toString(),
                        parentId: 'ant-design-pro-layout',
                        name: route.name,
                        redirect: routePath,
                    };
                // 存储路由信息
                routes[currentIdx] = tempRoute;

                // 一级路由没有它自己的页面，这里生成一个Outlet用于显示子路由页面
                const tempComponent = Outlet;
                // 存储Outlet
                routeComponents[currentIdx] = tempComponent;

                // 记录菜单ID与当前项下标的映射
                routeParentMap.set(route.menuId, currentIdx);
            } else {
                // 非一级路由
                // 获取父级路由ID
                const realParentId = routeParentMap.get(route.parentId);

                if (realParentId) {
                    // 生成路由信息
                    const tempRoute: DynamicRoutes.Route = {
                        id: currentIdx.toString(),
                        parentId: realParentId.toString(),
                        name: route.name,
                        path: routePath,
                        file: filePath,
                    };
                    // 存储路由信息
                    routes[currentIdx] = tempRoute;

                    // 生成组件
                    const tempComponent = lazy(() => import(`@/pages/${componentPath}`));
                    // 存储组件
                    routeComponents[currentIdx] = tempComponent;
                } else {
                    // 找不到父级路由，路由无效，workingIdx不自增
                    effectiveRoute = false;
                }
            }
        }

        if (effectiveRoute) {
            // 当路由有效时，将workingIdx加一
            currentIdx += 1;
        }
    });

    return {
        routes,
        routeComponents,
    };
}

