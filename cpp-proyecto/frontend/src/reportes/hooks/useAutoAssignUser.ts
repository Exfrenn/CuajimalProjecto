import { useGetIdentity } from 'react-admin';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const useAutoAssignUser = () => {
    const { identity } = useGetIdentity();
    const { setValue, watch } = useFormContext();
    
    useEffect(() => {
        if (identity && identity.id) {
            const rolId = identity.rol_id;
            if (rolId === 3 || rolId === 4) {
                const personalActual = watch('personal_y_activacion.personal_a_cargo');
                
                if (!personalActual || !personalActual.includes(identity.id)) {
                    setValue('personal_y_activacion.personal_a_cargo', [identity.id]);
                }
            }
        }
    }, [identity, setValue, watch]);
};
