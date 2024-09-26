import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { observer } from 'mobx-react';
import "./index.scss";
import CustomMenus from "./menus";
import CustomHeader from "./header";
import { Outlet } from 'react-router-dom';
// import { i18n } from '@lingui/core';
const { Header, Sider, Content, Footer } = Layout;

function BasicLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='main_layout' style={{ height: '100vh' }}>
      <Sider width={260} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">Twitter Cat</div>
        <CustomMenus />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
            disabled
          />
          <CustomHeader />
        </Header>
        <Content
          className="custom-content"
          style={{
            margin: '24px 16px',
            padding: '0px 18% 20px 18%',
            minHeight: 280,
            background: '#EEF1F5',
            borderRadius: borderRadiusLG,
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            flex: 1,
          }}
        >
          <Outlet />
        </Content>
        <Footer className='layout-footer'>footer</Footer>
      </Layout>
    </Layout>
  );
};

export default observer(BasicLayout);