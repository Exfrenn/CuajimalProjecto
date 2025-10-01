import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, SimpleForm, Edit, TextInput, useNotify, useRedirect, useRefresh, Create, EditButton } from "react-admin";

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
                    <DataTable.Col>
                        <EditButton/>
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}

export const TurnoEdit = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Cambios guardados', {undoable:true});
        redirect('/turnos');
        refresh();
    }


    return(
        <Edit mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="id" label="Id" InputProps={{disabled : true}}/>
                <TextInput source="nombre_clave" label="Nombre"/>
                <TextInput source="descripcion" label="Descripcion"/>
            </SimpleForm>
        </Edit>
    )
}

export const TurnoCreate = () => (
        <Create>
            <SimpleForm>
                <TextInput source="nombre_clave" label="Nombre"/>
                <TextInput source="descripcion" label="Descripcion"/>
            </SimpleForm>
        </Create>
)

export const TurnoShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="nombre_clave" />
            <TextField source="descripcion" />
        </SimpleShowLayout>
    </Show>
);