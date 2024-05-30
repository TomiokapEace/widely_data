import { defineConfig } from '@umijs/max';
import {logout} from "@/services/demo/userController";
import routes from "./routes";
import {url} from "./cache_string";
import {useModel} from "@@/exports";

export default defineConfig({

  proxy:{
    '/api/v1': {
      'target': url(),
      'changeOrigin': true,
      'pathRewrite': { '^/api/v1' : '/api/' },
    },
    '/static': {
      'target': url(),
      'changeOrigin': true,
      'pathRewrite': { '^/static' : '' },
    },
  },
  dva:{},
  // @ts-ignore
  // links:[{ rel: 'icon', href: '/static/logo.jpg' }],
  antd: {dark:true},
  // logout:()=>{
  //   const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
  //   logout(initialState)
  //   setInitialState({})
  // },
  access: {},
  model: {},
  initialState: {},
  request: {},
  theme:{token: {
      colorPrimary: '#1890ff',
    }},
  layout: {
    title: '家乡展示',

    locate:false,
  },
  routes:routes,
  // routes:  [],
  npmClient: 'npm',
});

