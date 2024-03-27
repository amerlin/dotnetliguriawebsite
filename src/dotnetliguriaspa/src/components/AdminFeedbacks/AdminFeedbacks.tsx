import React, { FC } from 'react';
import {Typography} from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminFeedbacksProps { pageName?: string }

const AdminFeedbacks: FC<AdminFeedbacksProps> = () => {
  return (
      <>
        <Typography font-size={ 12 }> FEEDBACKS</Typography>
      </>
)};

export default AdminFeedbacks;
