import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, IconButton, Button, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

export interface FeedbackProps {
	workshopId: string;
}

interface WorkshopTrack {
	workshopTrackId: string;
	title: string;
	speakers: string;
}

interface WorkshopFeedback {
	id: string;
	title: string;
	location: string;
	date: string;
	summary: string;
	tracks: WorkshopTrack[];
}

const Feedback: FC<FeedbackProps> = () => {
	const { workshopId } = useParams<{ workshopId: string }>();
	const [workshop, setWorkshop] = useState<WorkshopFeedback | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [ratings, setRatings] = useState<{ [key: number]: number }>({});
	const [notes, setNotes] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		const loadWorkshop = async () => {
			if (!workshopId) {
				setError('Workshop ID non valido');
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const response = await fetch(`${API_BASE_URL}/workshop/GetFeedBack/${workshopId}`);

				if (!response.ok) {
					const contentType = response.headers.get('content-type');
					if (contentType && contentType.includes('text/html')) {
						throw new Error(`Endpoint non trovato: ${API_BASE_URL}/workshop/GetFeedBack/${workshopId}`);
					}
					throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
				}

				const contentType = response.headers.get('content-type');
				if (!contentType || !contentType.includes('application/json')) {
					throw new Error('La risposta del server non è in formato JSON');
				}

				const data = await response.json();
				console.log('Dati ricevuti dall\'API GetFeedBack:', JSON.stringify(data, null, 2));
				setWorkshop(data);
			} catch (err) {
				console.error('Error loading workshop feedback:', err);
				setError(err instanceof Error ? err.message : 'Errore nel caricamento dei dati');
			} finally {
				setLoading(false);
			}
		};

		loadWorkshop();
	}, [workshopId]);

	const handleRating = (trackIndex: number, rating: number) => {
		setRatings(prev => ({ ...prev, [trackIndex]: rating }));
	};

	const allRatingsProvided = () => {
		if (!workshop) return false;
		return workshop.tracks.every((_, index) => ratings[index] !== undefined && ratings[index] > 0);
	};

	const handleSubmit = async () => {
		if (!allRatingsProvided() || !workshopId) return;

		try {
			console.log('Tracks disponibili:', workshop!.tracks);

			const feedbackData = {
				workshopId: workshopId,
				trackFeedbacks: workshop!.tracks.map((track, index) => {
					console.log(`Track ${index}:`, track);
					return {
						workshopTrackId: track.workshopTrackId,
						rating: ratings[index]
					};
				}),
				notes: notes
			};

			console.log('Dati inviati:', JSON.stringify(feedbackData, null, 2));

			const response = await fetch(`${API_BASE_URL}/Workshop/SubmitFeedback`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(feedbackData)
			});

			if (!response.ok) {
				throw new Error(`Errore HTTP: ${response.status}`);
			}

			setSuccess(true);
			setRatings({});
			setNotes('');
		} catch (err) {
			console.error('Errore invio feedback:', err);
			setError(err instanceof Error ? err.message : 'Errore nell\'invio del feedback');
		}
	};

	return (
		<Box sx={{ padding: 3, marginTop: '80px', minHeight: 'calc(100vh - 200px)' }}>
			<Typography variant="h4" component="h2" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginBottom: 3 }}>
				Feedback{workshop ? ` - ${workshop.title}` : ''}
			</Typography>

			{loading && (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
					<CircularProgress />
				</Box>
			)}

			{error && (
				<Alert severity="error" sx={{ marginBottom: 2 }}>
					{error}
				</Alert>
			)}

			{success && (
				<Alert severity="success" sx={{ marginBottom: 2 }}>
					Feedback inviato con successo! Grazie per la tua valutazione.
				</Alert>
			)}

			{!loading && !error && workshop && (
				<Box>
					<Typography variant="h5" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginBottom: 2 }}>
						{workshop.location}
					</Typography>
					<Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", marginBottom: 1 }}>
						<strong>Data:</strong> {workshop.date}
					</Typography>
					<Typography variant="body1" sx={{ fontFamily: "'Titillium Web', sans-serif", marginBottom: 3 }}>
						{workshop.summary}
					</Typography>

					{/* Track generale (Tutti) */}
					{workshop.tracks.filter(track => track.speakers === 'Tutti').map((track, index) => {
						const originalIndex = workshop.tracks.findIndex(t => t === track);
						return (
							<Box key={index} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
								<Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600 }}>
									{track.title}
								</Typography>
								<Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1 }}>
									Speaker: {track.speakers}
								</Typography>
								<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
									<Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", marginRight: 1 }}>
										Valutazione:
									</Typography>
									{[1, 2, 3, 4, 5].map((star) => (
										<IconButton
											key={star}
											size="small"
											onClick={() => handleRating(originalIndex, star)}
											sx={{ padding: 0.5 }}
										>
											{ratings[originalIndex] >= star ? (
												<StarIcon sx={{ fontSize: 24, color: '#FFD700' }} />
											) : (
												<StarBorderIcon sx={{ fontSize: 24, color: '#FFD700' }} />
											)}
										</IconButton>
									))}
								</Box>
							</Box>
						);
					})}

					<Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginBottom: 2, marginTop: 3 }}>
						Tracks:
					</Typography>
					{workshop.tracks.filter(track => track.speakers !== 'Tutti').map((track, index) => {
						const originalIndex = workshop.tracks.findIndex(t => t === track);
						return (
							<Box key={index} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
								<Typography variant="subtitle1" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600 }}>
									{track.title}
								</Typography>
								<Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", color: '#666', marginBottom: 1 }}>
									Speaker: {track.speakers}
								</Typography>
								<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
									<Typography variant="body2" sx={{ fontFamily: "'Titillium Web', sans-serif", marginRight: 1 }}>
										Valutazione:
									</Typography>
									{[1, 2, 3, 4, 5].map((star) => (
										<IconButton
											key={star}
											size="small"
											onClick={() => handleRating(originalIndex, star)}
											sx={{ padding: 0.5 }}
										>
											{ratings[originalIndex] >= star ? (
												<StarIcon sx={{ fontSize: 24, color: '#FFD700' }} />
											) : (
												<StarBorderIcon sx={{ fontSize: 24, color: '#FFD700' }} />
											)}
										</IconButton>
									))}
								</Box>
							</Box>
						);
					})}

					<Box sx={{ marginTop: 4 }}>
						<Typography variant="h6" sx={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, marginBottom: 2 }}>
							Note:
						</Typography>
						<TextField
							fullWidth
							multiline
							rows={4}
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							placeholder="Inserisci eventuali note o commenti..."
							variant="outlined"
							sx={{
								fontFamily: "'Titillium Web', sans-serif",
								'& .MuiInputBase-root': {
									fontFamily: "'Titillium Web', sans-serif"
								}
							}}
						/>
					</Box>

					<Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
							disabled={!allRatingsProvided()}
							sx={{
								fontFamily: "'Titillium Web', sans-serif",
								fontWeight: 600,
								padding: '12px 48px',
								fontSize: '16px'
							}}
						>
							Invia Feedback
						</Button>
					</Box>
				</Box>
			)}
		</Box>
	);
};
export default Feedback;
