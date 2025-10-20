import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, Create, SimpleForm, TextInput, useNotify, useRedirect, useRefresh, Edit, EditButton, FunctionField, useGetIdentity } from "react-admin";
import { PermisosInput } from "./PermisosInput";

export const RolList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const { data: identity } = useGetIdentity();
    
    // Filtrar: solo mostrar su propio rol si no es admin
    const filter = identity?.rol_id !== 1 ? { id: identity?.rol_id } : {};
    
    return (
        <List filter={filter}>
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
                render={(record: any) => {
                    if (Array.isArray(record.permisos)) {
                        // Si son objetos {action, resource}
                        if (record.permisos.length > 0 && typeof record.permisos[0] === 'object') {
                            return record.permisos
                                .map((p: any) => `${p.action} en ${p.resource}`)
                                .join(', ');
                        }
                        // Si son strings (formato antiguo)
                        return record.permisos.join(', ');
                    }
                    return record.permisos;
                }}
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
                <PermisosInput source="permisos" />
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
                <PermisosInput source="permisos" />
            </SimpleForm>
        </Create>
    )
};