import { useMediaQuery, Theme } from "@mui/material";
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    EditButton
} from "react-admin";

export const ReportePrehospitalarioList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `Folio: ${record.preambulo?.folio || "Sin folio"}`}
                    secondaryText={(record) =>
                        `Fecha: ${record.preambulo?.fecha?.dia || "?"}/${record.preambulo?.fecha?.mes || "?"}/${record.preambulo?.fecha?.ano || "?"}`
                    }
                    tertiaryText={(record) =>
                        `Paciente: ${record.paciente?.nombre || "No registrado"}`
                    }
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="preambulo.folio" label="Folio" />
                    <DateField
                        source="preambulo.fecha"
                        label="Fecha"
                        showTime={false}
                    />
                    <TextField source="servicio.cronometro.hora_llamada" label="Hora Llamada" />
                    <TextField source="paciente.nombre" label="Paciente" />
                    <TextField source="servicio.motivo" label="Motivo de Atención" />
                    <TextField source="control.operador" label="Operador" />
                    <TextField source="traslado.hospital" label="Hospital de Traslado" />
                    <TextField source="evaluacion_secundaria.prioridad" label="Prioridad" />
                    <TextField source="evaluacion_inicial.nivel_consciencia" label="Nivel Consciencia" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
};
