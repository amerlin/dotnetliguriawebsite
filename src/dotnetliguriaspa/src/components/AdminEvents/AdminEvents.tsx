import React, { FC } from 'react';
import {Typography} from "@mui/material";

interface AdminEventsProps { pageName?: string }

const AdminEvents: FC<AdminEventsProps>=() => {
    return (
        <>
            <Typography font-size={ 12 }> EVENTS</Typography>
        </>
    )
};

export default AdminEvents;
