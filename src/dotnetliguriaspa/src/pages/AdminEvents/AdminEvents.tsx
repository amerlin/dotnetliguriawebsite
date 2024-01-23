import React, { FC } from 'react';
import styles from './AdminEvents.module.css';

interface AdminEventsProps { pagename?: string }

const AdminEvents: FC<AdminEventsProps> = () => (
  <div className={styles.AdminEvents} data-testid="AdminEvents">
    <div className={styles.Title}>Events</div>
  </div>
);

export default AdminEvents;
