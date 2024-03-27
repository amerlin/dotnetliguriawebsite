import React, { FC, useEffect } from 'react';
import { userProfileLocalStorageStore } from "../../store/userProfileLocalStorageStore";
import {Typography} from "@mui/material";

interface AdminHomeProps { pageName?: string }

const AdminHome: FC<AdminHomeProps> = () => {

    const profileSaved = userProfileLocalStorageStore((state) => state.profileSaved);

    useEffect(() => {
        if (!profileSaved) {
            window.location.replace('/admin/profile/');
        }
    }, []);

    return (
       <>
       <Typography font-size={12}>Admin</Typography>
       </>
    )
};

export default AdminHome;


