import React, { FC, useEffect, useState } from 'react';
import styles from './AdminSpeakers.module.css';
import { useOidcFetch } from "@axa-fr/react-oidc";
import Speaker from '../../models/Speaker';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminSpeakersProps {
}

const AdminSpeakers: FC<AdminSpeakersProps> = () => {
    const { fetch } = useOidcFetch();
    const [data, setdata] = useState<Speaker[]>();

    useEffect(() => {
        const loadWorkshops = async () => {
            await fetch("https://localhost:64561/api/Speaker/Get")
                .then(response => response.json())
                .then(data => {
                    console.log(data); setdata(data)
                }
                )
                .catch(error => console.error('Error:', error));
        }
        loadWorkshops().catch(console.error);
    }, []);

    return (
        <div className={styles.AdminSpeakers} data-testid="AdminSpeakers">
            Admin Speakers
            <p>Total speakers: {data?.length}</p>
        </div>
    )

};

export default AdminSpeakers;
