import React, { FC, useEffect } from 'react';
import logo from "../../assets/Logo_H200.png";
import { Box, Container, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import { getBoardProfiles } from '../../services/boardProfileService';
import { BoardProfileModel } from '../../models/BoadProfileModel';
import BoardBio from '../BoardBio/BoardBio';

interface AboutUsProps { pageName: string }

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const AboutUs: FC<AboutUsProps> = ({ pageName }) => {

    const [boardProfiles, setBoardProfiles] = React.useState<BoardProfileModel[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        // Fetch board profiles when the component mounts
        const fetchBoardProfiles = async () => {
            try {
                setLoading(true);
                setError(null);
                const profiles = await getBoardProfiles();
                setBoardProfiles(profiles);
            } catch (error) {
                console.error("Failed to fetch board profiles:", error);
                setError("Failed to load board profiles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchBoardProfiles();
    }, []);

    return (
        <>
            <Box display={"flex"} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} pt={3}>
                <img src={logo} className="App-logo" alt="logo" />
            </Box>

            <Container component={"div"} sx={{ "padding-top": 4, "padding-bottom": 30 }}>
                {/* Loading state */}
                {loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress />
                        <Typography variant="h6" sx={{ ml: 2 }}>
                            Loading board profiles...
                        </Typography>
                    </Box>
                )}

                {/* Error state */}
                {error && !loading && (
                    <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                        <Alert severity="error" sx={{ maxWidth: 600 }}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {/* Board profiles grid */}
                {!loading && !error && boardProfiles.length > 0 && (
                    <>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                textAlign: 'center',
                                mb: 4,
                                fontWeight: 'bold',
                                color: 'primary.main'
                            }}
                        >
                            Chi siamo
                        </Typography>

                        <Grid container spacing={3}>
                            {boardProfiles.map((profile) => (
                                <Grid item xs={12} sm={6} md={4} key={profile.id}>
                                    <BoardBio profile={profile} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

                {/* No profiles found */}
                {!loading && !error && boardProfiles.length === 0 && (
                    <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No board profiles found.
                        </Typography>
                    </Box>
                )}
            </Container>
        </>
    )
};

export default AboutUs;
