import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import {authProvider} from "./authProvider";
import { dataProvider} from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import { UserList } from "./usuarios/users";
import { UsuarioList } from "./usuarios/usuarios";
import { ReporteList } from "./reportes/reportes";

export const App = () => (
    <Admin layout={Layout} authProvider={authProvider} dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource name="users" list={UserList}/>
        <Resource name="usuarios" list={UsuarioList}/>
        <Resource name="reportes" list={ReporteList}/>
    </Admin>
);
