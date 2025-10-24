
import { Card, CardContent } from '@mui/material';
import { FilterList, FilterListItem, FilterLiveSearch, SavedQueriesList } from 'react-admin';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import { FC } from 'react';

export const ReporteFilterSidebar: FC = () => (
    <Card sx={{ order: -1, mr: 2, mt: 8, width: 250 }}>
        <CardContent>
            {/* Búsqueda en vivo */}
            <FilterLiveSearch source="q" label="Buscar" />
            
            {/* Consultas guardadas */}
            <SavedQueriesList />
            
            {/* Filtro por Gravedad */}
            <FilterList label="Gravedad" icon={<LocalFireDepartmentIcon />}>
                <FilterListItem 
                    label="Crítica" 
                    value={{ 'atencion_emergencia.gravedad_emergencia': 'Critica' }} 
                />
                <FilterListItem 
                    label="Alta" 
                    value={{ 'atencion_emergencia.gravedad_emergencia': 'Alta' }} 
                />
                <FilterListItem 
                    label="Media" 
                    value={{ 'atencion_emergencia.gravedad_emergencia': 'Media' }} 
                />
                <FilterListItem 
                    label="Baja" 
                    value={{ 'atencion_emergencia.gravedad_emergencia': 'Baja' }} 
                />
            </FilterList>

            {/* Filtro por Tipo de Servicio */}
            <FilterList label="Tipo de Servicio" icon={<CategoryIcon />}>
                <FilterListItem 
                    label="Rescate Urbano" 
                    value={{ 'personal_y_activacion.tipo_servicio': 'Rescate Urbano' }} 
                />
                <FilterListItem 
                    label="Materiales Peligrosos" 
                    value={{ 'personal_y_activacion.tipo_servicio': 'Materiales Peligrosos' }} 
                />
                <FilterListItem 
                    label="Servicios Especiales" 
                    value={{ 'personal_y_activacion.tipo_servicio': 'Servicios Especiales' }} 
                />
            </FilterList>

            {/* Filtro por Modo de Activación */}
            <FilterList label="Modo de Activación" icon={<BuildIcon />}>
                <FilterListItem 
                    label="Emergencia" 
                    value={{ 'personal_y_activacion.modo_activacion': 'Emergencia' }} 
                />
                <FilterListItem 
                    label="Falsa Alarma" 
                    value={{ 'personal_y_activacion.modo_activacion': 'Falsa Alarma' }} 
                />
                <FilterListItem 
                    label="Servicio" 
                    value={{ 'personal_y_activacion.modo_activacion': 'Servicio' }} 
                />
            </FilterList>
        </CardContent>
    </Card>
);
