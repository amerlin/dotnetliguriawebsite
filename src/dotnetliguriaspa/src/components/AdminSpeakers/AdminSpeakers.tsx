import React, { FC, useEffect, useState } from 'react';
import { useOidcFetch } from "@axa-fr/react-oidc";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SpeakerModel from '../../models/SpeakerModel';
import { Typography } from "@mui/material";
interface AdminSpeakersProps { pageName?: string }

const AdminSpeakers: FC<AdminSpeakersProps> = () => {
    const { fetch } = useOidcFetch();
    const [dataRows, setDataRows] = useState<SpeakerModel[]>([]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'profileImage', headerName: 'Profile Image', width: 360 },
    ];

    useEffect(() => {
        const loadWorkshops = async () => {
            await fetch("https://localhost:64561/api/Speaker/Get")
                .then(response => response.json())
                .then(data => {
                    setDataRows(data);
                }
                )
                .catch(error => console.error('Error:', error));
        }
        loadWorkshops().catch(console.error);
    }, []);

    return (
        <>
            <Typography font-size={12}> SPEAKERS
                {/*<div>*/}
                {/*    <DataGrid*/}
                {/*        style={{ height: 373, width: "80%" }}*/}
                {/*        getRowId={(data) => data.name}*/}
                {/*        rows={dataRows}*/}
                {/*        columns={columns}*/}
                {/*        initialState={{*/}
                {/*            pagination: {*/}
                {/*                page: 0, pageSize: 5*/}
                {/*            },*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}
            </Typography>
        </>
    )

};

export default AdminSpeakers;
