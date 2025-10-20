import { Card, CardContent, Typography, Tabs, Tab } from '@mui/material';
import { useGetList } from 'react-admin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export const RankingEmergencias = () => {
    const [tabValue, setTabValue] = useState(0);
    
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

    // Ranking de emergencias urbanas por tipo de servicio
    const urbanosCount: Record<string, number> = {};
    urbanos?.forEach((reporte: any) => {
        const tipo = reporte.personal_y_activacion?.tipo_servicio || 'Sin especificar';
        urbanosCount[tipo] = (urbanosCount[tipo] || 0) + 1;
    });

    const urbanosData = Object.entries(urbanosCount)
        .map(([name, value]) => ({ name, total: value }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

    // Ranking de emergencias prehospitalarias por tipo de emergencia
    const prehospitalariosCount: Record<string, number> = {};
    prehospitalarios?.forEach((reporte: any) => {
        const tipo = reporte.servicio?.motivo || 'Sin especificar';
        prehospitalariosCount[tipo] = (prehospitalariosCount[tipo] || 0) + 1;
    });

    const prehospitalariosData = Object.entries(prehospitalariosCount)
        .map(([name, value]) => ({ name, total: value }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Ranking de Emergencias Más Comunes
                </Typography>
                
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                    <Tab label="Urbanas" />
                    <Tab label="Prehospitalarias" />
                </Tabs>

                {tabValue === 0 && (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={urbanosData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Bar dataKey="total" fill="#1976d2" />
                        </BarChart>
                    </ResponsiveContainer>
                )}

                {tabValue === 1 && (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={prehospitalariosData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Bar dataKey="total" fill="#d32f2f" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
};
