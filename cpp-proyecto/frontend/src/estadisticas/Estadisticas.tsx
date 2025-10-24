import { Box, Typography, Alert, AlertTitle } from '@mui/material';
import { Title, useGetIdentity } from 'react-admin';
import { Block as BlockIcon } from '@mui/icons-material';
import { ReportesTotales } from './ReportesTotales';
import { RankingEmergencias } from './RankingEmergencias';
import { TiempoRespuesta } from './TiempoRespuesta';

export const Estadisticas = () => {
    const { data: identity } = useGetIdentity();
    
    const rolesPermitidos = [1, 2];
    const tieneAcceso = identity && rolesPermitidos.includes(identity.rol_id);

    if (!identity) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <Typography>Cargando...</Typography>
            </Box>
        );
    }

    if (!tieneAcceso) {
        return (
            <Box sx={{ p: 3 }}>
                <Title title="Acceso Denegado" />
                <Alert 
                    severity="error" 
                    icon={<BlockIcon fontSize="large" />}
                    sx={{ 
                        maxWidth: 600, 
                        mx: 'auto', 
                        mt: 8,
                        '& .MuiAlert-message': {
                            width: '100%'
                        }
                    }}
                >
                    <AlertTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Acceso Denegado a Estadísticas
                    </AlertTitle>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                        No tienes permisos para acceder a esta sección.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Solo los <strong>Administradores</strong> y <strong>Jefes de Turno</strong> pueden visualizar las estadísticas del sistema.
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2">
                            Puedes acceder a:
                        </Typography>
                        <Box component="ul" sx={{ mt: 1 }}>
                            <li>Crear y editar reportes</li>
                            <li>Ver tus reportes asignados</li>
                            <li>Actualizar tu perfil</li>
                        </Box>
                    </Box>
                </Alert>
            </Box>
        );
    }

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
