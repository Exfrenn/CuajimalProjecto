import { AppBar, Layout, UserMenu, Sidebar, Logout } from 'react-admin';
import { MenuItem, Box, IconButton, ListItemIcon, ListItemText, } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './styles/sidebar.css';
import './styles/acc.css';

import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';



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


const MyAppBar = () => {
    const handleAccessibilityToggle = () => {
        document.body.classList.toggle('accessibility-mode');
    };

    return (
        <AppBar userMenu={<CustomUserMenu />}>
            <Box sx={{ marginLeft: 'auto', marginRight: 2 }}>
                <IconButton 
                    color="inherit"
                    onClick={handleAccessibilityToggle}
                    title="Activar/Desactivar modo de accesibilidad"
                >
                    <VisibilityIcon />
                </IconButton>
            </Box>
        </AppBar>
    );
};

const MySidebar = (props: any) => (
    <Box sx={{ position: 'relative' }}>
        <Box
            sx={{
                position: 'absolute',
                top: '-48px',
                left: '34px',
                width: '200px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1199,
                pointerEvents: 'none', 
                '& img': {
                    pointerEvents: 'auto' 
                }
            }}
        >
            <img 
                src="/img/blanco2.png" 
                alt="Logo" 
                style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    maxHeight: '45px'
                }} 
            />
        </Box>
        <Sidebar {...props} />
    </Box>
);

const MyLayout = ({ children }: { children: React.ReactNode }) => (
    <Layout 
        appBar={MyAppBar}
        sidebar={MySidebar}
    >
        {children}
    </Layout>
);

export default MyLayout;