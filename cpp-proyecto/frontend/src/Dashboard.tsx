import { Card, CardContent, Typography, Box, Chip, Alert, AlertTitle } from '@mui/material';
import { useGetList, useGetIdentity } from 'react-admin';
import { 
    People as PeopleIcon, 
    Report as ReportIcon,
    Schedule as ScheduleIcon,
    AdminPanelSettings as RoleIcon,
    LocalHospital as HospitalIcon,
    Block as BlockIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
}

const StatCard = ({ title, value, icon, color, subtitle }: StatCardProps) => {
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
    const { data: identity } = useGetIdentity();
    
    const rolesPermitidos = [1, 2];
    const tieneAcceso = identity && rolesPermitidos.includes(identity.rol_id);
    
    const { data: usuarios, isLoading: loadingUsuarios } = useGetList('usuarios', {
        pagination: { page: 1, perPage: 1000 }
    }, {
        enabled: tieneAcceso 
    });
    
    const { data: reportesUrbanos, isLoading: loadingReportesUrbanos } = useGetList('reportes_urbanos', {
        pagination: { page: 1, perPage: 1000 }
    }, {
        enabled: tieneAcceso
    });
    
    const { data: reportesPrehospitalarios, isLoading: loadingReportesPrehospitalarios } = useGetList('reportes_prehospitalarios', {
        pagination: { page: 1, perPage: 1000 }
    }, {
        enabled: tieneAcceso
    });
    
    const { data: turnos, isLoading: loadingTurnos } = useGetList('turnos', {
        pagination: { page: 1, perPage: 1000 }
    }, {
        enabled: tieneAcceso
    });
    
    const { data: roles, isLoading: loadingRoles } = useGetList('roles', {
        pagination: { page: 1, perPage: 1000 }
    }, {
        enabled: tieneAcceso
    });

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
                        Acceso Denegado al Dashboard
                    </AlertTitle>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                        No tienes permisos para acceder al tablero de estadísticas.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Solo los <strong>Administradores</strong> y <strong>Jefes de Turno</strong> pueden visualizar esta información.
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

    if (loadingUsuarios || loadingReportesUrbanos || loadingReportesPrehospitalarios || loadingTurnos || loadingRoles) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <Typography>Cargando estadísticas...</Typography>
            </Box>
        );
    }

    const reportesUrbanosPendientes = reportesUrbanos?.filter(r => r.estado === 'pendiente')?.length || 0;
    const reportesUrbanosEnProceso = reportesUrbanos?.filter(r => r.estado === 'en_proceso')?.length || 0;

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

            {}
            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
                gap: 3 
            }}>
                <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Reportes Urbanos
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                    <Typography>Pendientes</Typography>
                                    <Chip label={reportesUrbanosPendientes} color="warning" size="small" />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                    <Typography>En Proceso</Typography>
                                    <Chip label={reportesUrbanosEnProceso} color="info" size="small" />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography>Completados</Typography>
                                    <Chip 
                                        label={(reportesUrbanos?.length || 0) - reportesUrbanosPendientes - reportesUrbanosEnProceso} 
                                        color="success" 
                                        size="small" 
                                    />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Reportes Prehospitalarios
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                <Typography>Total Atenciones</Typography>
                                <Chip label={reportesPrehospitalarios?.length || 0} color="primary" size="small" />
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                <Typography>Prioridad Alta</Typography>
                                <Chip 
                                    label={reportesPrehospitalarios?.filter(r => r.evaluacion_secundaria?.prioridad === 'Rojo')?.length || 0} 
                                    color="error" 
                                    size="small" 
                                />
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography>Con Traslado</Typography>
                                <Chip 
                                    label={reportesPrehospitalarios?.filter(r => r.traslado?.hospital)?.length || 0} 
                                    color="success" 
                                    size="small" 
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Acciones Rápidas
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Chip 
                                label="Ver Estadísticas" 
                                clickable 
                                color="primary" 
                                onClick={() => window.location.href = '#/estadisticas'}
                            />
                            <Chip 
                                label="Crear Reporte Urbano" 
                                clickable 
                                color="secondary" 
                                onClick={() => window.location.href = '#/reportes_urbanos/create'}
                            />
                            <Chip 
                                label="Crear Reporte Prehospitalario" 
                                clickable 
                                color="error" 
                                onClick={() => window.location.href = '#/reportes_prehospitalarios/create'}
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
            </Box>
        </Box>
    );
};
