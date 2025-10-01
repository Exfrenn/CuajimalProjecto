import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, ReferenceField, DateField, TextInput, ReferenceInput, Edit, SimpleForm, DateInput } from "react-admin";

export const ReporteList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={filtrosReporte}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `Folio: ${record.preambulo?.folio}`}
                    secondaryText={(record) => `Fecha: ${record.preambulo?.fecha}`}
                    tertiaryText={(record) => `Paciente: ${record.datos_paciente?.nombre}`}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="preambulo.folio" label="Folio"/>
                    <DataTable.Col source="preambulo.fecha" label="Fecha">
                        <DateField source="preambulo.fecha" />
                    </DataTable.Col>
                    <DataTable.Col source="datos_paciente.nombre" label="Paciente"/>
                    <DataTable.Col source="datos_servicio.motivo_atencion" label="Motivo"/>
                    <DataTable.Col source="control.numero_ambulancia" label="Ambulancia"/>
                    <DataTable.Col>
                        <ReferenceField source="control.operadorId" reference="usuarios" link="show" />
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}

export const ReporteCreate = () => (
    <Edit>
        <SimpleForm>
            {/* Información básica */}
            <TextInput source="preambulo.folio" />
            <DateInput source="preambulo.fecha" />
            
            {/* Datos del servicio */}
            <TextInput source="datos_servicio.motivo_atencion" />
            <TextInput source="datos_servicio.ubicacion.calle" />
            <TextInput source="datos_servicio.ubicacion.colonia" />
            <TextInput source="datos_servicio.ubicacion.alcaldia" />
            
            {/* Control de personal */}
            <TextInput source="control.numero_ambulancia" />
            <ReferenceField source="control.operadorId" reference="usuarios" />
            <ReferenceInput source="control.tumId" reference="usuarios" />
            <ReferenceInput source="control.socorristaId" reference="usuarios" />
            
            {/* Datos del paciente */}
            <TextInput source="datos_paciente.nombre" />
            <TextInput source="datos_paciente.sexo" />
            <TextInput source="datos_paciente.edad.años" />
            <TextInput source="datos_paciente.domicilio" />
            <TextInput source="datos_paciente.telefono" />
            <TextInput source="datos_paciente.ocupacion" />
            
            {/* Cronometría */}
            <TextInput source="datos_servicio.cronometria.hora_llamada" />
            <TextInput source="datos_servicio.cronometria.hora_salida" />
            <TextInput source="datos_servicio.cronometria.hora_llegada" />
            <TextInput source="datos_servicio.cronometria.hora_hospital" />
            
            {/* Evaluación */}
            <TextInput source="evaluacion_inicial.nivel_consciencia" />
            <TextInput source="evaluacion_inicial.via_aerea" />
            <TextInput source="evaluacion_inicial.ventilacion" />
        </SimpleForm>
    </Edit>
)

export const ReporteEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }}/>

            {/* Información básica */}
            <TextInput source="preambulo.folio" />
            <DateInput source="preambulo.fecha" />
            
            {/* Datos del servicio */}
            <TextInput source="datos_servicio.motivo_atencion" />
            <TextInput source="datos_servicio.ubicacion.calle" />
            <TextInput source="datos_servicio.ubicacion.colonia" />
            <TextInput source="datos_servicio.ubicacion.alcaldia" />
            
            {/* Control de personal */}
            <TextInput source="control.numero_ambulancia" />
            <ReferenceField source="control.operadorId" reference="usuarios" />
            <ReferenceInput source="control.tumId" reference="usuarios" />
            <ReferenceInput source="control.socorristaId" reference="usuarios" />
            
            {/* Datos del paciente */}
            <TextInput source="datos_paciente.nombre" />
            <TextInput source="datos_paciente.sexo" />
            <TextInput source="datos_paciente.edad.años" />
            <TextInput source="datos_paciente.domicilio" />
            <TextInput source="datos_paciente.telefono" />
            <TextInput source="datos_paciente.ocupacion" />
            
            {/* Cronometría */}
            <TextInput source="datos_servicio.cronometria.hora_llamada" />
            <TextInput source="datos_servicio.cronometria.hora_salida" />
            <TextInput source="datos_servicio.cronometria.hora_llegada" />
            <TextInput source="datos_servicio.cronometria.hora_hospital" />
            
            {/* Evaluación */}
            <TextInput source="evaluacion_inicial.nivel_consciencia" />
            <TextInput source="evaluacion_inicial.via_aerea" />
            <TextInput source="evaluacion_inicial.ventilacion" />

        </SimpleForm>
    </Edit>
)

export const ReporteShow = () => (
    <Show>
        <SimpleShowLayout>
            {/* Información básica */}
            <TextField source="id" />
            <TextField source="preambulo.folio" />
            <DateField source="preambulo.fecha" />
            
            {/* Datos del servicio */}
            <TextField source="datos_servicio.motivo_atencion" />
            <TextField source="datos_servicio.ubicacion.calle" />
            <TextField source="datos_servicio.ubicacion.colonia" />
            <TextField source="datos_servicio.ubicacion.alcaldia" />
            
            {/* Control de personal */}
            <TextField source="control.numero_ambulancia" />
            <ReferenceField source="control.operadorId" reference="usuarios" />
            <ReferenceField source="control.tumId" reference="usuarios" />
            <ReferenceField source="control.socorristaId" reference="usuarios" />
            
            {/* Datos del paciente */}
            <TextField source="datos_paciente.nombre" />
            <TextField source="datos_paciente.sexo" />
            <TextField source="datos_paciente.edad.años" />
            <TextField source="datos_paciente.domicilio" />
            <TextField source="datos_paciente.telefono" />
            <TextField source="datos_paciente.ocupacion" />
            
            {/* Cronometría */}
            <TextField source="datos_servicio.cronometria.hora_llamada" />
            <TextField source="datos_servicio.cronometria.hora_salida" />
            <TextField source="datos_servicio.cronometria.hora_llegada" />
            <TextField source="datos_servicio.cronometria.hora_hospital" />
            
            {/* Evaluación */}
            <TextField source="evaluacion_inicial.nivel_consciencia" />
            <TextField source="evaluacion_inicial.via_aerea" />
            <TextField source="evaluacion_inicial.ventilacion" />
        </SimpleShowLayout>
    </Show>
);

const filtrosReporte = [
    <TextInput source="q" label="Buscar" alwaysOn />,
    <ReferenceInput source="control.operadorId" label="Operador" reference="usuarios" />,
    <ReferenceInput source="control.tumId" label="T.U.M." reference="usuarios" />,
    <TextInput source="preambulo.fecha" label="Fecha" />,
    <TextInput source="datos_paciente.nombre" label="Paciente" />,
];