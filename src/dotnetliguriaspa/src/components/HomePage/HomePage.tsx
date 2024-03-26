import React,{FC,useState} from 'react';
import {useOidc,useOidcAccessToken,useOidcFetch,useOidcIdToken} from "@axa-fr/react-oidc";
import {Box} from "@mui/material";
import HomeMainBox from "../HomeMainBox/HomeMainBox";
import Footer from "../Footer/Footer";

interface HomePageProps{
    pageName? : string
}

interface tokenLevelType{
    [key : string] : number;
}

const acr_to_loa : tokenLevelType=Object.freeze({
    pwd:1,
    mfa:2,
    hwk:3,
});

const HomePage : FC<HomePageProps>=() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {login,logout,renewTokens,isAuthenticated}=useOidc();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {idToken,idTokenPayload}=useOidcIdToken();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {accessToken,accessTokenPayload}=useOidcAccessToken();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result,setResult]=useState("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isError,setIsError]=useState(true);

    const {fetch}=useOidcFetch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const invokeAPI=async (resource : string,requested_loa : number,previousInvocationOk=true) => {
        try {
            console.log(`requesting ${ resource } with loa:${ requested_loa }`);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const token=idToken;
            if (!isAuthenticated) {
                setResult("User is not authenticated");
                setIsError(true);
                return;
            }

            const token_loa=acr_to_loa[accessTokenPayload.acr];
            if (token_loa < requested_loa) {
                setResult("User need higher privileges: " + Object.keys(acr_to_loa)[requested_loa - 1]);
                setIsError(true);
                return;
            }

            const response=await fetch(window.location.origin + "/api/values/" + resource,{
                // headers: {
                //   Authorization: `Bearer ${token}`,
                // },
            });

            if (!response.ok) {
                let message;
                try {
                    const authError=response.headers.get("WWW-Authenticate");
                    message=`Fetch failed with HTTP status ${ response.status } ${ authError }  ${ await response.text() }`;
                } catch (e) {
                    message=`Fetch failed with HTTP status ${ response.status } ${ response.statusText }`;
                }

                setResult(message);
                setIsError(true);
                return;
            }

            setResult(await response.json());
            setIsError(false);
        } catch (e) {
            console.log(e);
            setResult(e.message);
            setIsError(true);
        }
    }

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loggedOut=() => {
        setResult("");
        localStorage.removeItem("profileStore");
        setIsError(true);
    }

    return (
        <>
            <Box display={ "flex" } flexDirection={ 'row' } alignItems={ 'center' } justifyContent={ 'center' }
                 pt={ 3 }>
                <img src={"./images/DotNetLiguriaImperia.jpg"} width={"50%"} alt={"Evento imperia"}/>
            </Box>
            <HomeMainBox pagename={ "homepage" }/>
            <Footer/>
        </>
)
};

export default HomePage;
