import React from 'react';
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
    Select, 
    MenuItem, 
    FormControl, 
    Typography, 
    Box,
    Paper
} from '@mui/material';
import { useInput } from 'react-admin';

interface ApgarEvaluation {
    tiempo: string;
    color?: number;
    fc?: number;
    irritabilidad?: number;
    tono?: number;
    respiracion?: number;
    puntaje_total?: number;
}

const tiemposEvaluacion = ['1min', '5min', '10min', '15min', '20min'];

export const TablaApgar: React.FC = () => {
    const { field } = useInput({ source: 'parto.evaluaciones_apgar' });

    const evaluaciones: ApgarEvaluation[] = field.value || [];

    const handleValueChange = (tiempoIndex: number, signo: string, value: string | number) => {
        const nuevasEvaluaciones = [...evaluaciones];
        
        if (!nuevasEvaluaciones[tiempoIndex]) {
            nuevasEvaluaciones[tiempoIndex] = {
                tiempo: tiemposEvaluacion[tiempoIndex],
                color: undefined,
                fc: undefined,
                irritabilidad: undefined,
                tono: undefined,
                respiracion: undefined
            } as any;
        }

        const valorFinal = value === '' ? undefined : Number(value);

        nuevasEvaluaciones[tiempoIndex] = {
            ...nuevasEvaluaciones[tiempoIndex],
            [signo]: valorFinal
        };

        const eval_actual = nuevasEvaluaciones[tiempoIndex];
        const valores = [eval_actual.color, eval_actual.fc, eval_actual.irritabilidad, 
                        eval_actual.tono, eval_actual.respiracion];
        
        const todosDefinidos = valores.every(v => v !== undefined);
        if (todosDefinidos) {
            const total = valores.reduce((sum, val) => sum + (val || 0), 0);
            nuevasEvaluaciones[tiempoIndex].puntaje_total = total;
        } else {
            nuevasEvaluaciones[tiempoIndex].puntaje_total = undefined;
        }

        field.onChange(nuevasEvaluaciones);
    };

    const getValorSigno = (tiempoIndex: number, signo: string): number | undefined => {
        const valor = evaluaciones[tiempoIndex]?.[signo as keyof ApgarEvaluation] as number;
        return valor !== undefined ? valor : undefined;
    };

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                PUNTAJE DE APGAR
            </Typography>
            
            <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                SIGNO
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                0
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                1
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                2
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                1 min
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                5 min
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                10 min
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                15 min
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                20 min
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Color */}
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                COLOR
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Azul cianótico
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Acrocianosis
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Rosado completamente
                            </TableCell>
                            {tiemposEvaluacion.map((tiempo, index) => (
                                <TableCell key={`color-${tiempo}`} align="center" sx={{ border: '1px solid #ddd' }}>
                                    <FormControl size="small" sx={{ minWidth: 60 }}>
                                        <Select
                                            value={getValorSigno(index, 'color') ?? ''}
                                            onChange={(e) => handleValueChange(index, 'color', e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value=""><em>-</em></MenuItem>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* FC */}
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                FC
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Ausente
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                &lt; 100/min
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                &gt; 100/min
                            </TableCell>
                            {tiemposEvaluacion.map((tiempo, index) => (
                                <TableCell key={`fc-${tiempo}`} align="center" sx={{ border: '1px solid #ddd' }}>
                                    <FormControl size="small" sx={{ minWidth: 60 }}>
                                        <Select
                                            value={getValorSigno(index, 'fc') ?? ''}
                                            onChange={(e) => handleValueChange(index, 'fc', e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value=""><em>-</em></MenuItem>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* Irritabilidad */}
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                IRRITABILIDAD REFLEJA
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                No respuesta
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Mueca
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Llora o retira
                            </TableCell>
                            {tiemposEvaluacion.map((tiempo, index) => (
                                <TableCell key={`irritabilidad-${tiempo}`} align="center" sx={{ border: '1px solid #ddd' }}>
                                    <FormControl size="small" sx={{ minWidth: 60 }}>
                                        <Select
                                            value={getValorSigno(index, 'irritabilidad') ?? ''}
                                            onChange={(e) => handleValueChange(index, 'irritabilidad', e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value=""><em>-</em></MenuItem>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* Tono Muscular */}
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                TONO MUSCULAR
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Flácido
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Alguna flexión
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Movimientos activos
                            </TableCell>
                            {tiemposEvaluacion.map((tiempo, index) => (
                                <TableCell key={`tono-${tiempo}`} align="center" sx={{ border: '1px solid #ddd' }}>
                                    <FormControl size="small" sx={{ minWidth: 60 }}>
                                        <Select
                                            value={getValorSigno(index, 'tono') ?? ''}
                                            onChange={(e) => handleValueChange(index, 'tono', e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value=""><em>-</em></MenuItem>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* Respiración */}
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                                RESPIRACIÓN
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Ausente
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Lenta irregular
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', border: '1px solid #ddd' }}>
                                Buena, llora
                            </TableCell>
                            {tiemposEvaluacion.map((tiempo, index) => (
                                <TableCell key={`respiracion-${tiempo}`} align="center" sx={{ border: '1px solid #ddd' }}>
                                    <FormControl size="small" sx={{ minWidth: 60 }}>
                                        <Select
                                            value={getValorSigno(index, 'respiracion') ?? ''}
                                            onChange={(e) => handleValueChange(index, 'respiracion', e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value=""><em>-</em></MenuItem>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* Puntaje Total */}
                        <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }} colSpan={4}>
                                PUNTAJE TOTAL
                            </TableCell>
                            {tiemposEvaluacion.map((tiempo, index) => {
                                const eval_data = evaluaciones[index];
                                let total: number | undefined;
                                let backgroundColor = '#f5f5f5'; 
                                
                                if (eval_data) {
                                    const valores = [eval_data.color, eval_data.fc, eval_data.irritabilidad, 
                                                   eval_data.tono, eval_data.respiracion];
                                    const todosDefinidos = valores.every(v => v !== undefined);
                                    
                                    if (todosDefinidos) {
                                        total = valores.reduce((sum, val) => sum + (val || 0), 0);
                                        backgroundColor = total >= 7 ? '#c8e6c9' : total >= 4 ? '#fff3e0' : '#ffcdd2';
                                    }
                                }
                                
                                return (
                                    <TableCell key={`total-${tiempo}`} align="center" sx={{ 
                                        fontWeight: 'bold', 
                                        fontSize: '1.1rem',
                                        backgroundColor,
                                        border: '1px solid #ddd'
                                    }}>
                                        {total !== undefined ? total : '-'}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            
            {/* Interpretación */}
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                    Interpretación del puntaje APGAR:
                </Typography>
                <Typography variant="body2">
                    • 7-10: Normal (bebé en buenas condiciones)
                </Typography>
                <Typography variant="body2">
                    • 4-6: Moderadamente deprimido (requiere estimulación)
                </Typography>
                <Typography variant="body2">
                    • 0-3: Severamente deprimido (requiere reanimación inmediata)
                </Typography>
            </Box>
        </Box>
    );
};

export default TablaApgar;