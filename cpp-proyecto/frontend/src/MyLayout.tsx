import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout, Sidebar } from 'react-admin';
import { MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const MyLogoutButton = forwardRef<any, any>((props, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
            {...props}
        >
            <LogoutIcon /> Cerrar sesión
            
        </MenuItem>
    );
});

const MyUserMenu = () => (
    <UserMenu>
        <MyLogoutButton />
    </UserMenu>
);

const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

const MySidebar = (props: any) => (
    <Sidebar
        {...props}
        sx={{
            '& .MuiDrawer-paper': {
                backgroundImage: 'url(/img/fu.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: '#ffffff',
                transition: 'all 0.3s ease-in-out',
            },
          
            '&.RaSidebar-docked .MuiDrawer-paper': {
                width: '140px !important',
                backgroundSize: 'cover !important',
            },
            
            '&.RaSidebar-closed .MuiDrawer-paper': {
                width: '55px !important',
            },
        }}
    />
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