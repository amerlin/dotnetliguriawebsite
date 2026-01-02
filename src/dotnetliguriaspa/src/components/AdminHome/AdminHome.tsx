import React, { FC, useEffect } from 'react';
import { userProfileLocalStorageStore } from "../../store/userProfileLocalStorageStore";
import { Box, Typography } from "@mui/material";

interface AdminHomeProps { pageName?: string }

const AdminHome: FC<AdminHomeProps> = () => {

    const profileSaved = userProfileLocalStorageStore((state) => state.profileSaved);

    useEffect(() => {
        if (!profileSaved) {
            window.location.replace('/admin/profile/');
        }
    }, []);

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Admin Dashboard
            </Typography>
        </Box>
    )
};

export default AdminHome;


