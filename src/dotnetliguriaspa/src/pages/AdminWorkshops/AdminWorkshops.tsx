import React, { FC, useEffect, useState } from 'react';
import styles from './AdminWorkshops.module.css';
import { useOidcFetch } from '@axa-fr/react-oidc';
import { Workshop } from '../../models/Workshop';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminWorkshopsProps { }

const AdminWorkshops: FC<AdminWorkshopsProps> = () => {

    const { fetch } = useOidcFetch();
    const [dataRows, setDataRows] = useState<Workshop[]>([]);

    const columns: GridColDef[] = [
        { field: 'workshopId', headerName: 'Id', resizable: true },
        { field: 'title', headerName: 'Title', width: 200, resizable: true },
        { field: 'eventDate', headerName: 'Event Date', width: 200, resizable: true },
        { field: 'published', headerName: 'Published', width: 130, resizable: true},
    ];

    useEffect(() => {
        const loadWorkshops = async () => {
            await fetch("https://localhost:64561/api/Workshop/Get")
                .then(response => response.json())
                .then(data => {
                    setDataRows(data);
                }).catch(error => console.error('Error:', error));
        }
        loadWorkshops().catch(console.error);
    }, []);

    return (
        <div className={styles.AdminWorkshops}>
            <div className={styles.Title}>Workshops Page</div>
            <div>
                <DataGrid
                    style={{height: 365, width: "80%"}}     
                    getRowId={(data) => data.workshopId}
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

export default AdminWorkshops;
