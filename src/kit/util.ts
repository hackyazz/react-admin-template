

/**
 * 补上不存在的字段 并返回undefined
 * @param {object} obj 对象数据
 * @param {string} key 对象属性
 * @returns {any} 返回数据
 */
export const tryGet = (obj: any, key: string) => {
    return key.split(".").reduce(function (o, x) {
        return typeof o == "undefined" || o === null ? o : o[x];
    }, obj);
};

/**
 * 验证服务是否成功返回
 * @param {string|number} code 服务编码
 * @returns {boolean} 返回验证结果
 */
export const verifyCode = (code: any) => {
    try {
        return code === "200" || code === 200 || code === "0" || code === 0;
    } catch (error) {
        return false;
    }
};

/**
 * 处理异常
 * @param {string} error 错误信息
 * @returns
 */
export const dealError = (error: any) => {
    console.log(`error: ${error}`);
};

/**
 * 错误信息
 * @param {object} data 对象数据
 * @returns
 */
export const errorMessage = (data: any) => {
    return typeof data === "object"
        ? data.code && data.message && !verifyCode(data.code)
            ? `【${data.code}】${data.message}`
            : data.message
        : data;
};

/**
 * 生成唯一guid
 * @returns {string}} 返回唯一guid
 */
export const guid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
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

/**
 * 获取字符串长度（区别中英文）
 * @param {string} str 字符串
 * @returns {number} 返回字符串长度
 */
export const getLen = (str: string) => {
    try {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    } catch (error) {
        return str.length;
    }
};

/**
 * 输入字符验证
 * @param {string} rule 规则
 * @param {string} value 数据
 * @param {function} callback 回调函数
 * @returns
 */
export const inputValidator = (_rule: any, value: any, callback: any) => {
    try {
        if (value && !/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/g.test(value)) {
            callback("请输入中文、英文、数字或下划线组合！");
        }

        //必须总是返回一个callback，否则 validateFields 无法响应
        callback();
    } catch (error) {
        callback();
    }
};

/**
 * 验证是否为有效的JSON字符串
 * @param {string} str JSON字符串
 * @returns {boolean} 返回验证结果
 */
export const verifyJSON = (str: any) => {
    if (typeof str == "string") {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
};

/**
 * 图片加载失败
 * @param e
 */
export const imgOnError = (e: any, defaultImgUrl?: any) => {
    // let errorUrl = require("@/assets/img/error-img.png");
    e.target.src = defaultImgUrl;
};

/**
 * 复制到剪切板
 * @param {string} text 文字
 * @returns
 */
export const copyToClipboard = (text: any) => {
    try {
        if (document.hasFocus() && navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }
    } catch (error) { }
};

