import React, { FC, useEffect } from 'react';
import { Alert, Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import logo from "../../assets/Logo_H200.png";
import { getWorkshops } from '../../services/workShopService';
import { WorkshopModel } from '../../models/WorkshopModel';
import WorkshopItem from '../WorkshopItem/WorkshopItem';

interface WorkshopsProps { pageName: string }

const Workshops: FC<WorkshopsProps> = ({ pageName }) => {

  const [workshops, setWorkShops] = React.useState<WorkshopModel[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    // Fetch workshops when the component mounts
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        setError(null);
        const workshopsData = await getWorkshops();
        setWorkShops(workshopsData);
      } catch (error) {
        console.error("Failed to fetch workshops:", error);
        setError("Failed to load workshops. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
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
              Loading workshops ...
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

        {!loading && !error && workshops.length > 0 && (
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
              I nostri Workshops
            </Typography>            <Stack spacing={3}>
              {workshops.map((workshop) => (
                <WorkshopItem key={workshop.workshopId} workshop={workshop} />
              ))}
            </Stack>
          </>
        )}

        {/* No workshops found */}
        {!loading && !error && workshops.length === 0 && (
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Nessun workshop trovato.
            </Typography>
          </Box>
        )}

      </Container>
    </>
  )
};

export default Workshops;
