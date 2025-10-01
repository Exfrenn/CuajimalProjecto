import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, ReferenceField, Datagrid } from "react-admin";

export const UsuarioList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `${record.nombre} ${record.apellido}`}
                    secondaryText={(record) => record.rol}
                    tertiaryText={(record) => `ID: ${record.id}`}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="id" label="Id"/>
                    <DataTable.Col source="nombre" label="Nombre"/>
                    <DataTable.Col source="apellido" label="Apellido"/>
                    <DataTable.Col source="rol" label="Rol"/>
                    <DataTable.Col source="turnoId" label="Turno">
                        <ReferenceField source="turnoId" reference="turnos" link="show" />
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}
