import { Route } from "react-router-dom";
import MMHome from "../pages/marketing manager/MMHome.page";
function MMRoute() {
    return (
        <>
            <Route path="/MM" element={<MMHome />} />
        </>
    );
}

export default MMRoute;