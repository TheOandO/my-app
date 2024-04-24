import { Route } from "react-router-dom";
import MCHome from "../pages/marketing coordinator/MCHome.page";
import PendingArticles from "../pages/marketing coordinator/PendingArticles.page";
import CommentsViewer from "../pages/marketing coordinator/ViewComments.page";
function MCRoute() {
    return (
        <>
            <Route path="/MC" element={<MCHome />} />
            <Route path="/MC/PendingArticles" element={<PendingArticles />} />
            <Route path="/MC/ViewComments" element={<CommentsViewer />} />
        </>
    );
}

export default MCRoute;