import { Admin, Resource, defaultTheme } from 'react-admin';
import { dataProvider} from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import { UsuarioCreate, UsuarioEdit, UsuarioList, UsuarioShow } from "./usuarios/usuarios";
import { ReporteList } from "./reportes/reportes";
import { TurnoList } from "./usuarios/turnos";
import { authProvider } from './authProvider';

import IconoUsuario from "@mui/icons-material/Group";
import IconoHospital from '@mui/icons-material/LocalHospital';

import MyLoginPage from './MyLoginPage';
import MyLayout from './MyLayout';
import { Dashboard } from './dashboard';


const customTheme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'url(/img/r.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: 20,
          padding: 0.80,
          backdropFilter: 'blur(5px)',
          borderRadius: '0',
        },
      },
    },
  },
};

export const App = () => (
    <Admin  
    i18nProvider={i18nProvider} 
    loginPage={MyLoginPage} 
    layout={MyLayout}
    authProvider={authProvider}  
    dataProvider={dataProvider} 
    theme={customTheme}
    darkTheme={null}
    dashboard={Dashboard}
    >

        <Resource name="usuarios" list={UsuarioList} show={UsuarioShow} edit={UsuarioEdit} create={UsuarioCreate} icon={IconoUsuario}/>
        <Resource name="reportes" list={ReporteList} icon={IconoHospital}/>
        <Resource name="turnos" list={TurnoList}/>
    </Admin>
);
