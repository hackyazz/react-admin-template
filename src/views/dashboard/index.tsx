import { observer } from "mobx-react";
// import { Trans } from "@lingui/react";
// import { i18n } from "@lingui/core";
import "./index.scss";
import { Carousel } from "antd";
// import store from "./store";

const contentStyle: React.CSSProperties = {
    height: '260px',
    color: '#fff',
    lineHeight: '260px',
    textAlign: 'center',
    background: '#364d79',
};
function Dashboard() {
    
    return (
        <>
            <div className="dashboard_container">
                <Carousel autoplay >
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
        </>
    )
}

export default observer(Dashboard);