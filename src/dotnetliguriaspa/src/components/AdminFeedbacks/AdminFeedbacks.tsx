import React, { FC } from 'react';
import { Box, Typography } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminFeedbacksProps { pageName?: string }

const AdminFeedbacks: FC<AdminFeedbacksProps> = () => {
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Feedbacks
      </Typography>
    </Box>
  )
};

export default AdminFeedbacks;
