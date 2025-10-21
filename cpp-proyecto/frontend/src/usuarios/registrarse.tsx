import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, TextField, Button, Typography, MenuItem, Alert, Stack, InputAdornment, IconButton, LinearProgress, Stepper, Step, StepLabel } from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock, ArrowBack, CheckCircle } from '@mui/icons-material';

interface FormData {
    nombre: string;
    apellido: string;
    email: string;
    genero: string;
    password: string;
    confirmPassword: string;
    rol_id: number;
    turno_id: number;
    tipo_servicio: string;
}

interface ValidationErrors {
    nombre?: string;
    apellido?: string;
    email?: string;
    genero?: string;
    password?: string;
    confirmPassword?: string;
    rol_id?: string;
    turno_id?: string;
    tipo_servicio?: string;
}

const Registrarse: React.FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const turnos = [
        { id: 1, nombre: 'Matutino Semanal' },
        { id: 2, nombre: 'Vespertino Semanal' },
        { id: 3, nombre: 'Nocturno A (L-M-V)' },
        { id: 4, nombre: 'Nocturno B (M-J-D)' },
        { id: 5, nombre: 'Diurno Fin de Semana' },
        { id: 6, nombre: 'Nocturno Fin de Semana' }
    ];

    const roles = [
        { id: 1, nombre: 'Administrador' },
        { id: 2, nombre: 'Jefe de Turno' },
        { id: 3, nombre: 'Paramédico' },
        { id: 4, nombre: 'Operador' }
    ];

    const [datos, setDatos] = useState<FormData>({
        nombre: '',
        apellido: '',
        email: '',
        genero: '',
        password: '',
        confirmPassword: '',
        rol_id: 3,
        turno_id: 1,
        tipo_servicio: ''
    });

    const steps = ['Información Personal', 'Credenciales', 'Asignación'];

    // Validadores
    const validateEmail = (email: string): string | undefined => {
        if (!email) return 'El email es obligatorio';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Email inválido';
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (!password) return 'La contraseña es obligatoria';
        if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        if (password.length > 50) return 'La contraseña no puede exceder 50 caracteres';
        return undefined;
    };

    const validateName = (name: string, fieldName: string): string | undefined => {
        if (!name) return `${fieldName} es obligatorio`;
        if (name.length < 2) return `${fieldName} debe tener al menos 2 caracteres`;
        if (name.length > 50) return `${fieldName} no puede exceder 50 caracteres`;
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return `${fieldName} solo puede contener letras`;
        return undefined;
    };

    const validateStep = (step: number): boolean => {
        const errors: ValidationErrors = {};
        
        switch (step) {
            case 0:
                errors.nombre = validateName(datos.nombre, 'El nombre');
                errors.apellido = validateName(datos.apellido, 'El apellido');
                if (!datos.genero) errors.genero = 'El género es obligatorio';
                break;
            case 1:
                errors.email = validateEmail(datos.email);
                errors.password = validatePassword(datos.password);
                if (!datos.confirmPassword) {
                    errors.confirmPassword = 'Debes confirmar la contraseña';
                } else if (datos.password !== datos.confirmPassword) {
                    errors.confirmPassword = 'Las contraseñas no coinciden';
                }
                break;
            case 2:
                if (!datos.rol_id) errors.rol_id = 'Debes seleccionar un rol';
                if (!datos.turno_id) errors.turno_id = 'Debes seleccionar un turno';
                if ((datos.rol_id === 2 || datos.rol_id === 3 || datos.rol_id === 4) && !datos.tipo_servicio) {
                    errors.tipo_servicio = 'El tipo de servicio es obligatorio para este rol';
                }
                break;
        }

        const hasErrors = Object.values(errors).some(error => error !== undefined);
        setValidationErrors(errors);
        
        if (hasErrors) {
            const firstError = Object.values(errors).find(error => error !== undefined);
            setError(firstError || 'Por favor corrige los errores');
            return false;
        }
        
        setError('');
        return true;
    };

    const handleChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatos({ ...datos, [field]: event.target.value });
        setValidationErrors({ ...validationErrors, [field]: undefined });
        setError('');
    };

    const handleNext = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        setError('');
        setValidationErrors({});
    };

    const handleSubmit = async () => {
        if (!validateStep(activeStep)) return;

        setLoading(true);
        setError('');

        try {
            const { confirmPassword, ...dataToSend } = datos;
            
            const res = await fetch('http://localhost:3000/registrarse', {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) {
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await res.json();
                    
                    // Manejo de errores del servidor (validación server-side)
                    if (errorData.errors) {
                        const serverErrors: ValidationErrors = {};
                        if (errorData.errors.email) serverErrors.email = errorData.errors.email;
                        if (errorData.errors.nombre) serverErrors.nombre = errorData.errors.nombre;
                        setValidationErrors(serverErrors);
                        throw new Error(errorData.message || 'Error de validación del servidor');
                    }
                    throw new Error(errorData.message || 'Error al registrar');
                } else {
                    throw new Error('Error al registrar usuario');
                }
            }

            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.message || 'No se pudo registrar el usuario');
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={3}>
                        <TextField label="Nombre" value={datos.nombre} onChange={handleChange('nombre')} fullWidth required error={!!validationErrors.nombre} helperText={validationErrors.nombre} InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }} />
                        <TextField label="Apellido" value={datos.apellido} onChange={handleChange('apellido')} fullWidth required error={!!validationErrors.apellido} helperText={validationErrors.apellido} InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }} />
                        <TextField select label="Género" value={datos.genero} onChange={handleChange('genero')} fullWidth required error={!!validationErrors.genero} helperText={validationErrors.genero}>
                            <MenuItem value="Masc">Masculino</MenuItem>
                            <MenuItem value="Fem">Femenino</MenuItem>
                        </TextField>
                    </Stack>
                );
            case 1:
                return (
                    <Stack spacing={3}>
                        <TextField label="Email" type="email" value={datos.email} onChange={handleChange('email')} fullWidth required error={!!validationErrors.email} helperText={validationErrors.email} InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }} />
                        <TextField label="Contraseña" type={showPassword ? 'text' : 'password'} value={datos.password} onChange={handleChange('password')} fullWidth required error={!!validationErrors.password} helperText={validationErrors.password || 'Mínimo 6 caracteres'}
                            InputProps={{ 
                                startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                                endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
                            }} 
                        />
                        <TextField label="Confirmar Contraseña" type={showConfirmPassword ? 'text' : 'password'} value={datos.confirmPassword} onChange={handleChange('confirmPassword')} fullWidth required error={!!validationErrors.confirmPassword} helperText={validationErrors.confirmPassword}
                            InputProps={{ 
                                startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                                endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">{showConfirmPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
                            }} 
                        />
                    </Stack>
                );
            case 2:
                return (
                    <Stack spacing={3}>
                        <TextField select label="Rol" value={datos.rol_id} onChange={handleChange('rol_id')} fullWidth required error={!!validationErrors.rol_id} helperText={validationErrors.rol_id}>
                            {roles.map((rol) => <MenuItem key={rol.id} value={rol.id}>{rol.nombre}</MenuItem>)}
                        </TextField>
                        <TextField select label="Turno" value={datos.turno_id} onChange={handleChange('turno_id')} fullWidth required error={!!validationErrors.turno_id} helperText={validationErrors.turno_id}>
                            {turnos.map((turno) => <MenuItem key={turno.id} value={turno.id}>{turno.nombre}</MenuItem>)}
                        </TextField>
                        {(datos.rol_id === 2 || datos.rol_id === 3 || datos.rol_id === 4) && (
                            <TextField select label="Tipo de Servicio" value={datos.tipo_servicio} onChange={handleChange('tipo_servicio')} fullWidth required error={!!validationErrors.tipo_servicio} helperText={validationErrors.tipo_servicio || 'Requerido para Jefe de Turno, Paramédicos y Operadores'}>
                                <MenuItem value="urbano">Urbano</MenuItem>
                                <MenuItem value="prehospitalario">Prehospitalario</MenuItem>
                            </TextField>
                        )}
                    </Stack>
                );
            default:
                return null;
        }
    };

    if (success) {
        return (
            <Box sx={{ height: '100vh', backgroundImage: 'url(/img/background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 500, width: '90%', textAlign: 'center' }}>
                    <CardContent sx={{ p: 4 }}>
                        <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
                        <Typography variant="h4" gutterBottom>¡Registro Exitoso!</Typography>
                        <Typography variant="body1" color="text.secondary">Tu cuenta ha sido creada correctamente. Serás redirigido al login...</Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundImage: 'url(/img/background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <Card sx={{ maxWidth: 700, width: '90%', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <IconButton onClick={() => navigate('/login')} sx={{ mr: 2 }}><ArrowBack /></IconButton>
                        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <img src="/img/logo.png" alt="Logo" style={{ height: 60, marginBottom: 16 }} />
                            <Typography variant="h4" component="h1" gutterBottom>Crear Cuenta</Typography>
                            <Typography variant="body2" color="text.secondary">Completa el formulario para registrarte</Typography>
                        </Box>
                    </Box>

                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
                    </Stepper>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                    {loading && <LinearProgress sx={{ mb: 3 }} />}

                    {renderStepContent(activeStep)}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button disabled={activeStep === 0 || loading} onClick={handleBack} variant="outlined">Atrás</Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === steps.length - 1 ? (
                            <Button variant="contained" onClick={handleSubmit} disabled={loading}>{loading ? 'Registrando...' : 'Crear Cuenta'}</Button>
                        ) : (
                            <Button variant="contained" onClick={handleNext}>Siguiente</Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Registrarse;