import { observer } from "mobx-react";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
// import { t } from "@lingui/macro";
import "./index.scss";
// import store from "./store";
function Home() {
    const alertName = () => {
        alert(i18n._('home_test'))
    }
    return (
        <>
            <div className="test" onClick={alertName}><Trans id="home_test">张三</Trans></div>
        </>
    )
}

export default observer(Home);