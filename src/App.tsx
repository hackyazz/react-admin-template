
import { BrowserRouter, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { i18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"



import './App.scss';

import router from "./route"
import { useEffect } from 'react';
import { message } from 'antd';
// 去往登录页的组件
function ToLogin(){
  const navigateTo = useNavigate()
  // 加载完这个组件之后实现跳转
  useEffect(()=>{
    // 加载完组件之后执行这里的代码
    navigateTo("/login");
    message.warning(i18n._("app_has_not_login"));
    // "您还没有登录，请登录后再访问！"
  },[])
  return <div></div>
}
// 去往首页的组件
function ToHome(){
  const navigateTo = useNavigate()
  // 加载完这个组件之后实现跳转
  useEffect(()=>{
    // 加载完组件之后执行这里的代码
    navigateTo("/dashboard");
    message.warning(i18n._("app_has_login"));
    // 您已经登录过了！
  },[])
  return <div></div>
}

// 手写封装路由守卫
function BeforeRouterEnter(){
  const outlet = useRoutes(router);

  /*
    两种跳转情况：
    1、如果访问的是登录页面， 并且有token， 跳转到首页
    2、如果访问的不是登录页面，并且没有token， 跳转到登录页
    3、其余的都可以正常放行
  */
  const location = useLocation()
  let token = localStorage.getItem("access-token");
    //1、如果访问的是登录页面， 并且有token， 跳转到首页
  if(location.pathname==="/login" && token){
    // 这里不能直接用 useNavigate 来实现跳转 ，因为需要BeforeRouterEnter是一个正常的JSX组件
    return <ToHome />
  }
  // 2、如果访问的注册或者忘记密码
  if(location.pathname==="/register" || location.pathname==="/forgetpassword"){
    
  }
  //3、如果访问的不是登录页面，并且没有token， 跳转到登录页
  else if((location.pathname!=="/login") && !token){
    return <ToLogin />
  }

  return outlet
}

function App() {
  return (
    <I18nProvider i18n={i18n}>
      <BrowserRouter>
        <BeforeRouterEnter />
      </BrowserRouter>
    </I18nProvider>
    
  );
}

export default App;
