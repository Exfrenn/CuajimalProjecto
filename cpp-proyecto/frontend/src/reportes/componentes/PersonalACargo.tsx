// Componente que auto-asigna el usuario actual o permite selección múltiple
import { useGetIdentity, ReferenceArrayInput, SelectArrayInput, required } from 'react-admin';
import { Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const PersonalACargo = () => {
    const { identity } = useGetIdentity();
    const { setValue, watch } = useFormContext();
    
    useEffect(() => {
        if (identity && identity.id) {
            // Verificar si el rol es Operador (4) o Paramédico (3)
            const rolId = identity.rol_id;
            if (rolId === 3 || rolId === 4) {
                // Auto-asignar el usuario actual
                const personalActual = watch('personal_y_activacion.personal_a_cargo');
                
                if (!personalActual || personalActual.length === 0) {
                    setValue('personal_y_activacion.personal_a_cargo', [identity.id]);
                }
                
                // Auto-asignar el turno del usuario
                const turnoActual = watch('datos_generales.turno_id');
                if (!turnoActual && identity.turno_id) {
                    setValue('datos_generales.turno_id', identity.turno_id);
                }
            }
        }
    }, [identity, setValue, watch]);
    
    // Si es Operador (4) o Paramédico (3), mostrar mensaje y ocultar input
    if (identity && (identity.rol_id === 3 || identity.rol_id === 4)) {
        return (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="body2">
                    📝 <strong>Personal a cargo:</strong> {identity.nombre} {identity.apellido} (Tú)
                </Typography>
            </Box>
        );
    }
    
    // Para otros roles (Admin, Jefe), mostrar el selector normal
    return (
        <ReferenceArrayInput
            label="Personal a Cargo"
            source="personal_y_activacion.personal_a_cargo"
            reference="usuarios"
        >
            <SelectArrayInput
                optionText={record => `${record.nombre} ${record.apellido}`}
                optionValue="id"
                helperText="Selecciona a las personas a cargo"
                validate={required()}
            />
        </ReferenceArrayInput>
    );
};
