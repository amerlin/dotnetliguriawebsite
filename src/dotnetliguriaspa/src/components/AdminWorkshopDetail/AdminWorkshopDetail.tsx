import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

interface AdminWorkshopDetailProps {
	pageName?: string;
}

const AdminWorkshopDetail: FC<AdminWorkshopDetailProps> = () => {
	const { id } = useParams<{ id: string }>();
	const [title, setTitle] = useState<string>('');

	// Per ora lasciamo vuoto, ma puoi caricare i dettagli dall'API
	useEffect(() => {
		// TODO: Caricare i dettagli del workshop dall'API usando l'id
		setTitle('Loading...');
	}, [id]);

	return (
		<Box sx={{ width: '100%', p: 3 }}>
			<Typography variant="h4" sx={{ mb: 3 }}>
				Workshop Detail - {title}
			</Typography>
		</Box>
	);
};

export default AdminWorkshopDetail;
