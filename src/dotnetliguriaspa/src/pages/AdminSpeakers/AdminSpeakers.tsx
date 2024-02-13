import React, { FC, useEffect, useState } from 'react';
import styles from './AdminSpeakers.module.css';
import { useOidcFetch } from "@axa-fr/react-oidc";
import Speaker from '../../models/Speaker';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface AdminSpeakersProps { pagename?: string }

const AdminSpeakers: FC<AdminSpeakersProps> = () => {
    const { fetch } = useOidcFetch();
    const [dataRows, setDataRows] = useState<Speaker[]>([]);

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
        <div className={styles.AdminSpeakers} data-testid="AdminSpeakers">
            <div className={styles.Title}>Speakers</div>
            <div>
                <DataGrid
                    style={{ height: 373, width: "80%" }}
                    getRowId={(data) => data.name}
                    rows={dataRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            page: 0, pageSize: 5
                        },
                    }}
                />
            </div>
        </div>
    )

};

export default AdminSpeakers;
