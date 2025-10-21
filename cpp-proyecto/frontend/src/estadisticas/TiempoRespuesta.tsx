import { Card, CardContent, Typography, Box } from '@mui/material';
import { useGetList } from 'react-admin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Función para calcular tiempo en minutos entre dos fechas ISO
const calcularMinutos = (fechaInicio: string, fechaFin: string): number | null => {
    if (!fechaInicio || !fechaFin) return null;
    
    try {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        
        // Validar que las fechas sean válidas
        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) return null;
        
        // Calcular diferencia en milisegundos y convertir a minutos
        const diferenciaMs = fin.getTime() - inicio.getTime();
        const diferenciaMinutos = Math.round(diferenciaMs / (1000 * 60));
        
        // Retornar solo si es positivo y razonable (menos de 24 horas = 1440 min)
        return diferenciaMinutos > 0 && diferenciaMinutos < 1440 ? diferenciaMinutos : null;
    } catch {
        return null;
    }
};

export const TiempoRespuesta = () => {
    const { data: urbanos, isLoading: loadingUrbanos } = useGetList('reportes_urbanos', {
        pagination: { page: 1, perPage: 1000 },
    });
    
    const { data: prehospitalarios, isLoading: loadingPrehospitalarios } = useGetList('reportes_prehospitalarios', {
        pagination: { page: 1, perPage: 1000 },
    });

    if (loadingUrbanos || loadingPrehospitalarios) {
        return (
            <Card>
                <CardContent>
                    <Typography>Cargando...</Typography>
                </CardContent>
            </Card>
        );
    }

    // Calcular tiempo promedio de respuesta para urbanos (usando tiempo_traslado_minutos)
    const tiemposUrbanos = urbanos
        ?.map((reporte: any) => ({
            tiempo: reporte.atencion_emergencia?.tiempo_traslado_minutos,
            tipo: reporte.personal_y_activacion?.tipo_servicio || 'Sin especificar'
        }))
        .filter((item: any) => item.tiempo != null && item.tiempo > 0) || [];

    // Calcular tiempo promedio de respuesta para prehospitalarios
    // (desde hora_llamada hasta hora_llegada)
    const tiemposPrehospitalarios = prehospitalarios
        ?.map((reporte: any) => {
            const tiempo = calcularMinutos(
                reporte.servicio?.cronometro?.hora_llamada,
                reporte.servicio?.cronometro?.hora_llegada
            );
            return {
                tiempo,
                tipo: reporte.servicio?.motivo || 'Sin especificar'
            };
        })
        .filter((item: any) => item.tiempo != null && item.tiempo > 0) || [];

    // Promedio general
    const promedioUrbanos = tiemposUrbanos.length > 0
        ? (tiemposUrbanos.reduce((acc: number, item: any) => acc + item.tiempo, 0) / tiemposUrbanos.length).toFixed(1)
        : 0;

    const promedioPrehospitalarios = tiemposPrehospitalarios.length > 0
        ? (tiemposPrehospitalarios.reduce((acc: number, item: any) => acc + item.tiempo, 0) / tiemposPrehospitalarios.length).toFixed(1)
        : 0;

    // Agrupar por tipo de emergencia (top 8)
    const tiemposPorTipo: Record<string, number[]> = {};
    
    // Urbanos
    tiemposUrbanos.forEach((item: any) => {
        const key = `U: ${item.tipo}`;
        if (!tiemposPorTipo[key]) tiemposPorTipo[key] = [];
        tiemposPorTipo[key].push(item.tiempo);
    });
    
    // Prehospitalarios
    tiemposPrehospitalarios.forEach((item: any) => {
        const key = `P: ${item.tipo}`;
        if (!tiemposPorTipo[key]) tiemposPorTipo[key] = [];
        tiemposPorTipo[key].push(item.tiempo);
    });

    const dataComparativa = Object.entries(tiemposPorTipo)
        .map(([tipo, tiempos]) => ({
            tipo: tipo.length > 25 ? tipo.substring(0, 25) + '...' : tipo,
            promedio: parseFloat((tiempos.reduce((a, b) => a + b, 0) / tiempos.length).toFixed(1))
        }))
        .sort((a, b) => b.promedio - a.promedio)
        .slice(0, 8);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Tiempo Promedio de Respuesta
                </Typography>

                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 3,
                    mb: 3 
                }}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                        <Typography variant="h3" color="primary.contrastText">
                            {promedioUrbanos} min
                        </Typography>
                        <Typography variant="body2" color="primary.contrastText">
                            Promedio Urbanos
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
                        <Typography variant="h3" color="error.contrastText">
                            {promedioPrehospitalarios} min
                        </Typography>
                        <Typography variant="body2" color="error.contrastText">
                            Promedio Prehospitalarios
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                    Tiempo de Respuesta por Tipo (Top 8)
                </Typography>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                    U: Urbano | P: Prehospitalario
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={dataComparativa} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" label={{ value: 'Minutos', position: 'bottom' }} />
                        <YAxis dataKey="tipo" type="category" width={180} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="promedio" fill="#1976d2" name="Tiempo promedio (min)" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
