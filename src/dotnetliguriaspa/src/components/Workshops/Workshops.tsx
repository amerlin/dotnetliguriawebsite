import React, { FC, useEffect } from 'react';
import { Alert, Box, CircularProgress, Container, Stack, Typography, Chip } from "@mui/material";
import logo from "../../assets/Logo_H200.png";
import { getWorkshops, getWorkshopsByYear } from '../../services/workShopService';
import { WorkshopModel } from '../../models/WorkshopModel';
import WorkshopItem from '../WorkshopItem/WorkshopItem';

interface WorkshopsProps { pageName: string }

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const Workshops: FC<WorkshopsProps> = ({ pageName }) => {

  const [workshops, setWorkShops] = React.useState<WorkshopModel[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [availableYears, setAvailableYears] = React.useState<number[]>([]);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);

  // Extract unique years from workshops
  const extractYears = (workshopsData: WorkshopModel[]): number[] => {
    const years = workshopsData.map(workshop => new Date(workshop.eventDate).getFullYear());
    return Array.from(new Set(years)).sort((a, b) => b - a); // Sort descending (newest first)
  };

  const fetchAllWorkshops = async () => {
    try {
      setLoading(true);
      setError(null);
      const workshopsData = await getWorkshops();
      setWorkShops(workshopsData);
      const years = extractYears(workshopsData);
      setAvailableYears(years);
    } catch (error) {
      console.error("Failed to fetch workshops:", error);
      setError("Failed to load workshops. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkshopsByYear = async (year: number) => {
    try {
      setLoading(true);
      setError(null);
      const workshopsData = await getWorkshopsByYear(year);
      setWorkShops(workshopsData);
    } catch (error) {
      console.error("Failed to fetch workshops by year:", error);
      setError("Failed to load workshops for the selected year. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleYearFilter = (year: number | null) => {
    setSelectedYear(year);
    if (year === null) {
      fetchAllWorkshops();
    } else {
      fetchWorkshopsByYear(year);
    }
  };

  useEffect(() => {
    fetchAllWorkshops();
  }, []);


  return (
    <>
      <Box display={"flex"} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} pt={3}>
        <img src={logo} className="App-logo" alt="logo" />
      </Box>

      <Container component={"div"} sx={{ "padding-top": 4, "padding-bottom": 30 }}>
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
            </Typography>

            {/* Year Filter Bar */}
            {availableYears.length > 1 && (
              <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label="Tutti gli anni"
                  onClick={() => handleYearFilter(null)}
                  color={selectedYear === null ? 'primary' : 'default'}
                  variant={selectedYear === null ? 'filled' : 'outlined'}
                  sx={{ mb: 1 }}
                />
                {availableYears.map((year) => (
                  <Chip
                    key={year}
                    label={year.toString()}
                    onClick={() => handleYearFilter(year)}
                    color={selectedYear === year ? 'primary' : 'default'}
                    variant={selectedYear === year ? 'filled' : 'outlined'}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            )}

            <Stack spacing={3}>
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
