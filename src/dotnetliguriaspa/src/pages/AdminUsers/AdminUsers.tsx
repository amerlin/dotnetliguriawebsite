import React, {FC, useEffect} from 'react';
import styles from './AdminUsers.module.css';
import {useOidcFetch} from "@axa-fr/react-oidc";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminUsersProps {
}

const AdminUsers: FC<AdminUsersProps> = () => {
        const {fetch} = useOidcFetch();

        useEffect(() => {
            const loadUsers = async () => {
                const data = await fetch("https://hello.vevy.com/realms/DotNetLiguria/users", {});
                console.log(data);
            }
            console.log("I'm here");
            loadUsers().catch(console.error);
        }, []);

        return (
            <div className={styles.AdminUsers} data-testid="AdminUsers">
                AdminUsers Component
            </div>
        )
    }
;

export default AdminUsers;
