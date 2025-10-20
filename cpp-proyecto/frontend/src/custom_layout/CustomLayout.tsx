import { Layout } from 'react-admin';
import { CustomAppBar } from './CustomAppBar';


export const CustomLayout = ({ children }) => (
    <Layout appBar={CustomAppBar}>
        {children}
    </Layout>
);