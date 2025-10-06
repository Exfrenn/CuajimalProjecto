import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, EditButton, ReferenceField, TextField, useGetOne, Show, SimpleShowLayout, useNotify, useRedirect, useRefresh, Edit, SimpleForm, TextInput, PasswordInput, ReferenceInput, SelectInput, required, EmailField, Create } from "react-admin";

export const UsuarioList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `${record.nombre} ${record.apellido}`}
                    secondaryText={(record) => {
                        const { data: rol } = useGetOne('roles', { id: record.rol_id });
                        return rol ? rol.nombre : record.rol_id;
                    }}
                    tertiaryText={(record) => {
                        const { data: turno } = useGetOne('turnos', { id: record.turno_id });
                        return turno ? turno.nombre : record.turno_id;
                    }}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="id" label="Id"/>
                    <DataTable.Col source="nombre" label="Nombre"/>
                    <DataTable.Col source="apellido" label="Apellido"/>
                    <DataTable.Col>
                        <EmailField source="email" label="Email"/>
                    </DataTable.Col>
                    <DataTable.Col label = "Rol">
                        <ReferenceField source="rol_id" reference="roles" link={false}>
                            <TextField source="nombre"/>
                        </ReferenceField>
                    </DataTable.Col>
                    <DataTable.Col label = "Turno">
                        <ReferenceField source="turno_id" reference="turnos" link={false}>
                            <TextField source="nombre"/>
                        </ReferenceField>
                    </DataTable.Col>
                    <DataTable.Col>
                        <EditButton/>
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
};

export const UsuarioShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="Id"/>
            <TextField source="nombre" label="Nombre"/>
            <TextField source="apellido" label="Apellido"/>
            <EmailField source="email" label="Email"/>
            <ReferenceField source="rol_id" reference="roles" label="Rol" link={false}>
                <TextField source="nombre"/>
            </ReferenceField>
            <ReferenceField source="turno_id" reference="turnos" label="Turno" link={false}>
                <TextField source="nombre"/>
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
)

export const UsuarioEdit = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    
    const onSuccess = () => {
        notify('Cambios guardados', {undoable:true, autoHideDuration: 5000});
        redirect('/usuarios');
        refresh();
    }

    return(
        <Edit mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="id" label="Id" InputProps={{ disabled: true }} />
                <TextInput source="nombre" label="Nombre"/>
                <TextInput source="apellido" label="Apellido"/>
                <TextInput source="email" label="Email"/>
                <PasswordInput source="password" label="Contrasena"/>
                <ReferenceInput label="Rol" source="rol_id" reference="roles">
                    <SelectInput optionText="nombre" validate={required()} />
                </ReferenceInput>
                <ReferenceInput label="Turno" source="turno_id" reference="turnos">
                    <SelectInput optionText="nombre"/>
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    )
}

const equalToPassword = (value, allValues) => {
    if (value !== allValues.password) {
        return 'Las dos contrasenas deben coincidir';
    }
}

export const UsuarioCreate = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    
    const onSuccess = () => {
        notify('Usuario creado exitosamente');
        redirect('/usuarios');
        refresh();
    }

    return(
        <Create mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="nombre" label="Nombre"/>
                <TextInput source="apellido" label="Apellido"/>
                <TextInput source="email" label="Email"/>
                <PasswordInput source="password" label="Contrasena" validate={required()}/>
                <PasswordInput source="validar_password" label="Validar contrasena" validate={equalToPassword}/>
                <ReferenceInput label="Rol" source="rol_id" reference="roles">
                    <SelectInput optionText="nombre" validate={required()} />
                </ReferenceInput>
                <ReferenceInput label="Turno" source="turno_id" reference="turnos">
                    <SelectInput optionText="nombre" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}