
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { i18n } from "@lingui/core"
import './index.css'
import Axios from 'axios';
import { deep } from './kit/index.ts';
import { initRequest } from './kit/request.ts';

async function dynamicActivate(locale: string) {
  const { messages } = await import(`./locales/${locale}/messages.po`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

const render = async () => {
  Axios.get('/config/global.json').then(async (config: any) => {
    const globalConfig = config.data;
      // let isStandAlone = await AppStore.getIsStandalone(globalConfig);
      //1、全局配置注入window（深拷贝）
    window["globalConfig"] = deep(globalConfig);
    //必须先axios初始化
    initRequest(globalConfig);
    await dynamicActivate(localStorage.getItem('lang') || "zh_CN");
    // await dynamicActivate("en_US");
    const root = createRoot(document.getElementById('root') as Element);
    root.render(<App />);
  });
 
}

render();