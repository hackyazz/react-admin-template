import { observer } from "mobx-react";
// import { Trans } from "@lingui/react";
import { ConfigProvider, Menu, MenuProps } from 'antd';
import "./index.scss";
import { UserOutlined, DashboardOutlined, BookOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocale } from "../../../kit";
import globalState from "../../../globalState";
import { useEffect } from "react";
// import store from "./store";

type MenuItem = Required<MenuProps>['items'][number];


function CustomMenus() {
  const navigateTo = useNavigate()
  const currentRoute = useLocation();
  useEffect(() => {
    console.log('CustomMenus', globalState.get('userInfo'));
    
  }, [])
  const items: MenuItem[] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: (getLocale() == "zh_CN" ? "仪表盘" : "Dashboard"),
    },
    {
      key: '/personel',
      icon: <UserOutlined />,
      label: (getLocale() == "zh_CN" ? "个人中心" : "User Center"),
    },
    {
      key: '/subscribe',
      icon: <BookOutlined />,
      label: (getLocale() == "zh_CN" ? "购买订阅" : "Subscribe"),
    }
  ]

  const adminItems: MenuItem[] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: (getLocale() == "zh_CN" ? "仪表盘" : "Dashboard"),
    },
    {
      key: '/personel',
      icon: <UserOutlined />,
      label: (getLocale() == "zh_CN" ? "个人中心" : "User Center"),
    },
    {
      key: '/subscribe',
      icon: <BookOutlined />,
      label: (getLocale() == "zh_CN" ? "购买订阅" : "Subscribe"),
    },
    {
      key: '/users',
      icon: <BookOutlined />,
      label: (getLocale() == "zh_CN" ? "用户管理" : "User Manager"),
    }
  ]
  const menuClick = (e:{key:string})=>{
    // 点击跳转到对应的路由   编程式导航跳转， 利用到一个hook
    navigateTo(e.key);
  }
  return (
      <>
        <ConfigProvider
          theme={{
            components:{
              // Menu:{
              //   darkGroupTitleColor: '',
              //   darkItemBg: '',
              //   darkItemColor: '',
              //   darkItemHoverBg: 'transparent',
              //   darkItemHoverColor: '',
              //   darkItemSelectedBg: '',
              //   darkItemSelectedColor: '',
              //   darkPopupBg: '#35393E',
              //   darkSubMenuItemBg: '',

              // }
            }
          }}>
          <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[currentRoute.pathname]}
              items={globalState.get('userInfo') == 0 ? adminItems : items}
              onClick={menuClick}
            />
        </ConfigProvider>
          
      </>
  )
}

export default observer(CustomMenus);