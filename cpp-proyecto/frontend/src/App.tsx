import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider} from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import { UsuarioCreate, UsuarioEdit, UsuarioList, UsuarioShow } from "./usuarios/usuarios";
import { ReporteList, ReporteShow } from "./reportes/reportes_prehospitalarios";
import { TurnoCreate, TurnoList, TurnoShow } from "./usuarios/turnos";

import IconoUsuario from "@mui/icons-material/Group";
import IconoHospital from '@mui/icons-material/LocalHospital';

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource name="usuarios" list={UsuarioList} show={UsuarioShow} edit={UsuarioEdit} create={UsuarioCreate} icon={IconoUsuario}/>
        <Resource name="reportes" list={ReporteList} show={ReporteShow} icon={IconoHospital}/>
        <Resource name="turnos" list={TurnoList} show={TurnoShow} create={TurnoCreate}/>
    </Admin>
);
