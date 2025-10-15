import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { Card, CardContent, TextField, Button, Box } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e) => {
        e.preventDefault();

        login({ email, password }).catch(() =>
            notify('Email o contraseña inválidos', { type: 'error' })
        );
    };

    return (
        <Box
            sx={{
                height: '100vh',
                backgroundImage: 'url(/img/background.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                margin: '0 auto',
                xs: { width: '90%' },
                sm: { width: '100%' },
                md: { width: '80%' },
                lg: { width: '70%' },
            }}
        >
            <Card 
                sx={{ 
                    minWidth: 100, 
                    padding: .80, 
                    backdropFilter: 'blur(5px)', 
                    borderRadius: '20px',
                    backgroundImage: 'url(/img/b.jpg)',
                }}
            >
                <CardContent>
                    <img 
                        src="/img/logo.png" 
                        alt="Logo de la aplicación"
                        style={{
                            maxWidth: '200px', 
                            maxHeight: '100px', 
                            width: 'auto',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto 16px auto'
                        }}
                    />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Dirección de correo electrónico"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            sx={{
                                '& .MuiInputLabel-root': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px', 
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' },
                                    '& input': { color: 'white' }
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            sx={{
                                '& .MuiInputLabel-root': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' },
                                    '& input': { color: 'white' }
                                }
                            }}
                        />
                        <Box mt={2} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                size='small'
                                sx={{
                                    width: '140px',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    fontSize: '0.75rem',
                                    backgroundColor: '#2596be',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#000000ff'
                                    }
                                }}
                            >
                                Acceso
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;