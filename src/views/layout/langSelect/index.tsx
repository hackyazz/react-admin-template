import { GlobalOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { observer } from "mobx-react";
import { getLocale, setLocale } from "../../../kit";

import "./index.scss"

function LangSelect(props: {position: any}){
    const {position} = props;
    const items = [
        {
            key: '1',
            label: "简体中文"
        },
        {
            key: '2',
            label: "English"
        }
    ];
    // 定义点击事件处理程序
    const handleMenuClick = (e: any) => {
        // 在这里处理点击事件
        // console.log('Clicked item:', e.key);
        if(e.key === "1"){
            setLocale('zh_CN');
        }else{
            setLocale('en_US');
        }
    };
    return (
        <>
            <Dropdown
                className="lang-selectlang"
                menu={{ items, selectable: true,
                        defaultSelectedKeys:[getLocale() === "zh_CN" ? "1" : "2"],
                        onSelect: handleMenuClick}}
                placement={position}
                trigger={['click']}>
                <span><GlobalOutlined /> {getLocale() === "zh_CN" ? '简体中文' : 'English'}</span>
            </Dropdown>
        </>
    )
}

export default observer(LangSelect);