// Hook para asignar automáticamente el usuario actual al personal_a_cargo
import { useGetIdentity } from 'react-admin';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const useAutoAssignUser = () => {
    const { identity } = useGetIdentity();
    const { setValue, watch } = useFormContext();
    
    useEffect(() => {
        if (identity && identity.id) {
            // Verificar si el rol es Operador (4) o Paramédico (3)
            const rolId = identity.rol_id;
            if (rolId === 3 || rolId === 4) {
                // Obtener el valor actual del personal_a_cargo
                const personalActual = watch('personal_y_activacion.personal_a_cargo');
                
                // Si está vacío o no incluye al usuario actual, agregarlo
                if (!personalActual || !personalActual.includes(identity.id)) {
                    setValue('personal_y_activacion.personal_a_cargo', [identity.id]);
                }
            }
        }
    }, [identity, setValue, watch]);
};
