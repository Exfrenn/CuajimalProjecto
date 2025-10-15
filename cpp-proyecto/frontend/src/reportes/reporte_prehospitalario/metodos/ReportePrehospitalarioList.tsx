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
        <List sx = {{
            display : 'flex',
            flexDirection : 'collumn',
            margin : '0 auto',
            xs : { width : '100%' },
            sm : { width : '100%' },
            md : { width : '80%' },
            lg : { width : '70%' },
        }}>
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
                    <TextField source="datos_servicio.cronometria.hora_llamada" label="Hora Llamada" />
                    <TextField source="datos_paciente.nombre" label="Paciente" />
                    <TextField source="datos_servicio.motivo_atencion" label="Motivo de Atención" />
                    <TextField source="datos_servicio.cronometria.hora_traslado" label="Hospital de Traslado" />
                    <TextField source="evaluacion_secundaria.prioridad" label="Prioridad" />
                    <TextField source="evaluacion_inicial.nivel_consciencia" label="Nivel Consciencia" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
};
