import { i18n } from "@lingui/core";
import { message } from "antd";
export function getLocale(): string{
    return i18n.locale;
}

export function setLocale(locale: string){
    localStorage.setItem('lang', locale);
    location.reload();
}

/**
 * 补上不存在的字段 并返回undefined
 * @param {object} obj 对象数据
 * @param {string} key 对象属性
 * @returns {any} 返回数据
 */
export const tryGet = (obj: object, key: string) => {
    return key.split(".").reduce(function (o, x) {
      return typeof o == "undefined" || o === null ? o : o[x];
    }, obj);
};

// 展示登录过期提示
export const showLoginExpired = (messages: string) => {
    const isLoginExpired = localStorage.getItem("isLoginExpired");
    // message.clear();
    if (isLoginExpired !== "true") {
      localStorage.setItem("isLoginExpired", "true");
      message.error(messages);
    }
};

/**
 * 数据深拷贝（暂不能拷贝函数）
 * @param {object} data 对象数据
 * @returns {object}} 返回数据
 */
export const deep = (data: any) => {
    try {
      if (typeof data === "object") {
        return Object.assign(JSON.parse(JSON.stringify(data)));
      } else {
        return JSON.parse(JSON.stringify(data));
      }
    } catch (error) {
      return data;
    }
  };