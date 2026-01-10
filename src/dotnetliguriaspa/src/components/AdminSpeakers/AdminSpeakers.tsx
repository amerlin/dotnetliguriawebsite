import React, { FC, useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/apiConfig';
import { useOidcFetch } from "@axa-fr/react-oidc";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SpeakerModel from '../../models/SpeakerModel';
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
interface AdminSpeakersProps { pageName?: string }

const AdminSpeakers: FC<AdminSpeakersProps> = () => {
    const { fetch } = useOidcFetch();
    const navigate = useNavigate();
    const [dataRows, setDataRows] = useState<SpeakerModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleViewDetails = (speakerId: string) => {
        navigate(`/admin/speakers/${speakerId}`);
    };

    const handleAddSpeaker = () => {
        navigate('/admin/speakers/new');
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 250, flex: 1 },
        { field: 'description', headerName: 'Description', width: 300, flex: 1 },
        { field: 'email', headerName: 'Email', width: 250, flex: 1 },
        {
            field: 'isActive',
            headerName: 'Active',
            width: 100,
            renderCell: (params) => (
                <Box
                    sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: params.row.isActive ? '#4caf50' : '#f44336',
                    }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <IconButton
                    color="primary"
                    onClick={() => handleViewDetails(params.row.workshopSpeakerId)}
                >
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    useEffect(() => {
        const loadSpeakers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/Speaker/Get`);
                const data = await response.json();
                setDataRows(data);
            } catch (error) {
                console.error('Error loading speakers:', error);
            } finally {
                setLoading(false);
            }
        }
        loadSpeakers();
    }, [fetch]);

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">
                    Speakers
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon sx={{ color: '#ffffff' }} />}
                    onClick={handleAddSpeaker}
                    sx={{
                        backgroundColor: '#72C02C',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#5da024'
                        }
                    }}
                >
                    Add
                </Button>
            </Box>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.workshopSpeakerId}
                    rows={dataRows}
                    columns={columns}
                    loading={loading}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    )

};

export default AdminSpeakers;

