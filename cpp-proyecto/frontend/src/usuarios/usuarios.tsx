import { useMediaQuery, Theme, Box, Card, CardContent, Typography, Divider, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import { 
    List, 
    SimpleList, 
    Datagrid, 
    EditButton, 
    ReferenceField, 
    TextField, 
    useGetOne, 
    Show, 
    SimpleShowLayout, 
    useNotify, 
    useRedirect, 
    useRefresh, 
    Edit, 
    SimpleForm, 
    TextInput, 
    PasswordInput, 
    ReferenceInput, 
    SelectInput, 
    required, 
    EmailField, 
    Create,
    SearchInput,
    ShowButton,
    Labeled
} from "react-admin";

const usuarioFilters = [
    <SearchInput source="q" alwaysOn placeholder="Buscar por nombre o email" />,
    <TextInput source="nombre" label="Nombre" />,
    <TextInput source="apellido" label="Apellido" />,
    <ReferenceInput source="rol_id" reference="roles" label="Rol">
        <SelectInput optionText="nombre" />
    </ReferenceInput>,
    <ReferenceInput source="turno_id" reference="turnos" label="Turno">
        <SelectInput optionText="nombre" />
    </ReferenceInput>,
];

export const UsuarioList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={usuarioFilters} sort={{ field: 'id', order: 'ASC' }}>
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
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <TextField source="id" label="Id"/>
                    <TextField source="nombre" label="Nombre"/>
                    <TextField source="apellido" label="Apellido"/>
                    <TextField source="usuario" label="Nombre de Usuario"/>
                    <EmailField source="email" label="Email"/>
                    <ReferenceField source="rol_id" reference="roles" link={false} label="Rol">
                        <TextField source="nombre"/>
                    </ReferenceField>
                    <ReferenceField source="turno_id" reference="turnos" link={false} label="Turno">
                        <TextField source="nombre"/>
                    </ReferenceField>
                    <ShowButton />
                    <EditButton/>
                </Datagrid>
            )}
        </List>
    );
};

export const UsuarioShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <Box sx={{ width: '100%' }}>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon /> Información Personal
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Labeled label="ID">
                                        <TextField source="id" />
                                    </Labeled>
                                </Box>
                                <Box sx={{ flex: 2 }}>
                                    <Labeled label="Nombre">
                                        <TextField source="nombre" />
                                    </Labeled>
                                </Box>
                                <Box sx={{ flex: 2 }}>
                                    <Labeled label="Apellido">
                                        <TextField source="apellido" />
                                    </Labeled>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon /> Información de Acceso
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Labeled label="Nombre de Usuario">
                                        <TextField source="usuario" />
                                    </Labeled>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Labeled label="Email">
                                        <EmailField source="email" />
                                    </Labeled>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BadgeIcon /> Asignaciones
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Labeled label="Rol">
                                        <ReferenceField source="rol_id" reference="roles" link={false}>
                                            <TextField source="nombre"/>
                                        </ReferenceField>
                                    </Labeled>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Labeled label="Turno">
                                        <ReferenceField source="turno_id" reference="turnos" link={false}>
                                            <TextField source="nombre"/>
                                        </ReferenceField>
                                    </Labeled>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </SimpleShowLayout>
        </Show>
    );
};


const turnoRequiredIfNotAdmin = (value: any, allValues: any) => {
    // Convierte a número para comparar correctamente
    const rolId = Number(allValues.rol_id);
    if (rolId === 1) {
        return undefined; // No requerido si es admin
    }
    return value ? undefined : 'El turno es obligatorio para este rol';
};

const equalToPassword = (value: any, allValues: any) => {
    if (value !== allValues.password) {
        return 'Las dos contrasenas deben coincidir';
    }
}


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
                <Box sx={{ width: '100%' }}>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon /> Información Personal
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <TextInput source="id" label="ID" disabled fullWidth />
                                </Box>
                                <Box sx={{ flex: 2 }}>
                                    <TextInput source="nombre" label="Nombre" fullWidth validate={required()} />
                                </Box>
                                <Box sx={{ flex: 2 }}>
                                    <TextInput source="apellido" label="Apellido" fullWidth validate={required()} />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon /> Información de Acceso
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <TextInput source="usuario" label="Nombre de Usuario" fullWidth validate={required()} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <TextInput source="email" label="Email" type="email" fullWidth validate={required()} />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LockIcon /> Cambiar Contraseña
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <PasswordInput source="password" label="Nueva contraseña (dejar en blanco para no cambiar)" fullWidth />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BadgeIcon /> Asignaciones
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <ReferenceInput label="Rol" source="rol_id" reference="roles">
                                        <SelectInput optionText="nombre" validate={required()} fullWidth />
                                    </ReferenceInput>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <ReferenceInput label="Turno" source="turno_id" reference="turnos">
                                        <SelectInput optionText="nombre" validate={turnoRequiredIfNotAdmin} fullWidth />
                                    </ReferenceInput>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </SimpleForm>
        </Edit>
    )
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
                <Box sx={{ width: '100%' }}>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon /> Información Personal
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <TextInput source="nombre" label="Nombre" fullWidth validate={required()} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <TextInput source="apellido" label="Apellido" fullWidth validate={required()} />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon /> Información de Acceso
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <TextInput source="usuario" label="Nombre de Usuario" fullWidth validate={required()} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <TextInput source="email" label="Email" type="email" fullWidth validate={required()} />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LockIcon /> Contraseña
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2}>
                                <PasswordInput source="password" label="Contraseña" validate={required()} fullWidth />
                                <PasswordInput source="validar_password" label="Confirmar contraseña" validate={equalToPassword} fullWidth />
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BadgeIcon /> Asignaciones
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                <Box sx={{ flex: 1 }}>
                                    <ReferenceInput label="Rol" source="rol_id" reference="roles">
                                        <SelectInput optionText="nombre" validate={required()} fullWidth />
                                    </ReferenceInput>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <ReferenceInput label="Turno" source="turno_id" reference="turnos">
                                        <SelectInput optionText="nombre" validate={turnoRequiredIfNotAdmin} fullWidth />
                                    </ReferenceInput>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </SimpleForm>
        </Create>
    )
}