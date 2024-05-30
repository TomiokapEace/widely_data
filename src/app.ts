// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import {InitDataType, RunTimeLayoutConfig} from "@@/plugin-layout/types";
import {logout} from "@/services/demo/userController";
import {getItem} from "@/models/global";
import routes_config from "../routes";

import Detail from "@/pages/Detail";
import {parseRoutes} from "@/utils/dynamicRoutes";

export async function getInitialState(): Promise<any> {
  if (getItem()==null) {
    return {isAdmin:false}
  }
  return getItem();
}
// export async function logout(initialState: any){}

export const layout: RunTimeLayoutConfig = (initialState:InitDataType) => {
  return {

    // logo: "/static/logo.jpg",
    layout:"top",
    routes: fetch('/routes'),
    logout:logout,
    menu: {
      locale: false,
    },

  };
};



// @ts-ignore

export function patchRoutes({ routes, routeComponents }) {
  if (window.dynamicRoutes) {
    const currentRouteIndex = Object.keys(routes).length;
    const parsedRoutes = parseRoutes(window.dynamicRoutes, currentRouteIndex);
    Object.assign(routes, parsedRoutes.routes); // 参数传递的为引用类型，直接操作原对象，合并路由数据
    Object.assign(routeComponents, parsedRoutes.routeComponents); // 合并组件

  }
}


