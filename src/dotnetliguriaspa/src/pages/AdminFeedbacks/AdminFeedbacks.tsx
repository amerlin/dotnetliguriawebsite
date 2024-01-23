import React, { FC } from 'react';
import styles from './AdminFeedbacks.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminFeedbacksProps { pagename?: string }

const AdminFeedbacks: FC<AdminFeedbacksProps> = () => (
  <div className={styles.AdminFeedbacks} data-testid="AdminFeedbacks">
    <div className={styles.Title}> Questionari</div>
  </div>
);

export default AdminFeedbacks;
