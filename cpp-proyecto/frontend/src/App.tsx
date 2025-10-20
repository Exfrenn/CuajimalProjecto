import { Admin, CustomRoutes, defaultTheme, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import MyLayout from './MyLayout';
import { UsuarioCreate, UsuarioEdit, UsuarioList, UsuarioShow } from "./usuarios/usuarios";
import { TurnoCreate, TurnoEdit, TurnoList, TurnoShow } from "./usuarios/turnos";
import { RolCreate, RolEdit, RolList, RolShow } from "./usuarios/roles";
import { Perfil } from "./usuarios/perfil";
import { ReporteUrbanoCreate, ReporteUrbanoEdit, ReporteUrbanoList, ReporteUrbanoShow } from "./reportes/reporte_urbano/reportes_urbanos";
import { ReportePrehospitalarioCreate, ReportePrehospitalarioEdit, ReportePrehospitalarioList, ReportePrehospitalarioShow } from "./reportes/reporte_prehospitalario/reportes_prehospitalarios";
import { Estadisticas } from "./estadisticas/Estadisticas";

import IconoUsuario from "@mui/icons-material/Group";
import IconoHospital from '@mui/icons-material/LocalHospital';
import IconoTurno from '@mui/icons-material/Schedule';
import IconoRol from '@mui/icons-material/AdminPanelSettings';
import IconoReporteUrbano from '@mui/icons-material/LocationCity';

import { Route } from "react-router";
import Registrarse from "./usuarios/registrarse";
import authProvider from "./authProvider";
import LoginPage from "./login/LoginPage";
import { Dashboard } from "./Dashboard";
import { CustomLayout } from "./custom_layout/CustomLayout";

import './styles/sidexd.css';
import './styles/acc.css';

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
    layout={MyLayout} 
    loginPage={LoginPage} 
    dashboard={Dashboard} 
    authProvider={authProvider} 
    dataProvider={dataProvider} 
    i18nProvider={i18nProvider} 
    theme={customTheme}
    darkTheme={null}
  >
    <Resource name="turnos" list={TurnoList} show={TurnoShow} create={TurnoCreate} edit={TurnoEdit} icon={IconoTurno} />
    <Resource name="roles" list={RolList} show={RolShow} create={RolCreate} edit={RolEdit} icon={IconoRol} />
    <Resource name="usuarios" list={UsuarioList} show={UsuarioShow} create={UsuarioCreate} edit={UsuarioEdit} icon={IconoUsuario} />
    <Resource name="reportes_urbanos" list={ReporteUrbanoList} show={ReporteUrbanoShow} edit={ReporteUrbanoEdit} create={ReporteUrbanoCreate} icon={IconoReporteUrbano} />
    <Resource name="reportes_prehospitalarios" list={ReportePrehospitalarioList} show={ReportePrehospitalarioShow} edit={ReportePrehospitalarioEdit} create={ReportePrehospitalarioCreate} icon={IconoHospital} />
    <CustomRoutes>
      <Route path="registrarse" element={<Registrarse />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="estadisticas" element={<Estadisticas />} />
    </CustomRoutes>
  </Admin>
);