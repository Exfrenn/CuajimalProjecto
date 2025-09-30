import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField } from "react-admin";

export const TurnoList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.nombre_clave}
                    secondaryText={(record) => record.descripcion}
                    tertiaryText={(record) => `ID: ${record.id}`}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="id" label="Id"/>
                    <DataTable.Col source="nombre_clave" label="Nombre del Turno"/>
                    <DataTable.Col source="descripcion" label="Descripción"/>
                </DataTable>
            )}
        </List>
    );
}

export const TurnoShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="nombre_clave" />
            <TextField source="descripcion" />
        </SimpleShowLayout>
    </Show>
);