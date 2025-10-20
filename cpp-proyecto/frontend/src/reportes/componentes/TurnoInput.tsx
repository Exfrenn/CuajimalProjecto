// Componente que auto-asigna el turno del usuario actual para operadores/paramédicos
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
            // Verificar si el rol es Operador (4) o Paramédico (3)
            const rolId = identity.rol_id;
            if (rolId === 3 || rolId === 4) {
                // Auto-asignar el turno del usuario
                console.log('🔧 TurnoInput: Asignando turno', identity.turno_id, 'al campo', source);
                setValue(source, identity.turno_id, { shouldDirty: true, shouldValidate: true });
            }
        }
    }, [identity, setValue, source]);
    
    // Si es Operador (4) o Paramédico (3), mostrar el turno deshabilitado
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
    
    // Para otros roles (Admin, Jefe), mostrar el selector normal
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
