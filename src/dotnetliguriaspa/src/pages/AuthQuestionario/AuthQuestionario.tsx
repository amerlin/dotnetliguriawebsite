import React, { FC } from 'react';
import styles from './AuthQuestionario.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthQuestionarioProps {}

const AuthQuestionario: FC<AuthQuestionarioProps> = () => (
  <div className={styles.AuthQuestionario} data-testid="AuthQuestionario">
    AuthQuestionario Component (pagina per la visualizzazione del questionario)
  </div>
);

export default AuthQuestionario;
