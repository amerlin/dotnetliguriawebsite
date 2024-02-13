import React, { FC, useEffect, useState } from 'react';
import styles from './AdminProfile.module.css';
import { useOidcUser } from '@axa-fr/react-oidc';
import { UserProfile } from '../../models/UserProfile';
import { FormProfileData } from '../../models/FormProfileData';
import { useForm, SubmitHandler } from "react-hook-form";
import { userProfileLocalStorageStore } from '../../store/userProfileLocalStorageStore';
import { KeyCloakUserProfile } from '../../models/KeyCloakUserProfile';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminProfileProps { pagename?: string; }

const AdminProfile: FC<AdminProfileProps> = () => {

  // const { idToken } = useOidcIdToken();
  // const { accessToken } = useOidcAccessToken();
  const { oidcUser } = useOidcUser();
  const { setProfileSaved } = userProfileLocalStorageStore();
  const [loggedUser, setLoggedUser] = useState<UserProfile>();
  const profileSaved = userProfileLocalStorageStore((state) => state.profileSaved);

  useEffect(() => {
    if (oidcUser !== null) {
      const currentUser: UserProfile = { email: oidcUser?.email, family_name: oidcUser.family_name, given_name: oidcUser.given_name, name: oidcUser.name, id: oidcUser.sub };
      setLoggedUser(currentUser);
    }
  }, [oidcUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProfileData>();

  const onSubmit: SubmitHandler<FormProfileData> = (data) => {
    data.firstname = loggedUser?.given_name || '';
    data.lastname = loggedUser?.family_name || '';
    data.email = loggedUser?.email || '';
    console.log(loggedUser);

    //user profile struct
    const keyCloakProfile: KeyCloakUserProfile = {
      id: loggedUser?.id,
      username: data.email,
      firstName: data.firstname,
      email: data.email,
      lastName: data.lastname,
      emailVerified: true,
      userProfileMetadata: {
        attributes: [],
        groups: []
      },
      attributes: { d_city: [], d_prov: [], d_factory_name: [], d_factory_city: [], d_factory_prov: [], d_factory_role: [], d_social_twitterX: [], d_social_linkedin: [], d_social_github: [] }
    };

    keyCloakProfile.attributes.d_city.push(data.city);
    keyCloakProfile.attributes.d_prov.push(data.prov);
    keyCloakProfile.attributes.d_factory_name.push(data.factory);
    keyCloakProfile.attributes.d_factory_city.push(data.factoryCity);
    keyCloakProfile.attributes.d_factory_prov.push(data.factoryProv);
    keyCloakProfile.attributes.d_factory_role.push(data.factoryRoles);
    keyCloakProfile.attributes.d_social_twitterX.push(data.socialTwitter);
    keyCloakProfile.attributes.d_social_linkedin.push(data.socialLinkedin);
    keyCloakProfile.attributes.d_social_github.push(data.socialGitHub);


    const json = JSON.stringify(keyCloakProfile);
    console.log("call api", json);
    setProfileSaved(true);
  };

  return (
    <div className={styles.AdminProfile} data-testid="AdminProfile">
      <div className={styles.Title}> Profilo <span className={styles.alert}>{!profileSaved && <span>Attenzione I tuoi dati non sono ancora stati confermati.</span>}</span></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.FormGroup}>
          <div className={styles.FormGroupTitle}>INFORMAZIONI PERSONALI</div>
        </div>

        <div className={styles.FormGroup}>
          <div className={styles.FormGroupElement}>
            <label htmlFor="firstname">Nome</label>
            <input type="text" id="firstname" {...register("firstname", { maxLength: 50 })} value={loggedUser?.given_name} disabled />
            {errors.firstname && <span>This field is required</span>}
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="lastname">Cognome</label>
            <input id="lastname" type="text" {...register("lastname", { maxLength: 50 })} value={loggedUser?.family_name} disabled />
            {errors.lastname && <span>This field is required</span>}
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" {...register("email", {
              maxLength: 50, pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              }
            })} value={loggedUser?.email} disabled />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="city">Città</label>
            <input type="text" {...register("city")} />
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="prov">Provincia</label>
            <input id="prov" type="text" {...register("prov")} />
          </div>
        </div>

        <div className={styles.FormGroupSeparator}></div>

        <div className={styles.FormGroup}>
          <div className={styles.FormGroupTitle}>INFORMAZIONI AZIENDALI</div>
        </div>

        <div className={styles.FormGroup}>
          <div className={styles.FormGroupElement}>
            <label htmlFor="industry">Azienda</label>
            <input id="factory" type="text" {...register("factory")} />
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="indroles">Ruolo Aziendale</label>
            <select {...register("factoryRoles", { required: true })}>
              <option value="" selected>Seleziona...</option>
              <option value="IT Manager">IT Manager</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="other">Altro</option>
            </select>
            {errors.factoryRoles && <span>This field is required</span>}
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="indcity">Città</label>
            <input id="factoryCity" type="text" {...register("factoryCity")} />
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="indprov">Provincia</label>
            <input id="factoryProv" type="text" {...register("factoryProv")} />
          </div>
        </div>
        <div className={styles.FormGroupSeparator}></div>
        <div className={styles.FormGroup}>
          <div className={styles.FormGroupTitle}>Se vuoi farti conoscere...</div>
        </div>

        <div className={styles.FormGroup}>
          <div className={styles.FormGroupElement}>
            <label htmlFor="socialTwitter">X / Twitter</label>
            <input id="socialTwitter" type="text" {...register("socialTwitter")} />
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="socialLinkedin">Linkedin</label>
            <input id="socialLinkedin" type="text" {...register("socialLinkedin")} />
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="socialGitHub">GitHub</label>
            <input id="socialGitHub" type="text" {...register("socialGitHub")} />
          </div>
        </div>

        <div className={styles.FormGroupSeparator}></div>

        <div className={styles.FormGroup}>
          <div className={styles.FormGroupTitle}>CONSENSO TRATTAMENTO DEI DATI</div>
        </div>

        <div className={styles.FormGroup}>
          <div className={styles.FormGroupElement}>
            <label htmlFor="consentData">Consenso trattamento dei dati</label>
            <input id="consentData" type="checkbox" {...register("consentData", { required: true })} />
            {errors.consentData && <span>This field is required</span>}
          </div>
          <div className={styles.FormGroupElement}>
            <label htmlFor="consentPrivacy">Consenso privacy</label>
            <input id="consentPrivacy" type="checkbox" {...register("consentPrivacy", { required: true })} />
            {errors.consentPrivacy && <span>This field is required</span>}
          </div>
        </div>


        <div className={styles.FormGroupButtons}>
          <input type="submit" className="btn btn-primary" />
        </div>
      </form >
    </div >
  )
};

export default AdminProfile;
