//@ts-ignore

import {
    tryGet,
    verifyCode,
} from "./util";

import axios from "axios";

// @ts-ignore

let timer: any;
const axiosInstance: any = axios.create();
axiosInstance.__isSetted__ = false;
axiosInstance.setAxiosConfig = (axiosConfig: any, TOKEN_KEY: string) => {
    if (axiosInstance.__isSetted__) return;
    axiosInstance.__isSetted__ = true;
    /* axios公共配置 */

    axiosInstance.defaults.baseURL = axiosConfig.BASE_URL; //请求baseUrl
    // 表示跨域请求时是否需要使用凭证,也可自动把后台set的cookie存起来
    axiosInstance.defaults.withCredentials = false;
    axiosInstance.defaults.timeout = tryGet(axiosConfig, "AJAX_TIMEOUT") || 60000; //设置超时时间
    axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axiosInstance.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";
    //request拦截器
    axiosInstance.interceptors.request.use((config: any) => {
        //token存在并且请求头未配置
        if (
            config.data &&
            Object.prototype.toString.call(config.data) == "[object FormData]"
        ) {
            // 请求拦截器处理
            config.headers["Content-type"] = "application/x-www-form-urlencoded";
        } else {
            if (!config.headers || !config.headers["Content-type"]) {
                config.headers["Content-type"] = "application/json;charset=utf-8";
            }
        }
        config.headers["Apikey"] = (window as any).globalConfig["Apikey"];
        //   if (appStore.accessToken) {
        //     config.headers = {
        //       ...config.headers,
        //       "Access-Token": appStore.accessToken,
        //     };
        //   }

        return config;
    });

    //response拦截器
    axiosInstance.interceptors.response.use(
        (response: any) => {
            const { config, data } = response;
            // 如果是 blob和arraybuffr类型 直接返回
            if (data instanceof Blob || data instanceof ArrayBuffer) {
                return data;
            }
            //解构code和message
            const { code, message: msg } = data;
            const dataMessage =
                code && msg && !verifyCode(code) && !tryGet(config, "aloneMessage")
                    ? `【${code}】${msg}`
                    : msg;

            //密钥为空或登录过期
            if (
                code == "S209102" ||
                code === 1003 ||
                code === "S089103" ||
                code === "S089102" ||
                code === "S199340"
            ) {
                //清空上一次延时器
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    // const message = dataMessage
                    //     ? dataMessage
                    //     : code === 1002 || code === "S089103"
                    //         ? `【${code}】密钥不能为空`
                    //         : `【${code}】用户已退出，请重新登录`;

                    if (code === "S209102") {
                        //   处理登录过期
                    } else {
                        //   处理错误回调
                    }

                    //自动跳转到登录页

                }, 500);
            }

            //返回请求的数据
            // response.headers["jwt-token"] &&
            //     localStorage.setItem(TOKEN_KEY, response.headers["jwt-token"]);
            // response.headers["sys-token"] &&
            //     localStorage.setItem(TOKEN_KEY, response.headers["sys-token"]);
            return response.data
                ? { ...response.data, message: dataMessage }
                : response;
        },
        (error: any) => {
            if (error.response) {
                const { status, data } = error.response;
                //status和data存在则进行判断
                if (status && data) {
                    //设置对象可写入
                    if (data) {
                        Object.defineProperty(error.response, "data", {
                            writable: true,
                            value: data,
                        });
                    }
                    if (data.message) {
                        Object.defineProperty(data, "message", {
                            writable: true,
                            value: data.message,
                        });
                    }

                    //请求超时、请求失败、服务未找到、服务内部错误、服务不可用
                    if (status === 401 || status === 405) {
                        if (typeof data === "string") {
                            error.response.data = "请求超时";
                        } else {
                            data.message = data.message ? data.message : "请求超时";
                        }
                    } else if (status === 422) {
                        if (typeof data === "string") {
                            error.response.data = "请求失败";
                        } else {
                            data.message = data.message ? data.message : "请求失败";
                        }
                    } else if (status === 404) {
                        //服务未找到
                        if (typeof data === "string") {
                            error.response.data = "服务未找到";
                        } else if (typeof data === "object") {
                            data.message = "服务未找到";
                        }
                    } else if (status === 500) {
                        //服务内部错误
                        if (typeof data === "string") {
                            error.response.data = "服务内部错误";
                        } else if (typeof data === "object") {
                            data.message = "服务内部错误";
                        }
                    } else if (status === 503) {
                        //服务不可用
                        if (typeof data === "string") {
                            error.response.data = "服务不可用";
                        } else if (typeof data === "object") {
                            data.message = "服务不可用";
                        }
                    }
                }
            }

            if (error.message && typeof error.message === "string") {
                //设置对象可写入
                Object.defineProperty(error, "message", {
                    writable: true,
                    value: error.message,
                });

                //网络错误、服务未找到、服务内部错误、服务不可用、请求地址无效
                if (error.message.indexOf("Network Error") > -1) {
                    error.message = "网络错误";
                } else if (
                    error.message.indexOf("404 Not Found") > -1 ||
                    error.message.indexOf("404 NOT_FOUND") > -1 ||
                    error.message.indexOf("Not Found") > -1 ||
                    error.message.indexOf("code 404") > -1
                ) {
                    error.message = "服务未找到";
                } else if (
                    error.message.indexOf("500 Service") > -1 ||
                    error.message.indexOf("code 500") > -1
                ) {
                    error.message = "服务内部错误";
                } else if (
                    error.message.indexOf("503 Service") > -1 ||
                    error.message.indexOf("code 503") > -1
                ) {
                    error.message = "服务不可用";
                } else if (error.message.indexOf("Invalid URL") > -1) {
                    error.message = "请求地址无效";
                }
            }

            return Promise.reject(
                error.response && error.response.data ? error.response.data : error
            );
        }
    );
};

export default axiosInstance;
