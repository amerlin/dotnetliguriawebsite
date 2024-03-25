import React, { FC } from 'react';
import { Outlet } from "react-router-dom"
import TopBar from "../TopBar/TopBar";
import CustomSideBar from "../CustomSideBar/CustomSideBar";
import {Box} from "@mui/material";

interface LayoutProps {
    pageName?: string;
}

const Layout: FC<LayoutProps> = () => {return (
<>
        <TopBar pageName={""} showMenu={false}/>
        <Box component={"div"} display={"flex"}>
            <CustomSideBar />
            <Outlet />
        </Box>
</>
)};

export default Layout;
