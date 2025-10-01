import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider} from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import { UsuarioList } from "./usuarios/usuarios";

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource name="usuarios" list={UsuarioList}/>
    </Admin>
);
