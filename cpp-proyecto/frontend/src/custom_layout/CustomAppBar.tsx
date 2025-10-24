import { AppBar, TitlePortal, UserMenu, Logout } from 'react-admin';
import PersonIcon from '@mui/icons-material/Person';
import { MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logo = () => (
    <Box
        component="img"
        sx={{
            height: 40,
            marginRight: 2,
            cursor: 'pointer',
        }}
        alt="Logo"
        src="/img/logo-blanco.png"
        onClick={() => window.location.href = '/#/'}
    />
);

const CustomUserMenu = () => {
    const navigate = useNavigate();

    return (
        <UserMenu>
            <MenuItem onClick={() => navigate('/perfil')}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Mi Perfil</ListItemText>
            </MenuItem>
            <Logout />
        </UserMenu>
    );
};

export const CustomAppBar = () => (
    <AppBar userMenu={<CustomUserMenu />}>
<Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                position: 'absolute',
                left: 0,
                pointerEvents: 'none', 
            }}
        >
            <Box sx={{ pointerEvents: 'auto' }}>
                <Logo />
            </Box>
        </Box>
        <TitlePortal />
    </AppBar>
);