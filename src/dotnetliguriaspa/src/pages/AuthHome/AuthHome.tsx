import React, { FC } from 'react';
import styles from './AuthHome.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthHomeProps {
}

const AuthHome: FC<AuthHomeProps> = () => (
  <div className={styles.AuthHome} data-testid="AuthHome">
    AuthHome Component (pagina utente autenticato)
  </div>
);

export default AuthHome;
