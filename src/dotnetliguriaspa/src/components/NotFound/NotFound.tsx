import React, { FC } from 'react';
import styles from './NotFound.module.css';

interface NotFoundProps {
    pagename: string;
}

const NotFound: FC<NotFoundProps> = (props: NotFoundProps) => (
    <div className={styles.NotFound} data-testid="NotFound">
        Page {props.pagename} - Work in progress
    </div>
);

export default NotFound;
