import './App.css';
import React,{useEffect,useState} from 'react';
import {useOidc} from "@axa-fr/react-oidc";
import {Route,Routes} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import AdminWorkshops from "./components/AdminWorkshops/AdminWorkshops";
import AdminSpeakers from "./components/AdminSpeakers/AdminSpeakers";
import AdminHome from './components/AdminHome/AdminHome';
import AdminProfile from './components/AdminProfile/AdminProfile';
import AdminFeedbacks from './components/AdminFeedbacks/AdminFeedbacks';
import AdminEvents from './components/AdminEvents/AdminEvents';
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import AboutUs from "./components/AboutUs/AboutUs";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import HomePage from "./components/HomePage/HomePage";
import Workshops from "./components/Workshops/Workshops";
import AdminDownloads from "./components/AdminDownloads/AdminDownloads";

function App() {
    const {isAuthenticated}=useOidc();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result,setResult]=useState("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isError,setIsError]=useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.removeItem("profileStore");
        }
        console.log("Auth: ",isAuthenticated);
    },[isAuthenticated]);

    return (
        <div className="App">
            <>
                { isAuthenticated && (
                    <Routes>
                        {/*<Route path='/' element={ <HomePage/> }/>*/}
                        <Route element={ <AdminLayout/> }>
                            <Route path='/admin' element={ <AdminHome pageName={ "Admin Dashboard" }/> }/>
                            <Route path='/admin/profile/' element={ <AdminProfile/> }/>
                            <Route path='/admin/speakers/' element={ <AdminSpeakers pageName={ "Speakers" }/> }/>
                            <Route path='/admin/workshops/' element={ <AdminWorkshops pageName={ "Workshops" }/> }/>
                            <Route path='/admin/events/' element={ <AdminEvents pageName={ "Events" }/> }/>
                            <Route path='/admin/feedbacks' element={ <AdminFeedbacks pageName={ "Feedbacks" }/> }/>
                            <Route path='/admin/downloads' element={ <AdminDownloads pageName={ "Downloads" }/> }/>
                        </Route>
                    </Routes>
                ) }
                <Routes>
                    <Route element={ <Layout/> }>
                        <Route>
                            <Route path='/' element={ <HomePage/> }/>
                            <Route path="/about-us" element={ <AboutUs pageName={ "About Us" }/> }></Route>
                            <Route path="/workshops" element={ <Workshops pageName={ "Workshops" }/> }></Route>
                        </Route>
                    </Route>
                </Routes>
            </>
        </div>
    );

}

export default App;
