import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, ReferenceField, Datagrid, Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, EditButton, required, useNotify, useRedirect, useRefresh, Create } from "react-admin";

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
                    <DataTable.Col>
                        <EditButton/>
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}

export const UsuarioEdit = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Cambios guardados', {undoable:true});
        redirect('/posts');
        refresh();
    }


    return(
        <Edit mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="id" label="Id" InputProps={{disabled : true}}/>
                <TextInput source="nombre" label="Nombre"/>
                <TextInput source="apellido" label="Apellido"/>
                <TextInput source="rol" label="Rol"/>
                <ReferenceInput source="turnoId" reference="turnos" label="Turno">
                    <SelectInput optionText= "nombre_clave" validate={required()}/>
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

export const UsuarioCreate = () => (
        <Create>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="nombre" label="Nombre"/>
                <TextInput source="apellido" label="Apellido"/>
                <TextInput source="rol" label="Rol"/>
                <ReferenceInput source="turnoId" reference="turnos" label="Turno">
                    <SelectInput optionText= "nombre_clave" validate={required()}/>
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )

export const UsuarioShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="Id"/>
            <TextField source="nombre" label="Nombre"/>
            <TextField source="apellido" label="Apellido"/>
            <TextField source="rol" label="Rol"/>
            <ReferenceField source="turnoId" reference="turnos" link="show" label="TurnoId"/>
        </SimpleShowLayout>
    </Show>
)
