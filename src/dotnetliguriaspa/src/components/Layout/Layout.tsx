import React, { FC } from 'react';
import { Outlet } from "react-router-dom"
import {Box} from "@mui/material";
import TopBar from "../TopBar/TopBar";

interface LayoutProps {
    pageName?: string;
}

const Layout : FC<LayoutProps>=({pageName}) => {
    return (
        <>
            <TopBar showMenu={ true } pageName={ pageName }/>
            <Box component={ "div" } height={ 400 }>
                <Outlet/>
            </Box>
        </>
    )
};

export default Layout;
