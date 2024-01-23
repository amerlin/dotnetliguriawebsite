import React, { FC, useEffect } from 'react';
import styles from './AdminHome.module.css';
import { data } from '../../mockup/chartData';
import AdminFeaturedInfo from "../../components/AdminFeaturedInfo/AdminFeaturedInfo";
import AdminWidgetLg from "../../components/AdminWidgetLg/AdminWidgetLg";
import AdminWidgetSm from "../../components/AdminWidgetSm/AdminWidgetSm";
import Chart from "../../components/Chart/Chart";
import { userProfileLocalStorageStore } from "../../store/userProfileLocalStorageStore";

interface AdminHomeProps { pagename?: string }

const AdminHome: FC<AdminHomeProps> = () => {

    const profileSaved = userProfileLocalStorageStore((state) => state.profileSaved);

    useEffect(() => {
        if (!profileSaved) {
            window.location.replace('/admin/profile/');
        }
    }, []);

    return (
        <div className={styles.AdminHome} data-testid="AdminHome">
            <AdminFeaturedInfo />
            <Chart title="User Analytics" dataGrid={true} dataKey="Active User" data={data} />
            <div className={styles.AdminHomeWidgets}>
                <AdminWidgetSm />
                <AdminWidgetLg />
            </div>
        </div>
    )
};

export default AdminHome;


