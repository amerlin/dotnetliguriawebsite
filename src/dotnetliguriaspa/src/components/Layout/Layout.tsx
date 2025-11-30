import React, { FC } from 'react';
import { Outlet } from "react-router-dom"
import { Box } from "@mui/material";
import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";

interface LayoutProps {
    pageName?: string;
}

const Layout: FC<LayoutProps> = ({ pageName }) => {
    return (
        <>
            <TopBar showMenu={true} pageName={pageName} />
            <Box component={"div"} sx={{ paddingTop: '0px' }}>
                <Outlet />
            </Box>
            <Footer />
        </>
    )
};

export default Layout;
