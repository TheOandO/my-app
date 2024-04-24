import { Route } from "react-router-dom";
import MCHome from "../pages/marketing coordinator/MCHome.page";
import PendingArticles from "../pages/marketing coordinator/PendingArticles.page";
function MCRoute() {
    return (
        <>
            <Route path="/MC" element={<MCHome />} />
            <Route path="/MC/PendingArticles" element={<PendingArticles />} />
        </>
    );
}

export default MCRoute;