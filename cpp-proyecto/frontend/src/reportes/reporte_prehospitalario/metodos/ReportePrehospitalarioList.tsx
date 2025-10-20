import { useMediaQuery, Theme, Chip } from "@mui/material";
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    SearchInput,
    TextInput,
    SelectInput,
    DateInput,
    FunctionField,
    ShowButton,
} from "react-admin";

const reporteFilters = [
    <SearchInput source="q" alwaysOn placeholder="Buscar por folio o paciente" />,
    <DateInput source="preambulo.fecha" label="Fecha" />,
    <SelectInput source="evaluacion_secundaria.prioridad" label="Prioridad" choices={[
        { id: "Rojo", name: "Rojo" },
        { id: "Amarillo", name: "Amarillo" },
        { id: "Verde", name: "Verde" },
        { id: "Negra", name: "Negra" },
    ]} />,
    <TextInput source="paciente.nombre" label="Paciente" />,
];

const PrioridadField = ({ record }: { record?: any }) => {
    const prioridad = record?.evaluacion_secundaria?.prioridad;
    const colorMap: Record<string, "error" | "warning" | "success" | "default"> = {
        "Rojo": "error",
        "Amarillo": "warning",
        "Verde": "success",
        "Negra": "default"
    };
    return prioridad ? (
        <Chip label={prioridad} color={colorMap[prioridad] || "default"} size="small" />
    ) : null;
};

export const ReportePrehospitalarioList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    
    // El backend ya filtra los reportes según el rol:
    // - Paramédico (rol_id 3): ve solo sus reportes
    // - Jefe (rol_id 2): ve reportes de sus paramédicos
    // - Admin (rol_id 1): ve todos

    return (
        <List filters={reporteFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `Folio: ${record.preambulo?.folio || "Sin folio"}`}
                    secondaryText={(record) =>
                        `Fecha: ${new Date(record.preambulo?.fecha).toLocaleDateString()}`
                    }
                    tertiaryText={(record) =>
                        `Paciente: ${record.paciente?.nombre || "No registrado"}`
                    }
                />
            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <TextField source="preambulo.folio" label="Folio" />
                    <DateField
                        source="preambulo.fecha"
                        label="Fecha"
                        showTime
                    />
                    <TextField source="paciente.nombre" label="Paciente" />
                    <TextField source="servicio.motivo" label="Motivo de Atención" />
                    <TextField source="traslado.hospital" label="Hospital de Traslado" />
                    <FunctionField 
                        label="Prioridad" 
                        render={record => <PrioridadField record={record} />} 
                    />
                    <TextField source="evaluacion_inicial.nivel_consciencia" label="Nivel Consciencia" />
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
};
