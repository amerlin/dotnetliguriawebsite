import React,{FC} from 'react';
import {Box,Container,Grid,Paper,styled} from "@mui/material";
import logo from "../../assets/Logo_H200.png";

interface HomeMainBoxProps{
    pagename : string
}

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
const HomeMainBox : FC<HomeMainBoxProps>=({pagename}) => {

    const Item=styled(Paper)(({theme}) => ({
        backgroundColor:theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding:theme.spacing(1),
        textAlign:'justify',
        color:theme.palette.text.secondary,
    }));

    return (
        <>
            <Container component={ "div" } sx={ {"padding-top":15} }>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 }>
                        <Item>
                            Ciao .Net Liguria è costituito da un gruppo di appassionati che ha come scopo la diffusione
                            della cultura informatica nell &apos;ambito della produzione del software (desktop, web,
                            mobile e anche IOT).
                        </Item>
                        <Item>
                            Il coronavirus ci ha impedito in quest&apos;ultimo anno di organizzare qualsiasi
                            manifestazione: questo ci ha portato a ripensare alle modalità di erogazione degli eventi e
                            manifestazioni che organizziamo.
                            Per tale motivo abbiamo pensato di creare il nostro canale youtube, che raccoglierà molti
                            video relativi agli argomenti che normalmente trattiamo.
                        </Item>
                        <Item>
                            Lo scopo di questo canale sarà quello di continuare a parlare di quello che più ci
                            appassiona, ma anche integrare con nuovi contenuti gli eventi dal vivo che presto
                            ritorneremo a organizzare.
                        </Item>
                        <Item>
                            Il
                            Con l&apos;occasione Vi ricordiamo che la partecipazione ai nostri eventi è sempre stata, e
                            sempre sarà, gratuita: questo grazie allo sforzo personale di decine di professionisti del
                            settore che volontariamente convidono le loro conoscenze.
                        </Item>
                        <Item>
                            Proprio per questo motivo Vi chiediamo di supportarci sottoscrivendoVi al nostro canale,
                            nonchè di commentarne i contenuti: solo in questo modo saremo in grado di migliorare quanto
                            presentato e potremo continuare a portare avanti le iniziative della nostra community.
                        </Item>
                        <Item>
                            Grazie !
                        </Item>
                    </Grid>
                </Grid>
                <Box component={ "div" } pt={4} pb={6} display={"flex"} alignItems={'center'} justifyContent={'center'}>
                    <img src={ logo } className="App-logo" width={"40%"} alt="logo"/>
                </Box>
            </Container>
        </>
    )
};

export default HomeMainBox;
