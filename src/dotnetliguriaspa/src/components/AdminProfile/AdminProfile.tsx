import React,{FC,useEffect,useState} from 'react';
import {useOidcIdToken,useOidcUser} from '@axa-fr/react-oidc';
import {UserProfile} from '../../models/UserProfile';
import {FormProfileData} from '../../models/FormProfileData';
import {useForm,SubmitHandler} from "react-hook-form";
import {userProfileLocalStorageStore} from '../../store/userProfileLocalStorageStore';
import {KeyCloakUserProfile} from '../../models/KeyCloakUserProfile';
import {useOidcFetch} from "@axa-fr/react-oidc";
import {jwtDecode} from 'jwt-decode';
import {Box,Button,Container,Grid,TextField,Typography} from "@mui/material";
import styles from './AdminProfile.module.css';
const AdminProfile : FC=() => {

    // const esempio = "esempio";
    
    const {idToken}=useOidcIdToken();
    // const { accessToken } = useOidcAccessToken();
    const {fetch}=useOidcFetch();
    const {setProfileSaved}=userProfileLocalStorageStore();
    const {oidcUser}=useOidcUser();
    const [loggedUser,setLoggedUser]=useState<UserProfile>();
    const profileSaved=userProfileLocalStorageStore((state) => state.profileSaved);

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    }=useForm<FormProfileData>();

    useEffect(() => {
        
        if (oidcUser !== null) {
            const currentUser : UserProfile={
                email:oidcUser?.email,
                family_name:oidcUser.family_name,
                given_name:oidcUser.given_name,
                name:oidcUser.name,
                id:oidcUser.sub
            };
            setLoggedUser(currentUser);

            const decodedToken=jwtDecode(idToken);
            setValue("city","citta di prova");
            setValue("prov","provincia");
            setValue("factory","azienda");
            setValue("factoryCity","citta azienda");
            setValue("factoryProv","provincia azienda");
            setValue("socialTwitter","twitter");
            setValue("socialLinkedin","linkedin");
            setValue("socialGitHub","github");
            setValue("consentData",true);
            setValue("consentPrivacy",true);
            setValue("factoryRoles","IT Manager");
        }
    },[oidcUser]);

    const onSubmit : SubmitHandler<FormProfileData>=(data) => {
        
        data.firstname=loggedUser?.given_name || '';
        data.lastname=loggedUser?.family_name || '';
        data.email=loggedUser?.email || '';

        const keyCloakProfile : KeyCloakUserProfile={
            id:loggedUser?.id,
            username:data.email,
            firstName:data.firstname,
            email:data.email,
            lastName:data.lastname,
            emailVerified:true,
            userProfileMetadata:{
                attributes:[],
                groups:[]
            },
            attributes:{
                d_city:[],
                d_prov:[],
                d_factory_name:[],
                d_factory_city:[],
                d_factory_prov:[],
                d_factory_role:[],
                d_social_twitterX:[],
                d_social_linkedin:[],
                d_social_github:[],
                d_consent:[],
                d_privacy_consent:[]
            }
        };

        const dataConsent=data.consentData ? "S" : "N";
        const dataPrivacyConsent=data.consentPrivacy ? "S" : "N";
        keyCloakProfile.attributes.d_city.push(data.city);
        keyCloakProfile.attributes.d_prov.push(data.prov);
        keyCloakProfile.attributes.d_factory_name.push(data.factory);
        keyCloakProfile.attributes.d_factory_city.push(data.factoryCity);
        keyCloakProfile.attributes.d_factory_prov.push(data.factoryProv);
        keyCloakProfile.attributes.d_factory_role.push(data.factoryRoles);
        keyCloakProfile.attributes.d_social_twitterX.push(data.socialTwitter);
        keyCloakProfile.attributes.d_social_linkedin.push(data.socialLinkedin);
        keyCloakProfile.attributes.d_social_github.push(data.socialGitHub);
        keyCloakProfile.attributes.d_consent.push(dataConsent);
        keyCloakProfile.attributes.d_privacy_consent.push(dataPrivacyConsent);

        const jsonBody=JSON.stringify(keyCloakProfile);

        fetch('http://192.168.150.201:8080/realms/TraloSystem/account',{
            method:'POST',
            body:jsonBody
        }).then(response => response.text());

        setProfileSaved(true);
    };

    return (
        <>
            <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
                <Container component={ "div" } sx={ {"padding-top":15} }>
                    <Box component={ "div" } pb={ 3 }><Typography variant={ "h6" }>PROFILO UTENTE</Typography>
                        { !profileSaved &&
                            <Box component={"span"}>
                                <Typography variant={"inherit"} fontSize={14} sx={{"color": "red"}}>I tuoi dati non sono ancora stati confermati.</Typography>
                            </Box> 
                        }
                    </Box>
                    <Box component={ "div" } pb={ 3 }><Typography fontSize={ 12 } fontStyle={ 'italic' }>INFORMAZIONI
                        PERSONALI</Typography></Box>
                    <Grid container spacing={ 2 } pb={ 3 }>
                        <Grid item xs={ 3 } md={ 3 }><Box component={ "div" } display={ 'flex' }
                                                          flexDirection={ 'column' }>
                            <TextField value={ loggedUser?.given_name }
                                       { ...register("firstname",{
                                           required:"Il nome è obbligatorio",
                                           minLength:{
                                               value:3,
                                               message:"Name should be at least 3 characters",
                                           },
                                           maxLength:{
                                               value:50,
                                               message:"Name should be at most 10 characters",
                                           },
                                       }) } id="firstname" label="Nome" variant="standard"
                                       InputLabelProps={ {shrink:true} }/>
                            { errors.firstname && <Typography variant={ "inherit" } color={ "red" }
                                                              fontSize={ 12 }>{ errors.firstname &&
                                <span>This field is required</span> }</Typography> }

                        </Box></Grid>
                        <Grid item xs={ 3 } md={ 3 }><Box component={ "div" } display={ 'flex' }
                                                          flexDirection={ 'column' }>

                            <TextField value={ loggedUser?.family_name }
                                       { ...register("lastname",{
                                           required:"Il cognome è obbligatorio.",
                                           minLength:{
                                               value:3,
                                               message:"Name should be at least 3 characters",
                                           },
                                           maxLength:{
                                               value:50,
                                               message:"Name should be at most 10 characters",
                                           },
                                       }) } id="lastname" label="Cognome" variant="standard"
                                       InputLabelProps={ {shrink:true} }/>
                            { errors.lastname && <Typography variant={ "inherit" } color={ "red" }
                                                              fontSize={ 12 }>{ errors.lastname &&
                                <span>This field is required</span> }</Typography> }
                            
                            
                            {/*<label*/}
                            {/*    htmlFor="lastname"><Typography fontSize={ 12 }>Cognome</Typography></label><input*/}
                            {/*id="lastname"*/}
                            {/*type="text" { ...register("lastname",{maxLength:50}) }*/}
                            {/*value={ loggedUser?.family_name }*/}
                            {/*disabled/>{ errors.lastname &&*/}
                            {/*<span>This field is required</span> }*/}
                            
                        </Box></Grid>
                        <Grid item xs={ 3 } md={ 3 }> <Box component={ "div" } display={ 'flex' }
                                                           flexDirection={ 'column' }>

                            <TextField value={ loggedUser?.email }
                                       { ...register("email",{
                                           required:"Il cognome è obbligatorio.",
                                           minLength:{
                                               value:3,
                                               message:"Name should be at least 3 characters",
                                           },
                                           maxLength:{
                                               value:50,
                                               message:"Name should be at most 10 characters",
                                           },
                                           pattern:{
                                               value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                               message:'Indirizzo email non valid',
                                           }
                                       }) } id="email" label="Email" variant="standard"
                                       InputLabelProps={ {shrink:true} }/>
                            { errors.email && <Typography variant={ "inherit" } color={ "red" }
                                                              fontSize={ 12 }>{ errors.email &&
                                <span>Campo email obbligatorio</span> }</Typography> }
                        </Box></Grid>
                        <Grid item xs={ 3 } md={ 3 }><Box component={ "div" } display={ 'flex' } flexDirection={ 'column' }>
                            <TextField 
                                       { ...register("city",{
                                           required:"Il campo città è obbligatorio",
                                           minLength:{
                                               value:3,
                                               message:"Name should be at least 3 characters",
                                           },
                                           maxLength:{
                                               value:50,
                                               message:"Name should be at most 10 characters",
                                           },
                                       }) } id="citta" label="Città" variant="standard"
                                       InputLabelProps={ {shrink:true} }/>
                            { errors.city && <Typography variant={ "inherit" } color={ "red" }
                                                              fontSize={ 12 }>{ errors.city &&
                                <span>Campo città obbligatorio</span> }</Typography> }
                            
                        </Box></Grid>
                        
                        <Grid item xs={ 3 } md={ 3 }><Box component={ "div" } display={ 'flex' } flexDirection={ 'column' }>
                            <TextField
                                { ...register("prov",{
                                    required:"Il campo provincia è obbligatorio",
                                    minLength:{
                                        value:3,
                                        message:"Name should be at least 3 characters",
                                    },
                                    maxLength:{
                                        value:50,
                                        message:"Name should be at most 10 characters",
                                    },
                                }) } id="provincia" label="Provincia" variant="standard"
                                InputLabelProps={ {shrink:true} }/>
                            { errors.prov && <Typography variant={ "inherit" } color={ "red" }
                                                              fontSize={ 12 }>{ errors.prov &&
                                <span>Campo provincia obbligatorio</span> }</Typography> }
                            
                        </Box></Grid>
                    </Grid>
                    <Box component={ "div" } pb={ 1 }>
                        <Typography fontSize={ 16 } fontStyle={ 'italic' } >INFORMAZIONI AZIENDALI</Typography>
                        <Grid container spacing={ 2 } pb={ 3 } pt={ 2 }>
                            <Grid item xs={ 3 } md={ 3 }>
                                <Box component={ "div" } display={ 'flex' } flexDirection={ 'column' } fontSize={ 12 }>
                                    <TextField
                                        { ...register("factory")} id="factory" label="Azienda" variant="standard"
                                        InputLabelProps={ {shrink:true} }/>
                                </Box>
                            </Grid>
                            <Grid item xs={ 3 } md={ 3 }>
                                <Box component={ "div" } display={ 'flex' } flexDirection={ 'column' }>
                                    <TextField
                                        { ...register("factoryCity")} id="factoryCity" label="Città" variant="standard"
                                        InputLabelProps={ {shrink:true} }/>
                                </Box>
                            </Grid>
                            <Grid item xs={ 3 } md={ 3 }>
                                <Box component={ "div" } display={ 'flex' } flexDirection={ 'column' }>

                                    <TextField
                                        { ...register("factoryProv")} id="factoryProv" label="Provincia" variant="standard"
                                        InputLabelProps={ {shrink:true} }/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component={ "div" } pb={ 3 }><Typography fontSize={ 16 } fontStyle={ 'italic' }>SE VUOI FARTI
                        CONOSCERE...</Typography>
                        <Grid container spacing={ 2 } pb={ 3 } pt={ 2 }>
                            <Grid item xs={ 3 } md={ 3 }>
                                <Box component={ "div" } display={ 'flex' } flexDirection={ 'column' } fontSize={ 12 }>

                                    <TextField
                                        { ...register("socialTwitter")} id="socialTwitter" label="X/Twitter" variant="standard"
                                        InputLabelProps={ {shrink:true} }/>
                                </Box>
                            </Grid>
                            <Grid item xs={ 3 } md={ 3 }>
                                <Box component={ "div" } display={ 'flex' } flexDirection={ 'column' } fontSize={ 12 }>

                                    <TextField
                                        { ...register("socialLinkedin")} id="socialLinkedin" label="Linkedin" variant="standard"
                                        InputLabelProps={ {shrink:true} }/>
                                </Box>
                            </Grid>
                            <Grid item xs={ 3 } md={ 3 }>
                                <Box component={ "div" } display={ 'flex' } flexDirection={ 'column' } fontSize={ 12 }>
                                    <TextField
                                        { ...register("socialGitHub")} id="socialGitHub" label="Github" variant="standard"
                                        InputLabelProps={ {shrink:true} }/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component={ "div" } pb={ 3 }><Typography fontSize={ 16 } fontStyle={ 'italic' }>CONSENSO
                        TRATTAMENTO DEI DATI</Typography>
                        <Grid container spacing={ 2 } pb={ 3 } pt={ 2 }>
                            <Grid item xs={ 3 } md={ 6 }>
                                <Box component={ "div" } display={ 'flex' } flexDirection={ 'column' } fontSize={ 12 } alignItems={'flex-start'}>
                                    <label htmlFor="consentData"><Typography fontSize={ 12 }>Consenso trattamento dei
                                        dati</Typography></label>
                                    <input id="consentData"
                                           type="checkbox" { ...register("consentData",{required:true}) } />
                                    { errors.consentData && <span>This field is required</span> }
                                </Box>
                            </Grid>
                            <Grid item xs={ 3 } md={ 6 }>
                                <Box component={ "div" } display={ 'flex' } flexDirection={ 'column' } fontSize={ 12 } alignItems={'flex-start'}>
                                    <label htmlFor="consentPrivacy"><Typography fontSize={ 12 }>Consenso
                                        privacy</Typography></label>
                                    <input id="consentPrivacy"
                                           type="checkbox" { ...register("consentPrivacy",{required:true}) } />
                                    { errors.consentPrivacy && <span className={styles.alert}>This field is required</span> }
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component={ "div" } display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                        {/*<input type="submit" className="btn btn-primary"/>*/}
                        <Button type="submit" variant="contained">Invia</Button>
                    </Box>
                </Container>
            </form>


        </>
    )
};

export default AdminProfile;
