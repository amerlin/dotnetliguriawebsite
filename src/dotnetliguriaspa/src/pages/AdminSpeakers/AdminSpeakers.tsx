import React, {FC, useEffect} from 'react';
import styles from './AdminSpeakers.module.css';
import {useOidcFetch} from "@axa-fr/react-oidc";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminSpeakersProps {
}

const AdminSpeakers: FC<AdminSpeakersProps> = () => {
    const {fetch} = useOidcFetch();

    useEffect(() => {
        const loadWorkshops = async () => {
            const data = await fetch("https://localhost:64561/api/Speaker/Get", {});
            console.log(data);
        }
        loadWorkshops().catch(console.error);
    }, []);
    
    return (
        <div className={styles.AdminSpeakers} data-testid="AdminSpeakers">
            Admin Speakers
        </div>
    )
    
};

export default AdminSpeakers;
