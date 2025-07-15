import React, { FC } from 'react';
import {Box,Container,styled,Typography} from "@mui/material";

const Footer: FC = () => {
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    const BoxFooter=styled(Box)(({theme}) => ({
        backgroundColor: "#648B2D",
        padding:2,
        position:'fixed',
        bottom:0,
        left:0,
        right:0,
        color: 'white'
    }));

    return(
        <BoxFooter component="footer">
            <Container>
                <Typography align="center" fontWeight={100} fontSize={12}>
                    {"Copyright © "}
                    DotNet Liguria -
                    {new Date().getFullYear()}
                </Typography>
            </Container>
        </BoxFooter>
)};

export default Footer;
