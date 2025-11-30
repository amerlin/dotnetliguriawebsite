import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Typography,
    Box
} from "@mui/material";
import { WorkshopModel } from '../../models/WorkshopModel';
import styles from './WorkshopItem.module.css';

export interface WorkshopItemProps {
    workshop: WorkshopModel;
}

const WorkshopItem: FC<WorkshopItemProps> = ({ workshop }) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTrackTimeRange = () => {
        if (!workshop.tracks || workshop.tracks.length === 0) return null;

        // Find earliest start time and latest end time
        const startTimes = workshop.tracks.map(track => new Date(track.startTime));
        const endTimes = workshop.tracks.map(track => new Date(track.endTime));

        const earliestStart = new Date(Math.min(...startTimes.map(date => date.getTime())));
        const latestEnd = new Date(Math.max(...endTimes.map(date => date.getTime())));

        return {
            start: earliestStart,
            end: latestEnd
        };
    };

    // Calculate estimated number of lines based on text length
    const calculateDescriptionHeight = (text: string) => {
        if (!text) return '1.5em'; // Minimum one line

        const averageCharsPerLine = 80; // Approximate characters per line
        const estimatedLines = Math.ceil(text.length / averageCharsPerLine);
        const minLines = 1;
        const actualLines = Math.max(minLines, estimatedLines);

        return `${actualLines * 1.5}em`; // 1.5em per line
    };

    return (
        <Card className={styles.workshopItemCard} data-testid="WorkshopItem" sx={{ backgroundColor: 'white', height: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 2, padding: '16px', paddingRight: '24px', alignItems: 'flex-start' }}>
                {/* Left side: Year and Tracks Counter */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {/* Year Box */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '60px',
                        padding: '8px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px'
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                            {new Date(workshop.eventDate).getFullYear()}
                        </Typography>
                    </Box>

                    {/* Tracks Counter Box */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '60px',
                        padding: '8px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                            {workshop.tracks ? workshop.tracks.length : 0}
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 600 }}>
                            {workshop.tracks && workshop.tracks.length === 1 ? 'Track' : 'Tracks'}
                        </Typography>
                    </Box>

                    {/* Track Time Range Box */}
                    {(() => {
                        const timeRange = getTrackTimeRange();
                        return timeRange ? (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '60px',
                                padding: '8px',
                                backgroundColor: '#e3f2fd',
                                borderRadius: '8px'
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>
                                    {formatTime(timeRange.start)}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>
                                    {formatTime(timeRange.end)}
                                </Typography>
                            </Box>
                        ) : null;
                    })()}
                </Box>

                {/* Center: Image */}
                {workshop.image && (
                    <Box className={styles.imageContainer} sx={{ flexShrink: 0 }}>
                        <img
                            src={workshop.image}
                            alt={workshop.title}
                            className={styles.workshopItemImage}
                        />
                    </Box>
                )}

                {/* Right side: Title, Date, Location */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {/* Title and Date row */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Link to={`/workshop/${workshop.workshopId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6" className={styles.workshopItemTitle}>
                                {workshop.title}
                            </Typography>
                        </Link>
                        <Typography variant="h6" className={styles.workshopItemDate}>
                            -  {formatDate(workshop.eventDate)}
                        </Typography>
                    </Box>

                    {workshop.location && (
                        <Typography variant="subtitle2" className={styles.workshopItemLocation}>
                            📍 {workshop.location.name} - {workshop.location.address}
                        </Typography>
                    )}
                    <Typography
                        variant="body2"
                        className={styles.workshopItemDescription}
                        sx={{
                            marginTop: 1,
                            backgroundColor: '#f5f5f5',
                            padding: '8px',
                            borderRadius: '4px'
                        }}
                    >
                        {workshop.description}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default WorkshopItem;
