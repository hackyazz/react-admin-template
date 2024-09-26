import { observer } from "mobx-react";
import { Button, Form, Input, message } from "antd";
import { i18n } from "@lingui/core";
import './index.scss';
import { Trans } from "@lingui/react";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { encodeLogin } from "./store/webapi";
import LangSelect from "../layout/langSelect";
import globalState from "../../globalState";

// import store from "./store";
function Login() {
    let navigateTo = useNavigate();
    const onFinish = (values: any) => {
        // console.log('Received values of form: ', values);        
        encodeLogin(values).then((res: any) => {
            // console.log('login', res);
            const {role} = res;
            if(role == 0){
                globalState.set({userInfo: role})
            }
            message.success(i18n._('login_success_msg')); // "登录成功"
            localStorage.setItem('access-token', values.username);
            navigateTo("/dashboard");
        }).catch((err: any) => {
            // console.error('login err:', err);
            message.error(err.message);
        })
    };
    // 前往注册页面
    const toRegister = () => {
        navigateTo("/register");
    }
    // 前往修改密码页面
    // const toChangePwd = () => {
    //     navigateTo("/forgetpassword");
    // }

    return (
        <>
            <div className="login-main">
                <div className="login-container">
                    <div className="login-logo"></div>
                    <Form
                        name="login"
                        className="login-form"
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
                        <Form.Item>
                            <Button icon={<LoginOutlined />} htmlType="submit" className="login-form-button">
                                <Trans id="login_log">Log in</Trans>
                            </Button>
                            
                        </Form.Item>
                    </Form>
                    <div>
                        <span className="login_register" onClick={toRegister}><Trans id="login_register">register now!</Trans></span>
                        {/* <span className="login_forgetpwd" onClick={toChangePwd}><Trans id="login_forget_pwd">Forgot password</Trans></span> */}
                        <span className="login-selectlang">
                            <LangSelect position={"bottom"}/>
                        </span>
                        
                    </div>
                </div>
            </div>     
        </>
    )
}

export default observer(Login);