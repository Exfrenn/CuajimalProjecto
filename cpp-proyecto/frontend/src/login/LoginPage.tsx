import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { 
    Box, 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    Typography 
} from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email, password }).catch(() =>
            notify('Email o contraseña inválidos', { type: 'error' })
        );
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
        >
            <Card sx={{ minWidth: 300, maxWidth: 400 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Iniciar Sesión
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="email"
                            type="email"
                            label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;