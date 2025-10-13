import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, TextField, ReferenceField, DateField, EditButton} from "react-admin";



export const ReporteUrbanoList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `Folio: ${record.datos_generales?.folio}`}
                    secondaryText={(record) => `Fecha: ${record.datos_generales?.fecha}`}
                    tertiaryText={(record) => `Tipo de Servicio: ${record.personal_y_activacion?.tipo_servicio}`}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="datos_generales.folio" label="Folio"/>
                    <DataTable.Col source="datos_generales.fecha" label="Fecha">
                        <DateField source="datos_generales.fecha" />
                    </DataTable.Col>
                    <DataTable.Col source="datos_generales.dia" label="Día"/>
                    <DataTable.Col source="personal_y_activacion.tipo_servicio" label="Tipo de Servicio"/>
                    <DataTable.Col source="personal_y_activacion.modo_activacion" label="Modo de Activación"/>
                    <DataTable.Col source="atencion_emergencia.gravedad_emergencia" label="Gravedad"/>
                    <DataTable.Col label="Turno">
                        <ReferenceField source="datos_generales.turno_id" reference="turnos">
                            <TextField source="nombre" />
                        </ReferenceField>
                    </DataTable.Col>
                    <DataTable.Col>
                        <EditButton/>
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}