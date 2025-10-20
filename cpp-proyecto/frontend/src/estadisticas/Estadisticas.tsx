import { Box, Typography } from '@mui/material';
import { Title } from 'react-admin';
import { ReportesTotales } from './ReportesTotales';
import { RankingEmergencias } from './RankingEmergencias';
import { TiempoRespuesta } from './TiempoRespuesta';

export const Estadisticas = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Title title="Estadísticas" />
            <Typography variant="h4" gutterBottom>
                Estadísticas y Análisis
            </Typography>
            
            <Box sx={{ display: 'grid', gap: 3, mt: 3 }}>
                <ReportesTotales />
                <RankingEmergencias />
                <TiempoRespuesta />
            </Box>
        </Box>
    );
};
