import React, {FC, useEffect} from 'react';
import styles from './AdminWorkshops.module.css';
import {useOidcFetch} from "@axa-fr/react-oidc";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminWorkshopsProps {
}

const AdminWorkshops: FC<AdminWorkshopsProps> = () => {

    const {fetch} = useOidcFetch();

    useEffect(() => {
        const loadWorkshops = async () => {
            const data = await fetch("https://hello.vevy.com/realms/DotNetLiguria/users", {});
            console.log(data);
        }
        loadWorkshops().catch(console.error);
    }, []);
    
    return (
        <>
            AdminWorkshops Component
        </>
    )
};

export default AdminWorkshops;
