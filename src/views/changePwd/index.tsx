import { observer } from "mobx-react";
import './index.scss';
import { Button, Form, Input } from "antd";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import LangSelect from "../layout/langSelect";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// import store from "./store";
function ChangePwd() {
    let navigateTo = useNavigate();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    }

    const toLogin = () => {
        navigateTo('/login');
    }
    return (
        <>
            <div className="register-container">
                <div className="form-container">
                <div className="login-logo"></div>
                    <Form
                        name="register"
                        className="register-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: i18n._('login_user_placeholder_msg') }]}
                        >
                            <Input placeholder={i18n._('login_user_placeholder')} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: i18n._('login_pwd_placeholder_msg') }]}
                        >
                            <Input                           
                            type="password"
                            placeholder={i18n._('login_pwd_placeholder')}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password-copy"
                            rules={[{ required: true, message: i18n._('register_pwd_placeholder_msg') }]}
                        >
                            <Input                           
                            type="password"
                            placeholder={i18n._('register_pwd_placeholder')}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button icon={<SmileOutlined />} htmlType="submit" className="register-form-button">
                                <Trans id="changepwd_log">Register</Trans>
                            </Button>
                            
                        </Form.Item>
                    </Form>
                    <div>
                        <span className="toLogin" onClick={toLogin}><Trans id="return_login">Return to login</Trans></span>
                        <span className="login-selectlang">
                            <LangSelect position={"bottom"}/>
                        </span>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(ChangePwd);