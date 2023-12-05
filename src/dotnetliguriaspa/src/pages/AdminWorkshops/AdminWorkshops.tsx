import React, {FC, useEffect, useState} from 'react';
import styles from './AdminWorkshops.module.css';
import { useOidcFetch } from '@axa-fr/react-oidc';
import { Workshop } from '../../models/Workshop';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminWorkshopsProps {}

const AdminWorkshops: FC<AdminWorkshopsProps> = () => {
    
    const { fetch } = useOidcFetch();
    const [data, setdata] = useState<Workshop[]>();

    useEffect(() => {
        const loadWorkshops = async () => {
            await fetch("https://localhost:64561/api/Workshop/Get")
                .then(response => response.json())
                .then(data => {
                    console.log(data); setdata(data)
                }).catch(error => console.error('Error:', error));
        }
        loadWorkshops().catch(console.error);
    }, []);

    return (
        <div className={styles.AdminWorkshops}>
            Workshops Component
            <p>Total workshops: {data?.length}</p>
        </div>
    )
};

export default AdminWorkshops;
