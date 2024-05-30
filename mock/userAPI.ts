import routes from "../routes";

const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'POST /api/v1/system/routes': {
    "code": 200,
    "msg": "请求成功",
    "data": [
      {
        "id": 1,
        "menuId": "dashboard",
        "parentId": "",
        "enable": true,
        "name": "仪表盘",
        "sort": 1000,
        "path": "/dashboard",
        "access":'isAdmin',
        "direct": true,
        "createdAt": "1992-08-17 07:29:03"
      },
      {
        "id": 2,
        "menuId": "system_management",
        "parentId": "",
        "enable": true,
        "name": "系统管理",
        "sort": 2000,
        "path": "/system",
        "direct": false,
        "createdAt": "2011-01-21 09:25:49"
      },
      {
        "id": 3,
        "menuId": "user_management",
        "parentId": "system_management",
        "enable": true,
        "name": "用户管理",
        "sort": 2001,
        "path": "/system/user",
        "direct": false,
        "createdAt": "1986-06-03 02:38:12"
      },
      {
        "id": 4,
        "menuId": "role_management",
        "parentId": "system_management",
        "enable": true,
        "name": "角色管理",
        "sort": 2002,
        "path": "/system/role",
        "direct": false,
        "createdAt": "1986-06-03 02:38:12"
      },
      {
        "id": 5,
        "menuId": "permission_management",
        "parentId": "system_management",
        "enable": true,
        "name": "权限管理",
        "sort": 2003,
        "path": "/system/permission",
        "direct": false,
        "createdAt": "1986-06-03 02:38:12"
      },
      {
        "id": 6,
        "menuId": "app_management",
        "parentId": "system_management",
        "enable": true,
        "name": "应用管理",
        "sort": 2004,
        "path": "/system/app",
        "direct": false,
        "createdAt": "1986-06-03 02:38:12"
      }
    ]
  },
  'POST /api/v2/system/routes': routes,
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'POST /api/v2/user/login':(req:any,res:any)=>{

      res.json([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },])
  }
};
