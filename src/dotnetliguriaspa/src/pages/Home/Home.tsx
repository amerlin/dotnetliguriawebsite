import React, { FC } from 'react';
import styles from './Home.module.css';

interface HomeProps { pagename?: string }

const Home: FC<HomeProps> = () => (
  <div className={styles.Home} data-testid="Home">
    Admin - Home Pages
  </div>
);

export default Home;
