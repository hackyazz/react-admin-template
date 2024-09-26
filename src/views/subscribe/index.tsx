import { observer } from "mobx-react";
import { Trans } from "@lingui/react";
// import { i18n } from "@lingui/core";
import "./index.scss";
import PlanCard from "./components/card";
// import store from "./store";
function Subscribe() {
    
    return (
        <>
            <h2><Trans id="choose_plan">选择适合你的计划</Trans></h2>
            <div className="card-wrap-container">
                <div className="card-wrap">
                    <PlanCard title="title" price={10.00} period="周期" features={["1", "2"]}/>
                </div>
                <div className="card-wrap">
                    <PlanCard title="title" price={20.00} period="周期" features={["11111111111111111111111111111111111111111111111111111111111111111111111111111", "2"]}/>
                </div>
                <div className="card-wrap">
                    <PlanCard title="title" price={30.00} period="周期" features={["1", "2"]}/>
                </div>
                <div className="card-wrap">
                    <PlanCard title="title" price={40.00} period="周期" features={["1", "2"]}/>
                </div>
                <div className="card-wrap">
                    <PlanCard title="title" price={50.00} period="周期" features={["1", "2"]}/>
                </div>
            </div>
            
        </>
    )
}

export default observer(Subscribe);