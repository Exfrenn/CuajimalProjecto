import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, Create, SimpleForm, TextInput, useNotify, useRedirect, useRefresh, Edit, EditButton, FunctionField, SelectArrayInput } from "react-admin";
import { permisosChoices } from "./choices";

export const RolList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.nombre}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="id" label="Id"/>
                    <DataTable.Col source="nombre" label="Rol"/>
                    <DataTable.Col>
                        <EditButton/>
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}

export const RolShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="Id"/>
            <TextField source="nombre" label="Rol"/>
            <FunctionField
                label="Permisos"
                render={record => Array.isArray(record.permisos) ? record.permisos.join(', ') : record.permisos}
            />

        </SimpleShowLayout>
    </Show>
);

export const RolEdit = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Cambios guardados', {undoable:true, autoHideDuration: 5000});
        redirect('/roles');
        refresh();
    }


    return(
        <Edit mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="id" label="Id" InputProps={{ disabled: true }} />
                <TextInput source="nombre" label="Rol"/>
                <SelectArrayInput source="permisos" choices={permisosChoices}/>
            </SimpleForm>
        </Edit>
    )
};

export const RolCreate = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Rol creado exitosamente');
        redirect('/roles');
        refresh();
    }

    return(
        <Create mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="nombre" label="Rol"/>
                <SelectArrayInput source="permisos" choices={permisosChoices}/>
            </SimpleForm>
        </Create>
    )
};