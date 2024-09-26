import { CheckCircleOutlined, TagOutlined } from "@ant-design/icons";
import "./index.scss";
import { Button } from "antd";
import { Trans } from "@lingui/react";

function PlanCard(props: { title: string, price: number, period: string, features: Array<string> }) {
    const { title, price, period, features } = props;
    // console.log(title, price, period, features);
    return (
        <>
            <div className="card-container">
                <div className="card-title">
                    <TagOutlined /> {title}
                </div>
                <div className="card-subtitle">
                    <div className="card-price">
                        ￥{price}
                    </div>
                    <div className="card-period">
                        {period}
                    </div>
                </div>
                <div className="card-content">
                    {features.map((item: string) => {
                        return(<>
                            <div className="card-item" title={item.length > 20 ? item : "" }><CheckCircleOutlined /> {item}</div>
                        </>)
                    })}
                </div>
                <Button className="card-button"><Trans id="imme_subs">立即订阅</Trans></Button>
            </div>
        </>
    )

}
export default PlanCard;