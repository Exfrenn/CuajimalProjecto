import { useState, useEffect } from 'react';
import { useInput } from 'react-admin';
import {
    Box,
    Typography,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControlLabel,
    Chip
} from '@mui/material';

interface Permiso {
    action: string;
    resource: string;
}

const recursos = [
    { id: 'tablero', name: 'Tablero (Dashboard)' },
    { id: 'turnos', name: 'Turnos' },
    { id: 'roles', name: 'Roles' },
    { id: 'usuarios', name: 'Usuarios' },
    { id: 'reportes_urbanos', name: 'Reportes Urbanos' },
    { id: 'reportes_prehospitalarios', name: 'Reportes Prehospitalarios' },
];

const acciones = [
    { id: 'list', name: 'Listar' },
    { id: 'show', name: 'Ver' },
    { id: 'create', name: 'Crear' },
    { id: 'edit', name: 'Editar' },
    { id: 'delete', name: 'Eliminar' },
];

export const PermisosInput = (props: any) => {
    const { field } = useInput(props);
    const [permisos, setPermisos] = useState<Permiso[]>([]);

    // Inicializar permisos desde el valor del campo
    useEffect(() => {
        if (field.value && Array.isArray(field.value)) {
            setPermisos(field.value);
        }
    }, [field.value]);

    // Verificar si un permiso específico está activado
    const tienePermiso = (resource: string, action: string): boolean => {
        return permisos.some(p => p.resource === resource && p.action === action);
    };

    // Toggle de un permiso específico
    const togglePermiso = (resource: string, action: string) => {
        let nuevosPermisos: Permiso[];
        
        if (tienePermiso(resource, action)) {
            // Remover el permiso
            nuevosPermisos = permisos.filter(
                p => !(p.resource === resource && p.action === action)
            );
        } else {
            // Agregar el permiso
            nuevosPermisos = [...permisos, { resource, action }];
        }
        
        setPermisos(nuevosPermisos);
        field.onChange(nuevosPermisos);
    };

    // Seleccionar/Deseleccionar todos los permisos de un recurso
    const toggleRecurso = (resource: string) => {
        const todasLasAcciones = acciones.map(a => a.id);
        const tieneTodasLasAcciones = todasLasAcciones.every(action => 
            tienePermiso(resource, action)
        );

        let nuevosPermisos: Permiso[];
        
        if (tieneTodasLasAcciones) {
            // Remover todos los permisos de este recurso
            nuevosPermisos = permisos.filter(p => p.resource !== resource);
        } else {
            // Remover permisos existentes del recurso y agregar todos
            nuevosPermisos = permisos.filter(p => p.resource !== resource);
            todasLasAcciones.forEach(action => {
                nuevosPermisos.push({ resource, action });
            });
        }
        
        setPermisos(nuevosPermisos);
        field.onChange(nuevosPermisos);
    };

    // Contar permisos activos por recurso
    const contarPermisosRecurso = (resource: string): number => {
        return permisos.filter(p => p.resource === resource).length;
    };

    return (
        <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
                Permisos del Rol
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Selecciona qué acciones puede realizar este rol en cada recurso
            </Typography>

            <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Recurso</strong>
                            </TableCell>
                            {acciones.map(accion => (
                                <TableCell key={accion.id} align="center">
                                    <strong>{accion.name}</strong>
                                </TableCell>
                            ))}
                            <TableCell align="center">
                                <strong>Todas</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recursos.map(recurso => {
                            const cantidadPermisos = contarPermisosRecurso(recurso.id);
                            const tieneAlgunPermiso = cantidadPermisos > 0;
                            
                            return (
                                <TableRow 
                                    key={recurso.id}
                                    sx={{ 
                                        '&:hover': { bgcolor: 'action.hover' },
                                        bgcolor: tieneAlgunPermiso ? 'action.selected' : 'inherit'
                                    }}
                                >
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            {recurso.name}
                                            {tieneAlgunPermiso && (
                                                <Chip 
                                                    label={`${cantidadPermisos}/${acciones.length}`} 
                                                    size="small" 
                                                    color="primary"
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                    {acciones.map(accion => (
                                        <TableCell key={accion.id} align="center">
                                            <Checkbox
                                                checked={tienePermiso(recurso.id, accion.id)}
                                                onChange={() => togglePermiso(recurso.id, accion.id)}
                                                size="small"
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell align="center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={contarPermisosRecurso(recurso.id) === acciones.length}
                                                    indeterminate={
                                                        cantidadPermisos > 0 && 
                                                        cantidadPermisos < acciones.length
                                                    }
                                                    onChange={() => toggleRecurso(recurso.id)}
                                                />
                                            }
                                            label=""
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Total de permisos: <strong>{permisos.length}</strong>
                </Typography>
            </Box>
        </Box>
    );
};
