import React, { FC } from 'react';
import styles from './PageNotFound.module.css';
import NotFound from "../../components/NotFound/NotFound";

interface PageNotFoundProps {
    pagename?: string;
}

const PageNotFound: FC<PageNotFoundProps> = (props: PageNotFoundProps) => (
    <div className={styles.PageNotFound} data-testid="PageNotFound">
        <NotFound pagename={props.pagename} />
    </div>
);

export default PageNotFound;
