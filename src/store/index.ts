import { makeAutoObservable } from "mobx";

class AppStore {
    constructor() {
        this.init();
        makeAutoObservable(this);
    }
    
    /**
     * 初始化参数及数据
     */
    init() {
        
    }

    /**
     * 改变属性状态
     *
     * @memberof AppStore
     */
    changeState = (state: any) => {
        Object.assign(this, state);
    };
}
export default new AppStore();
