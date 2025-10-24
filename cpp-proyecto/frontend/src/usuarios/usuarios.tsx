import { useMediaQuery, Theme, Typography, Box } from "@mui/material";
import { List, SimpleList, DataTable, EditButton, ReferenceField, TextField, useGetOne, Show, SimpleShowLayout, useNotify, useRedirect, useRefresh, Edit, SimpleForm, TextInput, PasswordInput, ReferenceInput, SelectInput, required, EmailField, Create, SelectArrayInput, useGetList, ReferenceArrayField, useGetIdentity } from "react-admin";
import { generosChoices, tipoServicioChoices } from "./choices";
import { useMemo } from "react";
import { useWatch } from 'react-hook-form';


const turnoRequiredIfNotAdmin = (value: any, allValues: any) => {
    const rolId = Number(allValues.rol_id);
    if (rolId === 1) {
        return undefined; 
    }
    return value ? undefined : 'El turno es obligatorio para este rol';
};

const tipoServicioRequiredIfJefeTurno = (value: any, allValues: any) => {
    const rolId = Number(allValues.rol_id);
    if (rolId === 2) { 
        return value ? undefined : 'El tipo de servicio es obligatorio para Jefe de turno';
    }
    return undefined;
};

const operadoresRequiredIfJefeTurno = (value: any, allValues: any) => {
    const rolId = Number(allValues.rol_id);
    if (rolId === 2) { 
        return (value && value.length > 0) ? undefined : 'Debe seleccionar al menos un operador/paramédico';
    }
    return undefined;
};

const equalToPassword = (value: any, allValues: any) => {
    if (value !== allValues.password) {
        return 'Las dos contraseñas deben coincidir';
    }
};

const OperadoresInput = () => {
    const rolId = useWatch({ name: 'rol_id' });
    const turnoId = useWatch({ name: 'turno_id' });
    const tipoServicio = useWatch({ name: 'tipo_servicio' });

    const { data: usuarios = [], isLoading } = useGetList('usuarios', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'nombre', order: 'ASC' },
    });

    const rolFiltro = tipoServicio === 'urbano' ? 4 : tipoServicio === 'prehospitalario' ? 3 : null;

    const usuariosFiltrados = useMemo(() => {
        if (!turnoId || !rolFiltro) return [];
        
        return usuarios.filter(user => 
            Number(user.turno_id) === Number(turnoId) && 
            Number(user.rol_id) === rolFiltro
        );
    }, [usuarios, turnoId, rolFiltro]);

    if (Number(rolId) !== 2) {
        return null;
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    if (!turnoId) {
        return (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                <Typography variant="body2">
                     Primero selecciona un turno para ver los operadores/paramédicos disponibles
                </Typography>
            </Box>
        );
    }

    if (!tipoServicio) {
        return (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                <Typography variant="body2">
                     Primero selecciona un tipo de servicio para ver los operadores/paramédicos disponibles
                </Typography>
            </Box>
        );
    }

    if (usuariosFiltrados.length === 0) {
        return (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="body2">
                    ℹ️ No hay {tipoServicio === 'urbano' ? 'operadores' : 'paramédicos'} en el turno seleccionado
                </Typography>
            </Box>
        );
    }

    return (
        <SelectArrayInput
            source="operadores_id"
            label={`${tipoServicio === 'urbano' ? 'Operadores' : 'Paramédicos'} a cargo`}
            choices={usuariosFiltrados}
            optionText={(record) => `${record.nombre} ${record.apellido}`}
            optionValue="id"
            validate={operadoresRequiredIfJefeTurno}
            fullWidth
            helperText={`Selecciona los ${tipoServicio === 'urbano' ? 'operadores' : 'paramédicos'} que estarán bajo tu supervisión`}
        />
    );
};
export const UsuarioList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const { data: identity } = useGetIdentity();
    
    let filter = {};
    
    if (identity?.rol_id === 3 || identity?.rol_id === 4) {
        filter = { id: identity.id };
    } else if (identity?.rol_id === 2) {
        filter = {}; 
    }
    
    return (
        <List filter={filter}>     
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
                    <DataTable.Col source="usuario" label="Nombre de Usuario"/>
                    <DataTable.Col label="Email">
                        <EmailField source="email"/>
                    </DataTable.Col>
                    <DataTable.Col label="Rol">
                        <ReferenceField source="rol_id" reference="roles" link={false}>
                            <TextField source="nombre"/>
                        </ReferenceField>
                    </DataTable.Col>
                    <DataTable.Col label="Turno">
                        <ReferenceField source="turno_id" reference="turnos" link={false}>
                            <TextField source="nombre"/>
                        </ReferenceField>
                    </DataTable.Col>
                    <DataTable.Col label="Tipo Servicio" source="tipo_servicio">
                        <TextField source="tipo_servicio" />
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
            <TextField source="usuario" label="Nombre de Usuario"/>
            <EmailField source="email" label="Email"/>
            <ReferenceField source="rol_id" reference="roles" label="Rol" link={false}>
                <TextField source="nombre"/>
            </ReferenceField>
            <ReferenceField source="turno_id" reference="turnos" label="Turno" link={false}>
                <TextField source="nombre"/>
            </ReferenceField>
            <TextField source="tipo_servicio" label="Tipo de Servicio" />
            <ReferenceArrayField source="operadores_ids" reference="usuarios" label="Operadores/Paramédicos a cargo">
                <SimpleList
                    primaryText={(record) => `${record.nombre} ${record.apellido}`}
                    secondaryText={(record) => {
                        const { data: rol } = useGetOne('roles', { id: record.rol_id });
                        return rol ? rol.nombre : '';
                    }}
                />
            </ReferenceArrayField>
        </SimpleShowLayout>
    </Show>
);

export const UsuarioEdit = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    
    const onSuccess = () => {
        notify('Cambios guardados', {undoable: true, autoHideDuration: 5000});
        redirect('/usuarios');
        refresh();
    };

    return (
        <Edit mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="id" label="Id" InputProps={{ disabled: true }} />
                <TextInput source="nombre" label="Nombre" validate={required()} fullWidth />
                <TextInput source="apellido" label="Apellido" validate={required()} fullWidth />
                <SelectInput source="genero" label="Género" choices={generosChoices} fullWidth />
                <PasswordInput source="password" label="Contraseña" validate={required()} fullWidth />

                <TextInput source="usuario" label="Nombre de Usuario" validate={required()} fullWidth />
                <TextInput source="email" label="Email" validate={required()} fullWidth />
                
                <ReferenceInput label="Rol" source="rol_id" reference="roles">
                    <SelectInput optionText="nombre" validate={required()} fullWidth />
                </ReferenceInput>
                
                <ReferenceInput label="Turno" source="turno_id" reference="turnos">
                    <SelectInput optionText="nombre" validate={turnoRequiredIfNotAdmin} fullWidth />
                </ReferenceInput>

                <SelectInput 
                    source="tipo_servicio" 
                    label="Tipo de Servicio" 
                    choices={tipoServicioChoices}
                    validate={tipoServicioRequiredIfJefeTurno}
                    fullWidth
                    helperText="Solo requerido para Jefe de turno"
                />

                <OperadoresInput />
            </SimpleForm>
        </Edit>
    );
};

export const UsuarioCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    
    const onSuccess = () => {
        notify('Usuario creado exitosamente');
        redirect('/usuarios');
        refresh();
    };

    return (
        <Create mutationOptions={{onSuccess}}>
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="nombre" label="Nombre" validate={required()} fullWidth />
                <TextInput source="apellido" label="Apellido" validate={required()} fullWidth />
                <SelectInput source="genero" label="Género" choices={generosChoices} fullWidth />
                <TextInput source="usuario" label="Nombre de Usuario" validate={required()} fullWidth />
                <TextInput source="email" label="Email" validate={required()} fullWidth />
                <PasswordInput source="password" label="Contraseña" validate={required()} fullWidth />
                <PasswordInput source="validar_password" label="Validar contraseña" validate={equalToPassword} fullWidth />
                
                <ReferenceInput label="Rol" source="rol_id" reference="roles">
                    <SelectInput optionText="nombre" validate={required()} fullWidth />
                </ReferenceInput>
                
                <ReferenceInput label="Turno" source="turno_id" reference="turnos">
                    <SelectInput optionText="nombre" validate={turnoRequiredIfNotAdmin} fullWidth />
                </ReferenceInput>

                <SelectInput 
                    source="tipo_servicio" 
                    label="Tipo de Servicio" 
                    choices={tipoServicioChoices}
                    validate={tipoServicioRequiredIfJefeTurno}
                    fullWidth
                    helperText="Solo requerido para Jefe de turno"
                />

                <OperadoresInput />
            </SimpleForm>
        </Create>
    );
};
