import React, { FC } from 'react';
import styles from './Layout.module.css';
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom"
import TopBar from "../TopBar/TopBar";

interface LayoutProps {
    pageName?: string;
}

const Layout: FC<LayoutProps> = () => (
    <div className={styles.Layout} data-testid="Layout">
        <TopBar />
        <div className="container">
            <SideBar />
            <Outlet />
        </div>
    </div>
);

export default Layout;
