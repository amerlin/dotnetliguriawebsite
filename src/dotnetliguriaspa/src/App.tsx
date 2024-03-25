//import logo from './assets/Logo_W400.png';
//import logo from './assets/Logo_H200.png';
//import logo from './assets/Logo_H100.png';
// import { useOidcFetch } from '@axa-fr/react-oidc';
// import { useOidcIdToken, useOidcAccessToken } from '@axa-fr/react-oidc';
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
import './App.css';
import React, { useEffect, useState } from 'react';
import { useOidc } from "@axa-fr/react-oidc";
import { Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import AdminWorkshops from "./pages/AdminWorkshops/AdminWorkshops";
import AdminSpeakers from "./pages/AdminSpeakers/AdminSpeakers";
import AdminHome from './pages/AdminHome/AdminHome';
import AdminProfile from './pages/AdminProfile/AdminProfile';
import AdminFeedbacks from './pages/AdminFeedbacks/AdminFeedbacks';
import AdminEvents from './pages/AdminEvents/AdminEvents';
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import AboutUs from "./pages/AboutUs/AboutUs";
import Workshops from "./pages/Workshops/Workshops";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import HomePage from "./components/HomePage/HomePage";

// const acr_to_loa = Object.freeze({
//     pwd: 1,
//     mfa: 2,
//     hwk: 3,
// });

function App() {
    const { isAuthenticated } = useOidc();
    // const { idToken } = useOidcIdToken();
    // const { accessTokenPayload } = useOidcAccessToken();
    // const { fetch } = useOidcFetch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result, setResult] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isError, setIsError] = useState(true);

    // switch (auth.activeNavigator) {
    //   case "signinSilent":
    //     return <div>Signing you in...</div>;
    //   case "signoutRedirect":
    //     return <div>Signing you out...</div>;
    //   default:
    // }

    // if (auth.isLoading) {
    //   return <div>Loading...</div>;
    // }

    // if (auth.error) {
    //   return <div>Oops... {auth.error.message}</div>;
    // }

    // if (auth.isAuthenticated) {
    //     // console.log("User profile: ", auth.user.profile);
    //     return (
    //         <div>
    //             Hello {auth.user?.profile.name}{" "}
    //             <button onClick={() => void auth.removeUser()}>Log out</button>
    //             <div>Claim sub: {auth.user.profile['sub']}</div>

    //         </div>
    //     );
    // }

    // const invokeAPI = async (resource: string, requested_loa: number, previousInvocationOk = true) => {
    //     try {
    //         console.log(`requesting ${resource} with loa:${requested_loa}`);
    //         const token = idToken;
    //         console.log("Id token: ", token);
    //         if (!isAuthenticated) {
    //             setResult("User is not authenticated");
    //             setIsError(true);
    //             return;
    //         }

    //         const token_loa = acr_to_loa[accessTokenPayload.acr];
    //         if (token_loa < requested_loa) {
    //             setResult("User need higher privileges: " + Object.keys(acr_to_loa)[requested_loa - 1]);
    //             setIsError(true);
    //             return;
    //         }

    //         // const loadedUsers = await fetch("https://hello.vevy.com/realms/DotNetLiguria/users", {
    //         //     // headers: {
    //         //     //   Authorization: `Bearer ${token}`,
    //         //     // },
    //         // });
    //         // console.log(loadedUsers);

    //         const response = await fetch(window.location.origin + "/api/values/" + resource, {
    //             // headers: {
    //             //   Authorization: `Bearer ${token}`,
    //             // },
    //         });

    //         if (!response.ok) {
    //             let message;
    //             try {
    //                 console.log(response);
    //                 const authError = response.headers.get("WWW-Authenticate");
    //                 message = `Fetch failed with HTTP status ${response.status} ${authError}  ${await response.text()}`;
    //             } catch (e) {
    //                 message = `Fetch failed with HTTP status ${response.status} ${response.statusText}`;
    //             }

    //             setResult(message);
    //             setIsError(true);
    //             return;
    //         }

    //         setResult(await response.json());
    //         setIsError(false);
    //     } catch (e) {
    //         console.log(e);
    //         setResult(e.message);
    //         setIsError(true);
    //     }
    // }

    // const loggedOut = () => {
    //     setResult("");
    //     setIsError(true);
    // }

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.removeItem("profileStore");
        }
    }, [isAuthenticated]);

    return (
        <div className="App">
            <>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/about-us" element={<AboutUs pagename={"About Us"}/>}></Route>
                        <Route path="/workshops" element={<Workshops pagename={"Workshops"}/>}></Route>
                    </Route>
                </Routes>
            {isAuthenticated ? (
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route element={<AdminLayout />}>
                            <Route path='/admin' element={<AdminHome pagename={"Admin Dashboard"} />} />
                            <Route path='/admin/profile/' element={<AdminProfile pagename={"Profile"} />} />
                            <Route path='/admin/speakers/' element={<AdminSpeakers pagename={"Speakers"} />} />
                            <Route path='/admin/workshops/' element={<AdminWorkshops pagename={"Workshops"} />} />
                            <Route path='/admin/events/' element={<AdminEvents pagename={"Events"} />} />
                            <Route path='/admin/feedbacks' element={<AdminFeedbacks pagename={"Feedbacks"} />} />
                        </Route>
                    </Routes>
            ) : (
                    <HomePage />
            )}
                </>
        </div>
    );

}

export default App;
