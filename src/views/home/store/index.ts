import { makeAutoObservable } from "mobx";

class Store {
    constructor(){
        makeAutoObservable(this);
    }
    
    initVaribles(){

    }
    /**
     * 改变属性状态
     *
     * @memberof Store
     */
    changeState = (state: any) => {
        Object.assign(this, state);
    };
}
export default new Store();
