import React, { FC } from 'react';
import logo from "../../assets/Logo_H200.png";
import {Box,Card,CardContent,CardHeader,CardMedia,Container,Grid,Typography} from "@mui/material";
interface AboutUsProps { pagename:string}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const AboutUs: FC<AboutUsProps> = ({pagename}) => {
    return (
      <>
          <Box display={"flex"} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} pt={3}>
              <img src={logo} className="App-logo" alt="logo" />
          </Box>
              <Container component={ "div" } sx={{"padding-top": 15, "padding-bottom":30}}>
                  <Grid container spacing={ 2 }>
                      <Grid item xs={ 4 } md={ 4 }>
                          <Card>
                              <CardHeader title={<Typography fontSize={12}>Raffaele Rialdi (Presidente)</Typography>}></CardHeader>
                              <CardMedia component={"img"} alt={"Raffaele Rialdi"} src={"./profile/rialdi.jpg"}/>
                              <CardContent >
                                  <Typography fontSize={ 12 } sx={{textAlign:'justify'}}>
                                      Mi occupo professionalmente di sviluppo software dal 1987. Mi sono specializzato
                                      nelle tecnologie di sviluppo basaste su piattaforma Microsoft che nel 2003 mi ha
                                      Mi occupo professionalmente di sviluppo software dal 1987. Mi sono specializzato 
                                      nelle tecnologie di sviluppo basaste su piattaforma Microsoft che nel 2003 mi ha riconosciuto
                                      il premio &quot;Most Valuable Professional&quot; grazie al quale posso rimanere in contatto 
                                      con i team di sviluppo del campus a Redmond dove mi reco ogni anno. Quest&quot;anno ho festeggiato il 9^ award MVP. 
                                      Il mio lavoro consiste nel progettare, coordinare e realizzare software utilizzando 
                                      le tecnologie che più amo come il Framework.NET, C#, C++ e più recentemente WinRT.
                                      Oltre a questo sono consulente, teacher in corsi e speaker in conferenze del settore. 
                                      Nel tempo libero ... sviluppo software e trascorro quanto più tempo mi è possibile con la famiglia.
                                      riconosciuto il premio &quot;Most Valuable Professional&quot; grazie al quale posso rimanere
                                      in contatto con i team di sviluppo del campus a Redmond dove mi reco ogni anno.
                                      Quest&quot;anno ho festeggiato il 9^ award MVP. Il mio lavoro consiste nel progettare,
                                      coordinare e realizzare software utilizzando le tecnologie che più amo come il
                                      Framework.NET, C#, C++ e più recentemente WinRT. Oltre a questo sono consulente,
                                      teacher in corsi e speaker in conferenze del settore. Nel tempo libero ...
                                      sviluppo software e trascorro quanto più tempo mi è possibile con la famiglia.
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Grid>
                      <Grid item xs={ 4 } md={ 4 }>
                          <Card>
                              <CardHeader title={<Typography fontSize={12}>Alessandro Gambaro</Typography>}></CardHeader>
                              <CardMedia height={"335px"} component={"img"} alt={"Alessandro Gambaro"} src={"./profile/gambaro.jpg"}/>
                              <CardContent >
                                  <Typography fontSize={ 12 } sx={ {textAlign:'justify'} }>
                                      Con la passione per l&apos;informatica sin dal 1985 quando ero un bambino con il mio ZX
                                      Spectrum, sono tuttora entusiasta e appassionato di IT, laureato in ingegneria
                                      informatica nel 2000 a Genova ho avuto la possibilità di costruire i miei skills
                                      lavorando e studiando (nessuno nasce imparato dico io :) ) durante tutta la mia
                                      carriera lavorativa.Partito con il C++ ho poi lavorato diversi anni in ambiente
                                      Java (linguaggio che tuttora utilizzo anche se raramente), da qualche anno
                                      utilizzo C# .Net che reputo una ottima piattaforma, che mi appassione e mi stimola
                                      a creare architetture sempre più complete (a parer mio). Nel mio lavoro oltre che
                                      progettare, coordinare lo sviluppo del software mi occupo anche di Agile
                                      Development e Scrum.
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Grid>
                      <Grid item xs={ 4 } md={ 4 }>
                          <Card>
                              <CardHeader title={<Typography fontSize={12}>Marco D&apos;Alessandro</Typography>}></CardHeader>
                              <CardMedia height={"335px"} component={"img"} alt={"Marco DAlessandro"} src={"./profile/marco.jpg"}/>
                              <CardContent >
                                  <Typography fontSize={ 12 } sx={ {textAlign:'justify'} }>
                                      Sono nato e vivo a Genova. Sono un programmatore orientato principalmente su
                                      piattaforma Framework .Net della microsoft, C#, WinForm e Service, Web Service e
                                      Asp.net. Lavoro come Software Engineer/Architect presso Softeco Sismat.
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Grid>
                      <Grid item xs={ 4 } md={ 4 }>
                          <Card>
                              <CardHeader title={<Typography fontSize={12}>Andrea Belloni</Typography>}></CardHeader>
                              <CardMedia height={"335px"} component={"img"} alt={"Andrea Belloni"} src={"./profile/belloni.jpg"}/>
                              <CardContent >
                                  <Typography fontSize={ 12 } sx={ {textAlign:'justify'} }>
                                      Vivo e lavoro a Imperia come libero professionista, mi occupo di consulenza in
                                      ambito Microsoft.NET, C#, VB.Net, ASP.Net, WPF, WCF. Appassionato di architettura
                                      del software, di database (SQLServer) e accesso ai dati (EntityFramework,
                                      Linq2SQL, ADO.NET) … curo lo sviluppo del software per alcune società della zona.
                                      Il mio tempo libero... Famiglia e free climibing.
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Grid>
                      <Grid item xs={ 4 } md={ 4 }>
                          <Card>
                              <CardHeader title={<Typography fontSize={12}>Alessio Gogna</Typography>}></CardHeader>
                              <CardMedia height={"335px"} component={"img"} alt={"Alessio Gogna"} src={"./profile/gogna.jpg"}/>
                              <CardContent>
                                  <Typography fontSize={ 12 } sx={ {textAlign:'justify'} }>
                                      Microsoft Professional Developer, consulente IT, appassionato di .NET Framework,
                                      nostalgico programmatore C++, novello agilista, sostenitore del Free Software e
                                      inguaribile nerd. La mia passione è programmare: ho iniziato a 8 anni con un C=64
                                      e non mi sono ancora fermato. Oggi mi dedico soprattutto a tecnologie Web-Oriented
                                      basate su .Net Framework.
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Grid>
                      <Grid item xs={ 4 } md={ 4 }>
                          <Card>
                              <CardHeader title={<Typography fontSize={12}>Claudio Masieri</Typography>}></CardHeader>
                              <CardMedia height={"335px"} component={"img"} alt={"Claudio Masieri"} src={"./profile/masieri.jpg"}/>
                              <CardContent >
                                  <Typography fontSize={ 12 } sx={ {textAlign:'justify'} }>
                                      Libero professionista, ho lavorato come consulente presso molte realtà Genovesi
                                      (Elsag, Costa, Selex, TSF...). Saltuariamente tengo qualche corso in ambito
                                      Microsoft.Net, c#, vb, asp.net, WCF e Workflow Foundation e talvolta scrivo
                                      qualche articolo per la Wrox, o su Codeproject.
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Grid>
                      <Grid item xs={ 4 } md={ 4 }>
                          <Card>
                              <CardHeader title={<Typography fontSize={12}>Alberto Baroni</Typography>}></CardHeader>
                              <CardMedia height={"335px"} component={"img"} alt={"Alberto Baroni"} src={"./profile/baroni.jpg"}/>
                              <CardContent >
                                  <Typography fontSize={ 12 } sx={ {textAlign:'justify'} }>
                                      Sono nato e vivo a Genova. Per 10 anni mi sono occupato di soluzioni IT in ambito
                                      energetico. Ho collaborato alla progettazione e realizzazione di alcune delle più
                                      importanti soluzioni informatiche utilizzate dagli Operatori Energetici. Dal 2013
                                      sono co-fondatore di Sinergetica Srl società leader nelle soluzioni software per
                                      il mercato enegetico
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Grid>
                      <Grid item xs={ 4 } md={ 4 }>
                          <Card>
                              <CardHeader title={<Typography fontSize={12}>Andrea Sassetti</Typography>}></CardHeader>
                              <CardMedia height={"335px"} component={"img"} alt={"Andrea Sassetti"} src={"./profile/sassetti.jpg"}/>
                              <CardContent >
                                  <Typography fontSize={ 12 } sx={ {textAlign:'justify'} }>
                                      Laureato in Ingegneria Informatica presso l&apos;Università degli studi di Genova nel
                                      2008. Sin dal 2004 mi occupo della tecnologia Microsoft.NET. Sono Microsoft
                                      Professional Developer e lavoro come software engineer nel campo dell&apos;automazione
                                      industriale. Utilizzo principalmente C# e quando c&apos;è bisogno di scolpire il
                                      metallo C++ :). Appassionato di tutto quello che gravita intorno alle NUI.
                                  </Typography>
                              </CardContent>
                          </Card>
                      </Grid>
                  </Grid>
              </Container>
      </>
  )};
          
export default AboutUs;
