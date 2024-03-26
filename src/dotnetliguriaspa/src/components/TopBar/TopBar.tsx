import React , {FC , useState} from 'react';
import LoginControl from "../loginControl";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import {useOidc,useOidcUser} from "@axa-fr/react-oidc";

import {
    AppBar,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Avatar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,ListItemButton,
    Stack,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';

interface TopBarProps{
    pageName?: string;
    showMenu: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TopBar: FC<TopBarProps>=({showMenu, pageName}) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {oidcUser}=useOidcUser();
    const [isDrawerOpen , setIsDrawerOpen]=useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { login, logout, isAuthenticated } = useOidc();
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result , setResult]=useState("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isError , setIsError]=useState(true);

    const loggedOut=() => {
        setResult("");
        setIsError(true);
        localStorage.removeItem("profileStore");
        window.location.href = '/';
    }

    const DotNetLiguriaAppBar=styled(AppBar)(({theme}) => ({
        backgroundColor : theme.palette.primary.main ,
        margin : 5 ,
        fontFamily : 'Roboto'
    }));
    
    return (
            <DotNetLiguriaAppBar position="static" sx={{background : "#648B2D"}}>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <Typography variant='h6' component={'div'} sx={{flexGrow : 1}}>
                            DotNet Liguria
                        </Typography>
                        {showMenu &&
                            <IconButton edge='start' color='inherit' arial-label='open drawer'
                                        sx={{mr : 2 , display : {xs : 'block' , sm : 'none'}}}
                                        onClick={() => setIsDrawerOpen(true)}>
                                <MenuIcon/>
                            </IconButton>
                        }
                    </IconButton>
                    <Stack direction={"row"} 
                           sx={{
                               display : {
                                   xs : 'none' ,
                                   sm : 'flex' ,
                                   md : 'flex' ,
                                   lg : 'flex' ,
                                   xl : 'flex'
                               },
                               "flex-grow": "6",
                               "justify-content":"flex-end",
                               "align-item":"center"
                           }}>
                        <Link pl={1} pr={1} alignContent={'center'} underline={"none"} component={RouterLink} color="inherit" to='/'><Typography fontSize={ 12 }>HOME</Typography></Link>
                        <Box  alignContent={'center'} >
                            <Divider orientation="vertical" flexItem sx={{backgroundColor: "white", height: "13px",borderBottomWidth: '10px' }}/>
                        </Box>
                        <Link pl={1} pr={1} alignContent={'center'} underline={"none"} component={RouterLink} color="inherit" to="/about-us"><Typography fontSize={ 12 }>CHI SIAMO</Typography></Link>
                        <Box  alignContent={'center'} >
                            <Divider orientation="vertical" flexItem sx={{backgroundColor: "white", height: "13px",borderBottomWidth: '10px'}}/>
                        </Box>                            
                        <Link pl={1} pr={1} alignContent={'center'} underline={"none"} component={RouterLink} color="inherit" to="/workshops"><Typography fontSize={ 12 }>WORKSHOPS</Typography></Link>
                        <Box  alignContent={'center'} >
                            <Divider orientation="vertical" flexItem sx={{backgroundColor: "white", height: "13px",borderBottomWidth: '10px'}}/>
                        </Box>
                        {(isAuthenticated) &&
                            <>
                                <Link pl={1} pr={1} component={RouterLink} underline={"none"} color="inherit" to="/admin" alignContent={'center'}><Typography fontSize={ 12 }>ADMIN</Typography></Link>
                                <LoginControl onLogout={ loggedOut }/>
                            </>
                        }
                        {(!isAuthenticated) &&
                            <LoginControl/>
                        }
                        
                    </Stack>
                </Toolbar>
                {showMenu &&
                <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <List sx={{width : 250}}>
                        <ListItem sx={{'padding-left' : 0}}>
                            <ListItemButton component='a' href='/users'>Admin</ListItemButton>
                        </ListItem>
                        <ListItem sx={{'padding-left' : 0}}>
                            <ListItemButton component='a' href='/logout'>Logout</ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                }
            </DotNetLiguriaAppBar>
    );
}
export default TopBar;
