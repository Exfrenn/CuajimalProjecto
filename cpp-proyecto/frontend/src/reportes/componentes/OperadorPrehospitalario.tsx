import { useGetIdentity, ReferenceArrayInput, SelectArrayInput, required } from 'react-admin';
import { Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const OperadorPrehospitalario = () => {
    const { identity } = useGetIdentity();
    const { setValue, watch } = useFormContext();
    
    useEffect(() => {
        if (identity && identity.id) {
            const rolId = identity.rol_id;
            if (rolId === 3) {
                const operadorActual = watch('control.operador');
                
                if (!operadorActual || operadorActual.length === 0) {
                    setValue('control.operador', [identity.id]);
                }
                
                const turnoActual = watch('preambulo.turno_id') || watch('datos_generales.turno_id');
                if (!turnoActual && identity.turno_id) {
                    setValue('preambulo.turno_id', identity.turno_id);
                }
            }
        }
    }, [identity, setValue, watch]);
    
    if (identity && identity.rol_id === 3) {
        return (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="body2">
                     <strong>Operador:</strong> {identity.nombre} {identity.apellido} (Tú)
                </Typography>
            </Box>
        );
    }
    
    return (
        <ReferenceArrayInput
            label="Operadores"
            source="control.operador"
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
