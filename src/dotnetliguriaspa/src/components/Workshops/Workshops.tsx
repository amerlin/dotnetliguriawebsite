import React, { FC } from 'react';
import styles from './Workshops.module.css';
import {Box,Typography} from "@mui/material";
import logo from "../../assets/Logo_H200.png";

interface WorkshopsProps { pagename:string}

const Workshops : FC<WorkshopsProps>=({pagename}) => {
  return (
      <Box sx={{"display":"flex","flexDirection": "row","justify-content":"center" }} >
            <Typography font-size={12}>{pagename}</Typography>
          <img src={logo} className="App-logo" alt="logo"/>
      </Box>
  )
};

export default Workshops;
