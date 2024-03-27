import './App.css';
import React,{useEffect,useState} from 'react';
import {useOidc} from "@axa-fr/react-oidc";
import {Route,Routes} from 'react-router-dom';
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
import AboutUs from "./components/AboutUs/AboutUs";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import HomePage from "./components/HomePage/HomePage";
import Workshops from "./components/Workshops/Workshops";

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
                            <Route path='/admin' element={ <AdminHome pagename={ "Admin Dashboard" }/> }/>
                            <Route path='/admin/profile/' element={ <AdminProfile/> }/>
                            <Route path='/admin/speakers/' element={ <AdminSpeakers pagename={ "Speakers" }/> }/>
                            <Route path='/admin/workshops/' element={ <AdminWorkshops pagename={ "Workshops" }/> }/>
                            <Route path='/admin/events/' element={ <AdminEvents pagename={ "Events" }/> }/>
                            <Route path='/admin/feedbacks' element={ <AdminFeedbacks pagename={ "Feedbacks" }/> }/>
                        </Route>
                    </Routes>
                ) }
                <Routes>
                    <Route element={ <Layout/> }>
                        <Route>
                            <Route path='/' element={ <HomePage/> }/>
                            <Route path="/about-us" element={ <AboutUs pagename={ "About Us" }/> }></Route>
                            <Route path="/workshops" element={ <Workshops pagename={ "Workshops" }/> }></Route>
                        </Route>
                    </Route>
                </Routes>
            </>
        </div>
    );

}

export default App;
