import React, { FC } from 'react';
import styles from './HomeFooter.module.css';

interface HomeFooterProps {}

const HomeFooter: FC<HomeFooterProps> = () => (
  <div className={styles.HomeFooter} data-testid="HomeFooter">
    DotNet Liguria -  Footer
  </div>
);

export default HomeFooter;
