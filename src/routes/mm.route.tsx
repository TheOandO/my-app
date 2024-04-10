import { Route } from "react-router-dom";
import MMHome from "../pages/marketing manager/MMHome.page";
import MMNewsfeed from "../pages/marketing manager/MMNewsfeed.page";
import MMMonitor from "../pages/marketing manager/MMMonitor.page";

function MMRoute() {
    return (
        <>
            <Route path="/MM" element={<MMHome />} />
            <Route path="/MM/Monitor" element={<MMMonitor />} />
            <Route path="/MM/Newsfeed" element={<MMNewsfeed />} />
        </>
    );
}

export default MMRoute;