/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './loginControl.css';
import { useOidc, useOidcIdToken } from "@axa-fr/react-oidc";
import { useOidcUser } from '@axa-fr/react-oidc';
import {Avatar, Box, Button, Typography} from "@mui/material";
function LoginControl(props) {
    const { login, logout, isAuthenticated } = useOidc();
    const { oidcUser, oidcUserLoadingState } = useOidcUser();

    // const removeSessionStorageOidc = () => {
    //     var oidcKeys = Object.keys(sessionStorage)
    //         .filter((key) => key.startsWith('oidc.user'));
    //     //console.log(oidcKeys);
    //     oidcKeys.forEach(k => sessionStorage.removeItem(k));
    // }

    const loginPlain = async () => {
        await login("/admin");
    }

    const loginMfa = async () => {
        console.log("loginMfa");
        await login("/admin", {
            acr_values: "mfa"
        });
        // await auth.signinRedirect({
        //     acr_values: "mfa"
        // });
    }

    const loginHwk = async () => {
        console.log("loginHwk");
        await login("/admin", {
            acr_values: "hwk"
        });

        // await auth.signinRedirect({
        //     acr_values: "hwk"
        // });
    }

    const logoutPlain = async () => {
        await logout();
        //await auth.removeUser();
        // eslint-disable-next-line react/prop-types
        localStorage.removeItem("profileStore");
        props.onLogout();
    }

    const stringAvatar = (name) => {
        const currentName = String(name);
        console.log(currentName);
        if(currentName===null || currentName===undefined || currentName===''){
            return "DN";
        }
        return {
            children: `${currentName.split(' ')[0][0]}${currentName.split(' ')[1][0]}`,
        };
    }
    
    const logoutAndRevoke = async () => {
        await logout();
        //await auth.revokeTokens(["access_token", "refresh_token"]);
        //await auth.removeUser();
        //removeSessionStorageOidc();
        localStorage.removeItem("profileStore");
        props.onLogout();
    }

    if (isAuthenticated) {
        let name = oidcUser == null ? "(none)" : oidcUser.name;
        return (
            <Box pl={4} display={"flex"} flex-direction={"row"} alignItems={"flex-start"} component={"div"}>
                <Typography fontSize={ 12 } pr={2}>Benvenuto, {name}</Typography>
                <Button color="inherit" onClick={logoutPlain}><Typography fontSize={ 12 }>Logout</Typography></Button>
                {/*<Avatar {...stringAvatar({name})}/>*/}
            </Box>
        );
    } else {
        return (
            <>
                <Box display={"flex"} flex-direction={"row"} justifyContent={'flex-end'} component={"div"} align-items={"top"}>
                    <Button color="inherit" onClick={loginPlain}><Typography fontSize={ 12 }>Log in</Typography></Button>                
                    {/*<Button color="inherit" onClick={loginMfa}><Typography fontSize={ 12 }>Log in [MFA]</Typography></Button>*/}
                </Box>
                {/*<span className="helloUser"><a href="#" onClick={loginPlain}></a></span>*/}
                {/*<span className="helloUser"><a href="#" onClick={loginMfa}>Log in [MFA]</a></span>*/}
                {/*
                    The following link is used for the "Super Secret" page
                    The scenario is when using three levels of Step-Up auth which are:
                    - Password (pwd)
                    - TOTP Google Authenticator (mfa)
                    - Hardware FIDO2 key (hwk)
                 */}
                {/* <span className="helloUser"><a href="#" onClick={loginHwk}>Log in [HWK]</a></span> */}
            </>
        );
    }
}


export default LoginControl; 