import React, { FC, useEffect } from 'react';
import styles from './AdminProfile.module.css';
import { useOidcAccessToken, useOidcIdToken, useOidcUser } from '@axa-fr/react-oidc';
import { UserProfile } from '../../models/UserProfile';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminProfileProps { pagename?: string; }

const AdminProfile: FC<AdminProfileProps> = () => {

  const { idToken } = useOidcIdToken();
  const { accessToken } = useOidcAccessToken();
  const { oidcUser } = useOidcUser();

  useEffect(() => {
    console.log("I'm here", oidcUser);
    console.log(idToken);
    console.log(accessToken);

    if (oidcUser !== null) {
      const currentUser: UserProfile = { email: oidcUser?.email, family_name: oidcUser.family_name, given_name: oidcUser.given_name, name: oidcUser.name };
      console.log("Current user: ", currentUser);
    }

  }, [oidcUser]);

  return (
    <div className={styles.AdminProfile} data-testid="AdminProfile">
      <div className={styles.Title}> Profile</div>
      <div className='container'>
        <div className='row'>
          <div className="col-md-3">Colonna1</div>
          <div className="col-md-3">Colonna2</div>
          <div className="col-md-3">Colonna3</div>
        </div>
      </div>
    </div>
  )
};

export default AdminProfile;
