import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { useGetList } from 'react-admin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ReportesTotales = () => {
    const theme = useTheme();
    
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

    const data = [
        {
            name: 'Reportes',
            Urbanos: urbanos?.length || 0,
            Prehospitalarios: prehospitalarios?.length || 0,
        }
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Total de Reportes por Tipo
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Urbanos" fill={theme.palette.primary.main} />
                        <Bar dataKey="Prehospitalarios" fill={theme.palette.error.main} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
