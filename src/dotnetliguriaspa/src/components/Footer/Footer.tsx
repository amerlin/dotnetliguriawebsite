import React, { FC } from 'react';
import { Box, Container, Typography } from "@mui/material";

const Footer: FC = () => {
    return (
        <footer style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '1rem 0',
            textAlign: 'center'
        }}>
            <Container maxWidth={false}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                    <Typography variant="body2" sx={{ color: '#ccc' }}>
                        © {new Date().getFullYear()} DotNet Liguria. All rights reserved.
                    </Typography>
                    <span style={{ color: '#666' }}>|</span>
                    <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy Policy</a>
                    <span style={{ color: '#666' }}>|</span>
                    <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.875rem' }}>Terms of Service</a>
                </Box>
            </Container>
        </footer>
    );
};

export default Footer;
