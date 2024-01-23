import React, { FC } from 'react';
import styles from './AdminProfile.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminProfileProps { }

const AdminProfile: FC<AdminProfileProps> = () => (
  <div className={styles.AdminProfile} data-testid="AdminProfile">
    AdminProfile Component
  </div>
);

export default AdminProfile;
