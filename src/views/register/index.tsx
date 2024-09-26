import { observer } from "mobx-react";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react";
import './index.scss';
import { Button, Form, Input, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import LangSelect from "../layout/langSelect";
import { useNavigate } from "react-router-dom";
import { register } from "./store/webapi";

// import store from "./store";
function Register() {
    let navigateTo = useNavigate();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        delete values.passwordCopy;
        register(values).then((res: any) => {
            console.log('register', res);
            message.success(i18n._("register_success_msg"), 3000);// '注册成功'
            navigateTo('/login');
        }).catch((err: any) => {
            console.error('register error: ', err);            
            message.error(err.message);
        });
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
                            name="passwordCopy"
                            rules={[{ required: true, message: i18n._('register_pwd_placeholder_msg') },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error(i18n._('register_confirm_pwd_error')));
                                },
                              })]}
                        >
                            <Input                           
                            type="password"
                            placeholder={i18n._('register_pwd_placeholder')}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{}]}
                        >
                            <Input placeholder={i18n._('login_email_placeholder')} />
                        </Form.Item>
                        <Form.Item>
                            <Button icon={<UserAddOutlined />} htmlType="submit" className="register-form-button">
                                <Trans id="register_log">Register</Trans>
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

export default observer(Register);