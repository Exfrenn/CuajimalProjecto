import { useGetIdentity, ReferenceArrayInput, SelectArrayInput, required } from 'react-admin';
import { Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const PersonalACargo = () => {
    const { identity } = useGetIdentity();
    const { setValue, watch } = useFormContext();
    
    useEffect(() => {
        if (identity && identity.id) {
            const rolId = identity.rol_id;
            if (rolId === 3 || rolId === 4) {
                const personalActual = watch('personal_y_activacion.personal_a_cargo');
                
                if (!personalActual || personalActual.length === 0) {
                    setValue('personal_y_activacion.personal_a_cargo', [identity.id]);
                }
                
                const turnoActual = watch('datos_generales.turno_id');
                if (!turnoActual && identity.turno_id) {
                    setValue('datos_generales.turno_id', identity.turno_id);
                }
            }
        }
    }, [identity, setValue, watch]);
    
    if (identity && (identity.rol_id === 3 || identity.rol_id === 4)) {
        return (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="body2">
                     <strong>Personal a cargo:</strong> {identity.nombre} {identity.apellido} (Tú)
                </Typography>
            </Box>
        );
    }
    
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
