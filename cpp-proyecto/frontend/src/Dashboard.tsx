import { Card, CardContent, Grid, Typography, Box, Chip } from '@mui/material';
import { Title, useGetList } from 'react-admin';
import { 
    TrendingUp as TrendingUpIcon, 
    People as PeopleIcon, 
    Report as ReportIcon,
    Schedule as ScheduleIcon,
    AdminPanelSettings as RoleIcon 
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const StatCard = ({ title, value, icon, color, subtitle }) => {
    const theme = useTheme();
    
    return (
        <Card sx={{ 
            height: '100%', 
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            border: `1px solid ${color}30`,
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
            }
        }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant="h4" fontWeight="bold" color={color}>
                            {value}
                        </Typography>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Chip 
                                label={subtitle} 
                                size="small" 
                                sx={{ 
                                    backgroundColor: `${color}20`,
                                    color: color,
                                    fontWeight: 500
                                }} 
                            />
                        )}
                    </Box>
                    <Box sx={{ color: color, opacity: 0.8 }}>
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export const Dashboard = () => {
    const theme = useTheme();
    
    const { data: usuarios, isLoading: loadingUsuarios } = useGetList('usuarios', {
        pagination: { page: 1, perPage: 1000 }
    });
    
    const { data: reportes, isLoading: loadingReportes } = useGetList('reportes_urbanos', {
        pagination: { page: 1, perPage: 1000 }
    });
    
    const { data: turnos, isLoading: loadingTurnos } = useGetList('turnos', {
        pagination: { page: 1, perPage: 1000 }
    });
    
    const { data: roles, isLoading: loadingRoles } = useGetList('roles', {
        pagination: { page: 1, perPage: 1000 }
    });

    if (loadingUsuarios || loadingReportes || loadingTurnos || loadingRoles) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <Typography>Cargando estadísticas...</Typography>
            </Box>
        );
    }

    const reportesPendientes = reportes?.filter(r => r.estado === 'pendiente')?.length || 0;
    const reportesEnProceso = reportes?.filter(r => r.estado === 'en_proceso')?.length || 0;

    return (
        <Box sx={{ p: 3, xs: { 12: 3 }, sm: { 6: 3 }, md: { 3: 3 } }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
                Dashboard - Sistema de Gestión
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
                    <StatCard
                        title="Usuarios Registrados"
                        value={usuarios?.length || 0}
                        icon={<PeopleIcon sx={{ fontSize: 40 }} />}
                        color={theme.palette.primary.main}
                        subtitle="Total activos"
                    />
                    <StatCard
                        title="Reportes Urbanos"
                        value={reportes?.length || 0}
                        icon={<ReportIcon sx={{ fontSize: 40 }} />}
                        color={theme.palette.secondary.main}
                        subtitle={`${reportesPendientes} pendientes`}
                    />
                    <StatCard
                        title="Turnos Disponibles"
                        value={turnos?.length || 0}
                        icon={<ScheduleIcon sx={{ fontSize: 40 }} />}
                        color={theme.palette.success.main}
                        subtitle="Gestión de horarios"
                    />
                    <StatCard
                        title="Roles del Sistema"
                        value={roles?.length || 0}
                        icon={<RoleIcon sx={{ fontSize: 40 }} />}
                        color={theme.palette.warning.main}
                        subtitle="Permisos activos"
                    />
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Estado de Reportes
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                    <Typography>Pendientes</Typography>
                                    <Chip label={reportesPendientes} color="warning" size="small" />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                    <Typography>En Proceso</Typography>
                                    <Chip label={reportesEnProceso} color="info" size="small" />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography>Completados</Typography>
                                    <Chip 
                                        label={(reportes?.length || 0) - reportesPendientes - reportesEnProceso} 
                                        color="success" 
                                        size="small" 
                                    />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Acciones Rápidas
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Chip 
                                    label="Ver Mapa de Reportes" 
                                    clickable 
                                    color="primary" 
                                    onClick={() => window.location.href = '#/mapa'}
                                />
                                <Chip 
                                    label="Crear Nuevo Reporte" 
                                    clickable 
                                    color="secondary" 
                                    onClick={() => window.location.href = '#/reportes_urbanos/create'}
                                />
                                <Chip 
                                    label="Gestionar Usuarios" 
                                    clickable 
                                    variant="outlined" 
                                    onClick={() => window.location.href = '#/usuarios'}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};