import React, { FC } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Box,
    IconButton,
    Stack
} from "@mui/material";
import { LinkedIn, GitHub, Facebook } from "@mui/icons-material";
import { BoardProfileModel } from '../../models/BoadProfileModel';
import styles from './BoardBio.module.css';

export interface BoardBioProps {
    profile: BoardProfileModel;
}

const BoardBio: FC<BoardBioProps> = ({ profile }) => {
    return (
        <Card className={styles.boardBioCard} data-testid="BoardBio">
            <CardHeader
                title={
                    <Typography variant="h6" className={styles.boardBioTitle}>
                        {profile.name}
                    </Typography>
                }
                subheader={
                    profile.description && (
                        <Typography variant="subtitle2" className={styles.boardBioDescription}>
                            {profile.description}
                        </Typography>
                    )
                }
            />

            <Box className={styles.imageContainer}>
                <img
                    src={profile.profileImageUrl || profile.imageUrl}
                    alt={profile.name}
                    className={styles.boardBioImage}
                />
            </Box>

            <CardContent className={styles.boardBioContent}>
                <Typography
                    variant="body2"
                    className={styles.boardBioBio}
                >
                    {profile.profileBio}
                </Typography>

                {/* Social Media Links */}
                {(profile.linkedinUrl || profile.githubUrl || profile.facebookUrl) && (
                    <Box className={styles.socialLinksContainer}>
                        <Stack direction="row" spacing={1} justifyContent="center">
                            {profile.linkedinUrl && (
                                <IconButton
                                    component="a"
                                    href={profile.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="small"
                                    className={styles.linkedinIcon}
                                >
                                    <LinkedIn />
                                </IconButton>
                            )}

                            {profile.githubUrl && (
                                <IconButton
                                    component="a"
                                    href={profile.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="small"
                                    className={styles.githubIcon}
                                >
                                    <GitHub />
                                </IconButton>
                            )}

                            {profile.facebookUrl && (
                                <IconButton
                                    component="a"
                                    href={profile.facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="small"
                                    className={styles.facebookIcon}
                                >
                                    <Facebook />
                                </IconButton>
                            )}
                        </Stack>
                    </Box>
                )}

                {/* Email (optional display) */}
                {profile.email && (
                    <Typography
                        variant="caption"
                        className={styles.boardBioEmail}
                    >
                        {profile.email}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default BoardBio;
