import React, { lazy } from "react"
// Navigate重定向组件
import {Navigate} from "react-router-dom"

import Home from  "../views/home"
import Login from  "../views/login"
import BasicLayout from "../views/layout"
import ChangePwd from "../views/changePwd"
// import Register from "../views/register"

const Register = lazy(()=>import("../views/register"))

const Dashboard = lazy(()=>import("../views/dashboard"))
const Personel = lazy(()=>import("../views/personel"))
const Subscribe = lazy(()=>import("../views/subscribe"))


// 报错A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. 
// 懒加载的模式的组件的写法，外面需要套一层 Loading 的提示加载组件


const withLoadingComponent = (comp:JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    {comp}
  </React.Suspense>
)

const routes = [
  //  嵌套路由 开始-------------------
  {
    path:"/",
    element:<Navigate to="/dashboard"/>
  },
  {
    path:"/",
    element: <BasicLayout />,
    children:[
      {
        path:"/dashboard",
        element: withLoadingComponent(<Dashboard />)
      },
      {
        path:"/personel",
        element: withLoadingComponent(<Personel />)
      },
      {
        path:"/subscribe",
        element: withLoadingComponent(<Subscribe />)
      }
    ]
  },
  // 嵌套路由 结束-------------------
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/forgetpassword",
    element: <ChangePwd />
  },
  {
    path:"/register",
    element: withLoadingComponent(<Register />)
  },
  // 访问其余路径的时候直接跳到首页
  {
    path:"*",
    element:<Navigate to="/dashboard"/>
  },
  
  {
    path:"/home",
    element: <Home />
  }
]

export default routes