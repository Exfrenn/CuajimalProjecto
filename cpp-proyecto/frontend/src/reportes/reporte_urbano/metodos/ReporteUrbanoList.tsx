import { useMediaQuery, Theme } from "@mui/material";
import { 
    List, 
    SimpleList, 
    Datagrid, 
    TextField, 
    ReferenceField, 
    DateField, 
    EditButton,
    SearchInput,
    TextInput,
    SelectInput,
    ShowButton,
} from "react-admin";

import { ReporteFilterSidebar } from './ReporteFilter';
const reporteFilters = [
    <SearchInput source="q" alwaysOn placeholder="Buscar por folio" />,
    <TextInput source="datos_generales.dia" label="Día" />,
    <SelectInput source="personal_y_activacion.tipo_servicio" label="Tipo de Servicio" choices={[
        { id: "Mitigacion", name: "Mitigación" },
        { id: "Prevencion", name: "Prevención" },
        { id: "Emergencia", name: "Emergencia" },
    ]} />,
];

export const ReporteUrbanoList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={reporteFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `Folio: ${record.datos_generales?.folio}`}
                    secondaryText={(record) => `Fecha: ${new Date(record.datos_generales?.fecha).toLocaleDateString()}`}
                    tertiaryText={(record) => `Tipo de Servicio: ${record.personal_y_activacion?.tipo_servicio}`}
                />
            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <TextField source="datos_generales.folio" label="Folio"/>
                    <DateField source="datos_generales.fecha" label="Fecha" />
                    <DateField source="datos_generales.fecha" label="Dia" locales="es-MX" options={{weekday: 'long'}}/>
                    <TextField source="personal_y_activacion.tipo_servicio" label="Tipo de Servicio"/>
                    <TextField source="personal_y_activacion.modo_activacion" label="Modo de Activación"/>
                    <TextField source="atencion_emergencia.gravedad_emergencia" label="Gravedad"/>
                    <ReferenceField source="datos_generales.turno_id" reference="turnos" label="Turno" link={false}>
                        <TextField source="nombre" />
                    </ReferenceField>
                    <EditButton/>
                </Datagrid>
            )}
        </List>
    );
}