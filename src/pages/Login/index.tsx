import {
    AlipayOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
  } from '@ant-design/icons';
  import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
  import { Button, Divider, message, Space, Tabs, theme } from 'antd';
  import type { CSSProperties } from 'react';
  import {useEffect, useState} from 'react';
  import { PageContainer } from '@ant-design/pro-components';
// import { login } from '@/services/demo/UserController';
import {useModel} from "@umijs/max";
import {login} from "@/services/demo/userController";
import { history } from 'umi';
import Register from "@/components/Register";
import Retrieve from "@/components/Retrieve";
import {useLocation} from "@@/exports";
  type LoginType = 'phone' | 'account';

  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  const Page = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const { token } = theme.useToken();
    const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
    const {search} = useLocation()
    useEffect(()=>{
        if (search == "?out") {
            setInitialState({})
            console.log("?")
        }
    },[])
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100vh',
        }}
      >
        <LoginFormPage
          backgroundImageUrl="/static/background.jpg"
          // logo="/static/logo.jpg"
          onFinish={async (value:any)=>{
            login(value.username,value.password)
                .then((resolve)=>{
                  if(resolve.code==200){
                    message.success(resolve.msg);
                    let obj = JSON.stringify(resolve.data);
                    window.sessionStorage.setItem("current_user",obj);
                    setInitialState(resolve.data)
                    history.push('/index')
                  }
                  else
                    message.error(resolve.msg)
                  },(reject)=>{message.error("无法连接至服务器");
                })
          }}
          title="家乡展示"
          containerStyle={{
            backgroundColor: 'rgba(0, 0, 0,0.65)',
            backdropFilter: 'blur(4px)',
          }}
          subTitle="Ancient Books"
          actions={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Divider plain>
                <span
                  style={{
                    color: token.colorTextPlaceholder,
                    fontWeight: 'normal',
                    fontSize: 14,
                  }}
                >
                </span>
              </Divider>

            </div>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'用户名:'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'密码:'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <MobileOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
              <a style={{
                  float: 'right',marginRight:10
              }} onClick={()=>{
                  login("e47fca8c793c2d5db7ff6fbd849f100f1","e47fca8c793c2d5db7ff6fbd849f100f1")
                      .then((resolve)=>{
                          if(resolve.code==200){
                              message.success(resolve.msg);
                              let obj = JSON.stringify(resolve.data);
                              window.sessionStorage.setItem("current_user",obj);
                              setInitialState(resolve.data)
                              history.push('/index')
                          }
                          else
                              message.error(resolve.msg)
                      },(reject)=>{message.error("无法连接至服务器");
                      })
              }}>
                  游客登录
              </a>
              <Retrieve/>
              <Register/>
          </div>
        </LoginFormPage>
      </div>
    );
  };

  export default () => {
    return (
        <ProConfigProvider dark>
            <Page />
        </ProConfigProvider>
    );
  };
