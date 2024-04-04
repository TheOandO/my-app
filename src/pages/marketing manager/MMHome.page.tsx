import { Box } from "@chakra-ui/react";
import { AdminHeader } from "../admin/AdminHome.page";
import { Quote } from "../guest/Home.page";
import { DiscussionPage } from "../guest/Home.page";
import { Footer } from "../guest/Home.page";

function MMHome() {
    return(
        <Box>
            <AdminHeader />
            <Quote />
            <DiscussionPage />
            <Footer />
        </Box>
    )
}

export default MMHome