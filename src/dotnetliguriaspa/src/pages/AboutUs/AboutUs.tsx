import React, { FC } from 'react';
import styles from './AboutUs.module.css';
import logo from "../../assets/Logo_H200.png";
import {Box,Typography} from "@mui/material";

interface AboutUsProps { pagename:string}

const AboutUs: FC<AboutUsProps> = ({pagename}) => {
  return (
      <Box display={"flex"} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
          <Typography font-size={12}>{pagename}</Typography>
          <img src={logo} className="App-logo" alt="logo" />
      </Box>
  )
};

export default AboutUs;
