// reportes/reporte_urbano/components/SubtipoServicioInput.tsx
import { SelectInput, required } from 'react-admin';
import { useWatch } from 'react-hook-form';
import { subtipoChoices } from '../../data/choices';

export const SubtipoServicioInput = () => {
    const tipo = useWatch({ name: "personal_y_activacion.tipo_servicio" });
    
    if (!tipo || !(tipo in subtipoChoices)) {
        return null;
    }
    
    return (
        <SelectInput
            source="personal_y_activacion.subtipo_servicio"
            label="Subtipo de servicio"
            choices={subtipoChoices[tipo as keyof typeof subtipoChoices]}
            validate={required()}
        />
    );
};