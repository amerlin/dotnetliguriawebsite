import React , {FC , useState} from 'react';
import LoginControl from "../loginControl";
import {useOidc,useOidcUser} from "@axa-fr/react-oidc";
import {
    AppBar,Avatar,
    Box,
    Button,Container,Divider,
    Drawer,
    IconButton,
    List,
    ListItem,ListItemButton,
    Stack,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import {CatchingPokemon , Padding} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';

interface TopBarProps{
    pageName?: string;
    showMenu: boolean;
}

const TopBar: FC<TopBarProps>=({showMenu, pageName}) => {

    const {oidcUser}=useOidcUser();
    const [isDrawerOpen , setIsDrawerOpen]=useState<boolean>(false);
    const { login, logout, isAuthenticated } = useOidc();
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result , setResult]=useState("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isError , setIsError]=useState(true);

    const loggedOut=() => {
        setResult("");
        setIsError(true);
        localStorage.removeItem("profileStore");
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
                        <CatchingPokemon/>
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
                               "justify-content":"flex-end"
                           }}>
                        <Button color="inherit" href={"/"}><Typography fontSize={ 12 }>Home</Typography></Button>
                        <Button color="inherit"><Typography fontSize={ 12 }>Workshops</Typography></Button>
                        <Button color="inherit"><Typography fontSize={ 12 }>Chi siamo</Typography></Button>
                        {(showMenu || isAuthenticated) &&
                            <>
                                <Button color="inherit" href="/admin"><Typography fontSize={ 12 }>Admin</Typography></Button>
                                {/*<Button color="inherit" ><Typography fontSize={ 12 }>Configurazione</Typography></Button>*/}
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
                            <ListItemButton component='a' href='/users'>Gestione utenti</ListItemButton>
                        </ListItem>
                        <ListItem sx={{'padding-left' : 0}}>
                            <ListItemButton component='a' href='/configuration'>Configurazione</ListItemButton>
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
