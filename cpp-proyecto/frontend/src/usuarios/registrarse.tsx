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

const Registrarse: React.FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Datos hardcodeados para evitar necesidad de autenticación
    const turnos = [
        { id: 1, nombre: 'Matutino Semanal' },
        { id: 2, nombre: 'Vespertino Semanal' },
        { id: 3, nombre: 'Nocturno A (L-M-V)' },
        { id: 4, nombre: 'Nocturno B (M-J-D)' },
        { id: 5, nombre: 'Diurno Fin de Semana' },
        { id: 6, nombre: 'Nocturno Fin de Semana' }
    ];

    const roles = [
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
        rol_id: 3, // Paramédico por defecto
        turno_id: 1,
        tipo_servicio: ''
    });

    const steps = ['Información Personal', 'Credenciales', 'Asignación'];

    const handleChange = (field: keyof FormData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDatos({ ...datos, [field]: event.target.value });
        setError('');
    };

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 0:
                if (!datos.nombre || !datos.apellido || !datos.genero) {
                    setError('Todos los campos son obligatorios');
                    return false;
                }
                return true;
            case 1:
                if (!datos.email || !datos.password || !datos.confirmPassword) {
                    setError('Todos los campos son obligatorios');
                    return false;
                }
                if (!/\S+@\S+\.\S+/.test(datos.email)) {
                    setError('Email inválido');
                    return false;
                }
                if (datos.password.length < 6) {
                    setError('La contraseña debe tener al menos 6 caracteres');
                    return false;
                }
                if (datos.password !== datos.confirmPassword) {
                    setError('Las contraseñas no coinciden');
                    return false;
                }
                return true;
            case 2:
                if (!datos.rol_id || !datos.turno_id) {
                    setError('Debes seleccionar un rol y un turno');
                    return false;
                }
                if ((datos.rol_id === 2 || datos.rol_id === 3 || datos.rol_id === 4) && !datos.tipo_servicio) {
                    setError('Debes seleccionar un tipo de servicio');
                    return false;
                }
                return true;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        setError('');
    };

    const handleSubmit = async () => {
        if (!validateStep(activeStep)) return;

        setLoading(true);
        setError('');

        try {
            const { confirmPassword, ...dataToSend } = datos;
            
            const res = await fetch(import.meta.env.VITE_BACKEND+'/registrarse', {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al registrar');
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
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
                        <TextField label="Nombre" value={datos.nombre} onChange={handleChange('nombre')} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }} />
                        <TextField label="Apellido" value={datos.apellido} onChange={handleChange('apellido')} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }} />
                        <TextField select label="Género" value={datos.genero} onChange={handleChange('genero')} fullWidth required>
                            <MenuItem value="Masc">Masculino</MenuItem>
                            <MenuItem value="Fem">Femenino</MenuItem>
                        </TextField>
                    </Stack>
                );
            case 1:
                return (
                    <Stack spacing={3}>
                        <TextField label="Email" type="email" value={datos.email} onChange={handleChange('email')} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }} />
                        <TextField label="Contraseña" type={showPassword ? 'text' : 'password'} value={datos.password} onChange={handleChange('password')} fullWidth required 
                            InputProps={{ 
                                startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                                endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
                            }} 
                        />
                        <TextField label="Confirmar Contraseña" type={showConfirmPassword ? 'text' : 'password'} value={datos.confirmPassword} onChange={handleChange('confirmPassword')} fullWidth required 
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
                        <TextField select label="Rol" value={datos.rol_id} onChange={handleChange('rol_id')} fullWidth required>
                            {roles.map((rol) => <MenuItem key={rol.id} value={rol.id}>{rol.nombre}</MenuItem>)}
                        </TextField>
                        <TextField select label="Turno" value={datos.turno_id} onChange={handleChange('turno_id')} fullWidth required>
                            {turnos.map((turno) => <MenuItem key={turno.id} value={turno.id}>{turno.nombre}</MenuItem>)}
                        </TextField>
                        {(datos.rol_id === 2 || datos.rol_id === 3 || datos.rol_id === 4) && (
                            <TextField select label="Tipo de Servicio" value={datos.tipo_servicio} onChange={handleChange('tipo_servicio')} fullWidth required helperText="Requerido para Jefe de Turno, Paramédicos y Operadores">
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
                        <Typography variant="h4" gutterBottom>
                            ¡Registro Exitoso!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Tu cuenta ha sido creada correctamente. Serás redirigido al login...
                        </Typography>
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
                        <IconButton onClick={() => navigate('/login')} sx={{ mr: 2 }}>
                            <ArrowBack />
                        </IconButton>
                        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <img 
                                src="/img/logo.png" 
                                alt="Logo"
                                style={{ height: 60, marginBottom: 16 }}
                            />
                            <Typography variant="h4" component="h1" gutterBottom>
                                Crear Cuenta
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Completa el formulario para registrarte
                            </Typography>
                        </Box>
                    </Box>

                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {loading && <LinearProgress sx={{ mb: 3 }} />}

                    {renderStepContent(activeStep)}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button
                            disabled={activeStep === 0 || loading}
                            onClick={handleBack}
                            variant="outlined"
                        >
                            Atrás
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Registrando...' : 'Crear Cuenta'}
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleNext}>
                                Siguiente
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Registrarse;