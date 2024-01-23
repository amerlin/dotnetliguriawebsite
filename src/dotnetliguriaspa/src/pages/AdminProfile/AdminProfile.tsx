import React, { FC, useEffect, useState } from 'react';
import styles from './AdminProfile.module.css';
import { useOidcAccessToken, useOidcIdToken, useOidcUser } from '@axa-fr/react-oidc';
import { UserProfile } from '../../models/UserProfile';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminProfileProps { pagename?: string; }

const AdminProfile: FC<AdminProfileProps> = () => {

  const { idToken } = useOidcIdToken();
  const { accessToken } = useOidcAccessToken();
  const { oidcUser } = useOidcUser();
  const [loggedUser, setLoggedUser] = useState<UserProfile>();

  useEffect(() => {
    console.log(oidcUser);
    console.log(idToken);
    console.log(accessToken);

    if (oidcUser !== null) {
      const currentUser: UserProfile = { email: oidcUser?.email, family_name: oidcUser.family_name, given_name: oidcUser.given_name, name: oidcUser.name };
      console.log("Current user: ", currentUser);
      setLoggedUser(currentUser);
    }
  }, [oidcUser]);

  return (
    <div className={styles.AdminProfile} data-testid="AdminProfile">
      <div className={styles.Title}> Profilo</div>

      <div className={styles.FormGroup}>
        <div className={styles.FormGroupTitle}>INFORMAZIONI PERSONALI</div>
      </div>

      <div className={styles.FormGroup}>
        <div className={styles.FormGroupElement}>
          <label htmlFor="firstname">Nome</label>
          <input name="name" id="firstname" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="lastname">Cognome</label>
          <input name="lastname" id="lastname" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="city">Città</label>
          <input name="city" id="city" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="address">Indirizzo</label>
          <input name="address" id="address" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="cap">C.A.P.</label>
          <input name="cap" id="cap" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="prov">Provincia</label>
          <input name="cap" id="prov" type="text" />
        </div>
      </div>

      <div className={styles.FormGroupSeparator}></div>

      <div className={styles.FormGroup}>
        <div className={styles.FormGroupTitle}>INFORMAZIONI AZIENDALI</div>
      </div>

      <div className={styles.FormGroup}>
        <div className={styles.FormGroupElement}>
          <label htmlFor="industry">Azienda</label>
          <input name="industry" id="industry" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="indroles">Ruolo Aziendale</label>
          <input name="indroles" id="indroles" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="indcity">Città</label>
          <input name="indcity" id="indcity" type="text" />
        </div>
        <div className={styles.FormGroupElement}>
          <label htmlFor="indprov">Provincia</label>
          <input name="indprov" id="indprov" type="text" />
        </div>
      </div>

      <div className={styles.FormGroupSeparator}></div>

      <div className={styles.FormGroup}>
        <div className={styles.FormGroupTitle}>SOCIAL MEDIA</div>
      </div>

    </div>
  )
};

export default AdminProfile;
