import React, {FC} from 'react';
import styles from './ShowPermissions.module.css';
import {useOidcUser} from "@axa-fr/react-oidc";
import Oidc from "@axa-fr/react-oidc/dist/vanilla/oidc";
import {UserInfoExtended} from "../../models/UserInfoExtended";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ShowPermissionsProps {
}

const ShowPermissions: FC<ShowPermissionsProps> = () => {
    const {oidcUser, oidcUserLoadingState} = useOidcUser();
    const userInfoExtended = oidcUser as UserInfoExtended;
    return (
        <div className={styles.ShowPermissions} data-testid="ShowPermissions">
            <p>User Roles</p>
            <ul>
                {userInfoExtended.roles.map((name, index) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </div>
    )
};

export default ShowPermissions;
