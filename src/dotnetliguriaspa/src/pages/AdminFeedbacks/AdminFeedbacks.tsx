import React, { FC } from 'react';
import styles from './AdminFeedbacks.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminFeedbacksProps { }

const AdminFeedbacks: FC<AdminFeedbacksProps> = () => (
  <div className={styles.AdminFeedbacks} data-testid="AdminFeedbacks">
    AdminFeedbacks Component
  </div>
);

export default AdminFeedbacks;
