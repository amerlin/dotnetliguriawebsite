import React, { FC, useEffect, useState } from 'react';
import { useOidcFetch } from "@axa-fr/react-oidc";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SpeakerModel from '../../models/SpeakerModel';
import { Avatar, Box, Typography } from "@mui/material";
interface AdminSpeakersProps { pageName?: string }

const AdminSpeakers: FC<AdminSpeakersProps> = () => {
    const { fetch } = useOidcFetch();
    const [dataRows, setDataRows] = useState<SpeakerModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const columns: GridColDef[] = [
        {
            field: 'profileImage',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => (
                <Avatar
                    src={params.value as string}
                    alt={params.row.name}
                    sx={{ width: 50, height: 50 }}
                />
            ),
            sortable: false,
        },
        { field: 'name', headerName: 'Name', width: 250, flex: 1 },
        { field: 'userName', headerName: 'Username', width: 200, flex: 1 },
    ];

    useEffect(() => {
        const loadSpeakers = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://localhost:64561/api/Speaker/Get");
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
            <Typography variant="h4" sx={{ mb: 3 }}>
                Speakers
            </Typography>
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
