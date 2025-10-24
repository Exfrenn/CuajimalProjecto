import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, FunctionField, Create, SimpleForm, TextInput, SelectArrayInput, TimeInput, useNotify, useRedirect, useRefresh, Edit, EditButton, useGetIdentity } from "react-admin";

export const TurnoList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const { data: identity } = useGetIdentity();
    
    const filter = identity?.rol_id !== 1 ? { id: identity?.turno_id } : {};
    
    return (
        <List filter={filter}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.nombre}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="id" label="Id"/>
                    <DataTable.Col source="nombre" label="Nombre del Turno"/>
                    <DataTable.Col 
                        label="Dias laborales"
                        render={record => Array.isArray(record.dias) ? record.dias.join(', ') : record.dias}
                    />
                    <DataTable.Col 
                        label="Hora de Entrada"
                        render={record => record.hora_inicio ? new Date(record.hora_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    />
                    <DataTable.Col 
                        label="Hora de Salida"
                        render={record => record.hora_fin ? new Date(record.hora_fin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    />
                    <DataTable.Col>
                        <EditButton/>
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}

export const TurnoShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="Id"/>
            <TextField source="nombre" label="Nombre del Turno"/>
            <FunctionField
                label="Dias laborales"
                render={record => Array.isArray(record.dias) ? record.dias.join(', ') : record.dias}
            />
            <FunctionField
                label="Hora de Entrada"
                render={record =>
                    record.hora_inicio
                        ? new Date(record.hora_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : ''
                }
            />
            <FunctionField
                label="Hora de Salida"
                render={record =>
                    record.hora_fin
                        ? new Date(record.hora_fin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : ''
                }
            />
        </SimpleShowLayout>
    </Show>
);

export const TurnoEdit = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Cambios guardados', {undoable:true, autoHideDuration: 5000});
        redirect('/turnos');
        refresh();
    }


    return(
        <Edit mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="id" label="Id" InputProps={{ disabled: true }} />
                <TextInput source="nombre" label="Nombre del Turno"/>
                <SelectArrayInput source="dias" label="Dias laborales" choices={[
                    {id: 'Lun', name: 'Lunes'},
                    {id: 'Mar', name: 'Martes'},
                    {id: 'Mie', name: 'Miercoles'},
                    {id: 'Jue', name: 'Jueves'},
                    {id: 'Vie', name: 'Viernes'},
                    {id: 'Sab', name: 'Sabado'},
                    {id: 'Dom', name: 'Domingo'},
                    {id: 'Fes', name: 'Festivo'}
                ]} />
                <TimeInput source="hora_inicio" label="Hora de Entrada"/>
                <TimeInput source="hora_fin" label="Hora de Salida"/>
            </SimpleForm>
        </Edit>
    )
};

export const TurnoCreate = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Turno creado exitosamente');
        redirect('/turnos');
        refresh();
    }

    return(
        <Create mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="nombre" label="Nombre del Turno"/>
                <SelectArrayInput source="dias" label="Dias laborales" choices={[
                    {id: 'Lun', name: 'Lunes'},
                    {id: 'Mar', name: 'Martes'},
                    {id: 'Mie', name: 'Miercoles'},
                    {id: 'Jue', name: 'Jueves'},
                    {id: 'Vie', name: 'Viernes'},
                    {id: 'Sab', name: 'Sabado'},
                    {id: 'Dom', name: 'Domingo'},
                    {id: 'Fes', name: 'Festivo'}
                ]} />
                <TimeInput source="hora_inicio" label="Hora de Entrada"/>
                <TimeInput source="hora_fin" label="Hora de Salida"/>
            </SimpleForm>
        </Create>
    )
}