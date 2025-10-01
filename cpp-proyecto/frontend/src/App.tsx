import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider} from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import { UsuarioCreate, UsuarioEdit, UsuarioList, UsuarioShow } from "./usuarios/usuarios";
import { ReporteList } from "./reportes/reportes";
import { TurnoEdit, TurnoList, TurnoShow } from "./turnos/turnos";

import IconoUsuario from "@mui/icons-material/Group";
import IconoHospital from '@mui/icons-material/LocalHospital';
import IconoTurno from '@mui/icons-material/Schedule';

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource name="turnos" list={TurnoList} show={TurnoShow} edit={TurnoEdit} icon={IconoTurno}/>
        <Resource name="usuarios" list={UsuarioList} show={UsuarioShow} edit={UsuarioEdit} create={UsuarioCreate} icon={IconoUsuario}/>
        <Resource name="reportes" list={ReporteList} icon={IconoHospital}/>
    </Admin>
);
