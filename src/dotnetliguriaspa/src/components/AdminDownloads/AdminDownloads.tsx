import React, { FC } from 'react';
import { Box, Typography } from "@mui/material";

interface AdminDownloadsProps {
    pageName: string
}

const AdminDownloads: FC<AdminDownloadsProps> = () => {
    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Downloads
            </Typography>
        </Box>
    )
};

export default AdminDownloads;
