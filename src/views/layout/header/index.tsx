import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { observer } from "mobx-react"
import { i18n } from "@lingui/core";

import "./index.scss"
import { useNavigate } from "react-router-dom";
import LangSelect from "../langSelect";
import globalState from "../../../globalState";

function CustomHeader(){
    let navigateTo = useNavigate();
    const items = [
        {
            key: '1',
            icon: <LogoutOutlined />,
            label: i18n._("logout")
            // "登出"
        }
    ];
    const handleUserClick = (e: any) => {
        console.log('Clicked item:', e.key);
        navigateTo("/login");
        localStorage.setItem("access-token", "");
        globalState.set({userInfo: null});
    }
    return(
        <>
            <div className="header_container">
                <LangSelect position={"bottom"}/>
                <Dropdown
                className="header_user"
                    menu={{items:items,
                           selectable: true,
                           onSelect: handleUserClick  }}
                    placement="bottom"
                    trigger={['click']}>
                    <Avatar style={{ backgroundColor: '#1677FF' }} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </>
    )
}

export default observer(CustomHeader);