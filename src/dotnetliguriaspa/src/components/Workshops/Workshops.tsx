import React, { FC } from 'react';
import {Box} from "@mui/material";
import logo from "../../assets/Logo_H200.png";

interface WorkshopsProps { pageName:string}

const Workshops : FC<WorkshopsProps>=({pageName}) => {
  return (
      <Box display={"flex"} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} pt={3}>
          <img src={logo} className="App-logo" alt="logo" />
      </Box>
  )
};

export default Workshops;
