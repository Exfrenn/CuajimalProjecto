import { ReferenceInput, SelectInput, useCreate, required } from "react-admin";

export const LugarOcurrenciaInput = () => {
    const [create] = useCreate();
    return (
        <ReferenceInput
            source="servicio.ubicacion.lugar_ocurrencia"
            reference="lugares_ocurrencia"
        >
            <SelectInput
                validate={required()}
                label="Lugar de ocurrencia"
                optionText="nombre"
                onCreate={async () => {
                    const newNombreLugarOcurrencia = prompt("Ingresa el nuevo lugar de ocurrencia");
                    if (newNombreLugarOcurrencia) {
                        const newLugarOcurrencia = await create(
                            "lugares_ocurrencia",
                            { data: { nombre: newNombreLugarOcurrencia } },
                            { returnPromise: true }
                        );
                        return newLugarOcurrencia;
                    }
                }}
            />
        </ReferenceInput>
    );
};

export const AgenteCausalInput = () => {
    const [create] = useCreate();
    return (
        <ReferenceInput
            source="trauma.agente"
            reference="agentes_causal"
        >
            <SelectInput
                validate={required()}
                label="Agente causal"
                optionText="nombre"
                onCreate={async () => {
                    const newNombreAgenteCausal = prompt("Ingresa el nuevo agente causal");
                    if (newNombreAgenteCausal) {
                        const newAgenteCausal = await create(
                            "agentes_causal",
                            { data: { nombre: newNombreAgenteCausal } },
                            { returnPromise: true }
                        );
                        return newAgenteCausal;
                    }
                }}
            />
        </ReferenceInput>
    );
};

export const OrigenProbableInput = () => {
    const [create] = useCreate();
    return (
        <ReferenceInput
            source="clinica.origen"
            reference="origen_probable"
        >
            <SelectInput
                validate={required()}
                label="Origen probable"
                optionText="nombre"
                onCreate={async () => {
                    const newNombreOrigenProbable = prompt("Ingresa el nuevo origen probable");
                    if (newNombreOrigenProbable) {
                        const newOrigenProbable = await create(
                            "origen_probable", 
                            { data: { nombre: newNombreOrigenProbable } },
                            { returnPromise: true }
                        );
                        return newOrigenProbable;
                    }
                }}
            />
        </ReferenceInput>
    );
};

export const InstitucionInput = () => {
    const [create] = useCreate();
    return (
        <ReferenceInput
            source="institucion"
            reference="instituciones"
            sort={{ field: "nombre", order: "ASC" }}
        >
            <SelectInput
                validate={required()}
                label="Dependencia"
                optionText="nombre"
                fullWidth
                onCreate={async () => {
                    const newNombreInstitucion = prompt("Ingresa el nombre de la nueva institución");
                    if (newNombreInstitucion) {
                        const newInstitucion = await create(
                            "instituciones",
                            { data: { nombre: newNombreInstitucion } },
                            { returnPromise: true }
                        );
                        return newInstitucion;
                    }
                }}
            />
        </ReferenceInput>
    );
};