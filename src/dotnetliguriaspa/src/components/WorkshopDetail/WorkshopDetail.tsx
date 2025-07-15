import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
   Container,
   Typography,
   Box,
   CircularProgress,
   Alert,
   Button,
   Card,
   CardContent,
   CardMedia,
   Chip,
   Stack
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { WorkshopModel } from '../../models/WorkshopModel';
import { getWorkshopById } from '../../services/workShopService';
import styles from './WorkshopDetail.module.css';

export interface WorkshopDetailProps {
   pageName?: string;
}

const WorkshopDetail: FC<WorkshopDetailProps> = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const [workshop, setWorkshop] = useState<WorkshopModel | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('it-IT', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         weekday: 'long'
      });
   };

   useEffect(() => {
      const fetchWorkshop = async () => {
         if (!id) {
            setError('No workshop ID provided');
            setLoading(false);
            return;
         }

         try {
            setLoading(true);
            setError(null);
            const workshopData = await getWorkshopById(id);
            setWorkshop(workshopData);
         } catch (err) {
            console.error('Error fetching workshop:', err);
            setError(err instanceof Error ? err.message : 'Failed to load workshop');
         } finally {
            setLoading(false);
         }
      };

      fetchWorkshop();
   }, [id]);

   const handleBackClick = () => {
      navigate('/workshops');
   };

   if (loading) {
      return (
         <Container maxWidth="lg" className={styles.container}>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
               <CircularProgress size={60} />
            </Box>
         </Container>
      );
   }

   if (error) {
      return (
         <Container maxWidth="lg" className={styles.container}>
            <Box sx={{ mb: 3 }}>
               <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBackClick}
                  variant="outlined"
                  sx={{ mb: 2 }}
               >
                  Back to Workshops
               </Button>
            </Box>
            <Alert severity="error" sx={{ mb: 3 }}>
               {error}
            </Alert>
         </Container>
      );
   }

   if (!workshop) {
      return (
         <Container maxWidth="lg" className={styles.container}>
            <Alert severity="warning">
               Workshop not found
            </Alert>
         </Container>
      );
   }

   return (
      <Container maxWidth="lg" className={styles.container}>
         <Box sx={{ mb: 3 }}>
            <Button
               startIcon={<ArrowBackIcon />}
               onClick={handleBackClick}
               variant="outlined"
               sx={{ mb: 2 }}
            >
               Back to Workshops
            </Button>
         </Box>

         <Card className={styles.workshopCard}>
            {workshop.image && (
               <CardMedia
                  component="img"
                  image={workshop.image}
                  alt={workshop.title}
                  className={styles.workshopImage}
                  sx={{
                     height: 400,
                     objectFit: 'cover',
                     borderRadius: '8px 8px 0 0'
                  }}
               />
            )}

            <CardContent className={styles.cardContent}>
               {/* Header Section */}
               <Box sx={{ mb: 4 }}>
                  <Typography variant="h3" component="h1" className={styles.workshopTitle} sx={{ mb: 2 }}>
                     {workshop.title}
                  </Typography>

                  <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 3 }}>
                     <Chip
                        icon={<CalendarTodayIcon />}
                        label={formatDate(workshop.eventDate)}
                        variant="outlined"
                        size="medium"
                     />

                     {workshop.location && (
                        <Chip
                           icon={<LocationOnIcon />}
                           label={`${workshop.location.name} - ${workshop.location.address}`}
                           variant="outlined"
                           size="medium"
                        />
                     )}

                     {workshop.tracks && workshop.tracks.length > 0 && (
                        <Chip
                           label={`${workshop.tracks.length} ${workshop.tracks.length === 1 ? 'Track' : 'Tracks'}`}
                           color="primary"
                           size="medium"
                        />
                     )}
                  </Stack>
               </Box>

               {/* Description Section */}
               <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                     Workshop Description
                  </Typography>
                  <Typography
                     variant="body1"
                     className={styles.workshopDescription}
                     sx={{
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        color: 'text.secondary'
                     }}
                  >
                     {workshop.description}
                  </Typography>
               </Box>

               {/* Blog Content Section */}
               {workshop.blogHtml && (
                  <Box sx={{ mb: 4 }}>
                     <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Workshop Details
                     </Typography>
                     <Box
                        className={styles.blogContent}
                        dangerouslySetInnerHTML={{ __html: workshop.blogHtml }}
                        sx={{
                           '& p': { mb: 2, lineHeight: 1.8 },
                           '& h1, & h2, & h3, & h4, & h5, & h6': { mt: 3, mb: 2 },
                           '& ul, & ol': { pl: 3, mb: 2 },
                           '& li': { mb: 1 }
                        }}
                     />
                  </Box>
               )}

               {/* Tracks Section */}
               {workshop.tracks && workshop.tracks.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                     <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Workshop Tracks
                     </Typography>
                     <Stack spacing={2}>
                        {workshop.tracks.map((track, index) => (
                           <Box key={index} className={styles.trackItem}>
                              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                 Track {index + 1}: {track.title || `Track ${index + 1}`}
                              </Typography>
                              {track.speakersName && (
                                 <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium', color: '#1976d2' }}>
                                    Speaker: {track.speakersName}
                                 </Typography>
                              )}
                              {track.abstract && (
                                 <Typography variant="body2" color="text.secondary">
                                    {track.abstract}
                                 </Typography>
                              )}
                           </Box>
                        ))}
                     </Stack>
                  </Box>
               )}

               {/* Tags Section */}
               {workshop.tags && (
                  <Box sx={{ mb: 4 }}>
                     <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                        Tags
                     </Typography>
                     <Stack direction="row" spacing={1} flexWrap="wrap">
                        {workshop.tags.split(',').map((tag, index) => (
                           <Chip
                              key={index}
                              label={tag.trim()}
                              size="small"
                              variant="outlined"
                           />
                        ))}
                     </Stack>
                  </Box>
               )}

               {/* Registration Section */}
               {workshop.externalRegistration && workshop.externalRegistrationLink && (
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                     <Button
                        variant="contained"
                        size="large"
                        href={workshop.externalRegistrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ px: 4, py: 2 }}
                     >
                        Register for Workshop
                     </Button>
                  </Box>
               )}
            </CardContent>
         </Card>
      </Container>
   );
};

export default WorkshopDetail;
