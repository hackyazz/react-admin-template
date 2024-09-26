import axios from 'axios';
// import store from "@/store";
// import { MessageBox, Message } from 'element-ui'
// import { getAccessToken, getToken } from "@/utils/auth";
// import { AESSCript, guid } from "@/utils/Util"

let ajaxMethod = ['get', 'post', 'delete', 'put', 'download'];
let axiosIns: any = null;
let api: any = {};
export const initRequest = (config: any) => {

  let arserviceurl = config.BASE_URL;
  let timeout = config.AJAX_TIMEOUT || 60000;
//   let language = config.LANGUAGE;
  api.baseURL = arserviceurl;
  console.log('config', config);
  
  axiosIns = axios.create({
    timeout: timeout,
    headers: {
      'content-type': 'application/json',
    //   "language": language
    },
    baseURL: arserviceurl
  });
  axiosIns.defaults.crossDomain = true;
  axiosIns.defaults.baseURL = arserviceurl;

  axiosIns.interceptors.request.use(
    (config: any) => {
      // console.log('config',config)
      
      return config
    },
    (error: any) => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  // 拦截器
  axiosIns.interceptors.response.use((response: any) => {
    const res = response.data;
    // console.log('interceptors response', res)
    if (res.code == 401) {
      
    }else if(res.code == 54100){
      
    }
    else {
      return res
    }

  },
    (error: any) => {
    //   Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
      return Promise.reject(error)
    }
  )
}

ajaxMethod.forEach((method) => {
  //数组取值的两种方式
  api[method] = function (uri: any, data: any) {
    return new Promise(function (resolve, reject) {
      console.log('api', method, uri)
      // console.log('method', method)
      // console.log('uri', uri)
      console.log('data', data, data instanceof FormData);

      // 设置某个接口的 timeout时间
      let extraSetting = {};
      if ((data && data.timeout) || (data instanceof FormData && data.get('timeout'))) {
        console.log('data timeout', data.timeout);
        extraSetting['timeout'] = data.timeout || data.get('timeout');
      }

      // console.log('extraSetting', extraSetting)

      if (uri.indexOf("http") > -1) {
        console.log('指定 URL:', uri)
        // axiosIns.defaults.baseURL = '';
        axiosIns.defaults.timeout = 5 * 60 * 1000;

      }

      if(data && data.isAlg){
        uri = axiosIns.defaults.downloadURL + uri;
        delete(data.isAlg);
      }


      if (method === 'download') {
        console.log('method', method)
        console.log('uri', uri)
        // console.log('data', data, data instanceof FormData);

        // console.log('axiosIns', axiosIns.defaults);
        

        // const a = document.createElement('a');
        // a.style.display = 'none';
        // a.href = _downloadURL;
        // a.click();
      }
      else if (method === 'get') {
        axiosIns[method](uri, {
          params: data
        }, extraSetting).then((response: any) => {
          // console.log('response', response)
          if (response.code == 200) {
            resolve(response.data)
          } else {
            // Message({
            //   message: response.msg || 'Error',
            //   type: 'error',
            //   duration: 5 * 1000
            // })
            reject(response);
          }
        }).catch((err: any) => {
          reject(err);
        })
      }
      else {

        // // 设置某个接口的 timeout时间
        // let extraSetting = {};
        // if (data && data.timeout) {
        //   extraSetting['timeout'] = data.timeout;
        // }
        // console.log('extraSetting', extraSetting);

        axiosIns[method](uri, data, extraSetting).then((response: any) => {
          // console.log('response', response)
          if (response && response.code == 200) {
            resolve(response.data)
          } else {
            // Message({
            //   message: response.msg || 'Error',
            //   type: 'error',
            //   duration: 5 * 1000
            // })
            reject(response);
          }
        }).catch((err: any) => {
          reject(err);
        })
      }
    })

  }
});

export default api;
