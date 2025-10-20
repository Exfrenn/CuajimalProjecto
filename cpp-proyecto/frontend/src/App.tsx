import { Admin, CustomRoutes, nanoDarkTheme, nanoLightTheme, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider} from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import { customTheme, customDarkTheme } from "./theme";

import { UsuarioCreate, UsuarioEdit, UsuarioList, UsuarioShow } from "./usuarios/usuarios";
import { TurnoCreate, TurnoEdit, TurnoList, TurnoShow } from "./usuarios/turnos";
import { RolCreate, RolEdit, RolList, RolShow } from "./usuarios/roles";
import { Perfil } from "./usuarios/perfil";
import { ReporteUrbanoCreate, ReporteUrbanoEdit, ReporteUrbanoList, ReporteUrbanoShow} from "./reportes/reporte_urbano/reportes_urbanos";
import { ReportePrehospitalarioCreate, ReportePrehospitalarioEdit, ReportePrehospitalarioList, ReportePrehospitalarioShow} from "./reportes/reporte_prehospitalario/reportes_prehospitalarios";


import ClusteredMapWrapper from "./leaflet/ClusteredMapWrapper";


import IconoUsuario from "@mui/icons-material/Group";
import IconoHospital from '@mui/icons-material/LocalHospital';
import IconoTurno from '@mui/icons-material/Schedule';
import IconoRol from '@mui/icons-material/AdminPanelSettings';
import IconoReporteUrbano from '@mui/icons-material/LocationCity';
import IconoMapa from '@mui/icons-material/Map';
import { Route } from "react-router";
import Registrarse from "./usuarios/registrarse";
import authProvider from "./authProvider";
import LoginPage from "./login/LoginPage";
import { Dashboard } from "./Dashboard";
import { CustomLayout } from "./custom_layout/CustomLayout";

export const App = () => (
    <Admin layout={CustomLayout} loginPage={LoginPage} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} i18nProvider={i18nProvider} theme={nanoLightTheme} darkTheme={nanoDarkTheme}
    >
        <Resource name="turnos" list={TurnoList} show={TurnoShow} create={TurnoCreate} edit={TurnoEdit} icon={IconoTurno}/>
        <Resource name="roles" list={RolList} show={RolShow} create={RolCreate} edit={RolEdit} icon={IconoRol}/>
        <Resource name="usuarios" list={UsuarioList} show={UsuarioShow} create={UsuarioCreate} edit={UsuarioEdit} icon={IconoUsuario}/>
        <Resource name="reportes_urbanos" list={ReporteUrbanoList} show={ReporteUrbanoShow} edit={ReporteUrbanoEdit} create={ReporteUrbanoCreate} icon={IconoReporteUrbano}/>
        <Resource name="reportes_prehospitalarios" list={ReportePrehospitalarioList} show={ReportePrehospitalarioShow} edit={ReportePrehospitalarioEdit} create={ReportePrehospitalarioCreate} icon={IconoHospital}/>
        <CustomRoutes>
            <Route path="registrarse" element={<Registrarse />}/>
            <Route path="perfil" element={<Perfil />}/>
        </CustomRoutes>
    </Admin>
);
