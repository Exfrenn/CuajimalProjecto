import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, ReferenceField, DateField, TextInput, ReferenceInput, Edit, SimpleForm, DateInput, FunctionField } from "react-admin";

export const ReporteList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
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
};

export const ReporteShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="preambulo.folio" label="Folio"/>
            <DateField source="preambulo.fecha" label="Fecha"/>

            <DateField source="datos_servicio.cronometria.hora_llamada" label="Hora de llamada" showTime showDate={false}/>
            <DateField source="datos_servicio.cronometria.hora_salida" label="Hora de salida" showTime showDate={false}/>
            <DateField source="datos_servicio.cronometria.hora_llegada" label="Hora de llegada" showTime showDate={false}/>
            <DateField source="datos_servicio.cronometria.hora_traslado" label="Hora de traslado" showTime showDate={false}/>
            <DateField source="datos_servicio.cronometria.hora_hospital" label="Hora de ingreso a hospital" showTime showDate={false}/>
            <DateField source="datos_servicio.cronometria.salida_hospital" label="Hora de salida del hospital" showTime showDate={false}/>
            <DateField source="datos_servicio.cronometria.hora_base" label="Hora de llegada a la base" showTime showDate={false}/>

            <TextField source="datos_servicio.motivo_atencion" label="Motivo de atencion"/>
            <TextField source="datos_servicio.ubicacion.calle" label="Calle"/>
            <TextField source="datos_servicio.ubicacion.interseccion1" label="Interseccion 1"/>
            <TextField source="datos_servicio.ubicacion.interseccion2" label="interseccion 2"/>
            <TextField source="datos_servicio.ubicacion.colonia" label="Colonia"/>
            <TextField source="datos_servicio.ubicacion.alcaldia" label="Alcaldia"/>
            <TextField source="datos_servicio.ubicacion.lugar_ocurrencia" label="Lugar de ocurrencia"/>

            <TextField source="control.numero_ambulancia" label="Numero de ambulancia"/>
            <ReferenceField source="control.operadorId" reference="usuarios" label="Operador">
                <FunctionField render={record => `${record.nombre} ${record.apellido}`} />
            </ReferenceField>

        </SimpleShowLayout>
    </Show>
);

