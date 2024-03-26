import React, { FC } from 'react';
import logo from "../../assets/Logo_H200.png";
import {Box,Container,Grid,Paper,styled} from "@mui/material";
interface AboutUsProps { pagename:string}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const AboutUs: FC<AboutUsProps> = ({pagename}) => {

    const Item=styled(Paper)(({theme}) => ({
        backgroundColor:theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding:theme.spacing(1),
        textAlign:'justify',
        color:theme.palette.text.secondary,
    }));
    
    return (
      <>
          <Box display={"flex"} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} pt={3}>
              <img src={logo} className="App-logo" alt="logo" />
          </Box>
              <Container component={ "div" } sx={{"padding-top": 15}}>
                  <Grid container spacing={ 2 }>
                      <Grid item xs={ 12 }>
                          <Item>CHI SIAMO</Item>
                      </Grid>
                  </Grid>
              </Container>
      </>
  )};
          
export default AboutUs;
