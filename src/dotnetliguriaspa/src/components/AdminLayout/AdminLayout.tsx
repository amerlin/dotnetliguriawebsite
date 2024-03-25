import React, { FC } from 'react';
import TopBar from "../TopBar/TopBar";
import {Box} from "@mui/material";
import CustomSideBar from "../CustomSideBar/CustomSideBar";
import {Outlet} from "react-router-dom";
interface AdminLayoutProps {pageName?: string;}

const AdminLayout: FC<AdminLayoutProps> = ({pageName}) => (
    <>
        <TopBar pageName={""} showMenu={false}/>
        <Box component={"div"} display={"flex"}>
            <CustomSideBar />
            <Outlet />
        </Box>
    </>
);

export default AdminLayout;
