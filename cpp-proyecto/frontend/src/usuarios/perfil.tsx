import { Edit, SimpleForm, TextInput, PasswordInput, ReferenceField, TextField, useGetIdentity, useNotify, useRefresh, Labeled, required, minLength, maxLength, email, regex } from "react-admin";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const validateNombre = [required('El nombre es obligatorio'), minLength(2, 'El nombre debe tener al menos 2 caracteres'), maxLength(50, 'El nombre no puede exceder 50 caracteres'), regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras')];
const validateApellido = [required('El apellido es obligatorio'), minLength(2, 'El apellido debe tener al menos 2 caracteres'), maxLength(50, 'El apellido no puede exceder 50 caracteres'), regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras')];
const validateEmail = [required('El email es obligatorio'), email('Debe ser un email válido')];
const validatePassword = [minLength(6, 'La contraseña debe tener al menos 6 caracteres'), maxLength(50, 'La contraseña no puede exceder 50 caracteres')];

const equalToPassword = (value: any, allValues: any) => {
    if (value && value !== allValues.password) {
        return 'Las dos contraseñas deben coincidir';
    }
    return undefined;
};

export const Perfil = () => {
    const { identity, isLoading } = useGetIdentity();
    const notify = useNotify();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Perfil actualizado correctamente', { type: 'success' });
        refresh();
    };

    if (isLoading || !identity) {
        return <div>Cargando...</div>;
    }

    return (
        <Box sx={{ maxWidth: 800, margin: '20px auto' }}>
            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                        <Typography variant="h5" component="h1">
                            Mi Perfil
                        </Typography>
                    </Box>

                    <Edit
                        resource="usuarios"
                        id={identity.id}
                        mutationMode="pessimistic"
                        mutationOptions={{ onSuccess }}
                        redirect={false}
                        title=" "
                    >
                        <SimpleForm>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Información Personal
                            </Typography>
                            
                            <Stack spacing={2} sx={{ width: '100%' }}>
                                <TextInput source="nombre" label="Nombre" fullWidth validate={validateNombre} />
                                <TextInput source="apellido" label="Apellido" fullWidth validate={validateApellido} />
                                <TextInput source="email" label="Email" type="email" fullWidth validate={validateEmail} />
                            </Stack>

                            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                                Información del Sistema
                            </Typography>
                            
                            <Stack spacing={2} sx={{ width: '100%' }}>
                                <Labeled label="Rol">
                                    <ReferenceField source="rol_id" reference="roles" link={false}>
                                        <TextField source="nombre" />
                                    </ReferenceField>
                                </Labeled>
                                
                                <Labeled label="Turno">
                                    <ReferenceField source="turno_id" reference="turnos" link={false}>
                                        <TextField source="nombre" />
                                    </ReferenceField>
                                </Labeled>
                            </Stack>

                            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                                Cambiar Contraseña
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Deja estos campos vacíos si no deseas cambiar tu contraseña
                            </Typography>
                            
                            <Stack spacing={2} sx={{ width: '100%' }}>
                                <PasswordInput source="password" label="Nueva Contraseña" fullWidth validate={validatePassword} />
                                <PasswordInput source="validar_password" label="Confirmar Nueva Contraseña" validate={equalToPassword} fullWidth />
                            </Stack>
                        </SimpleForm>
                    </Edit>
                </CardContent>
            </Card>
        </Box>
    );
};
