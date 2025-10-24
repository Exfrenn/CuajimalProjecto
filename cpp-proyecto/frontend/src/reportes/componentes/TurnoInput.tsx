import { useGetIdentity, ReferenceInput, SelectInput, required } from 'react-admin';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface TurnoInputProps {
    source: string;
    label?: string;
}

export const TurnoInput = ({ source, label = "Turno" }: TurnoInputProps) => {
    const { identity } = useGetIdentity();
    const { setValue } = useFormContext();
    
    useEffect(() => {
        if (identity && identity.id && identity.turno_id) {
            const rolId = identity.rol_id;
            if (rolId === 3 || rolId === 4) {
                console.log(' TurnoInput: Asignando turno', identity.turno_id, 'al campo', source);
                setValue(source, identity.turno_id, { shouldDirty: true, shouldValidate: true });
            }
        }
    }, [identity, setValue, source]);
    
    if (identity && (identity.rol_id === 3 || identity.rol_id === 4)) {
        return (
            <ReferenceInput 
                label={label}
                source={source} 
                reference="turnos"
            >
                <SelectInput 
                    optionText="nombre" 
                    validate={required()}
                    readOnly={true}
                    helperText="Tu turno se asigna automáticamente"
                />
            </ReferenceInput>
        );
    }
    
    return (
        <ReferenceInput 
            label={label}
            source={source} 
            reference="turnos"
        >
            <SelectInput optionText="nombre" validate={required()} />
        </ReferenceInput>
    );
};
