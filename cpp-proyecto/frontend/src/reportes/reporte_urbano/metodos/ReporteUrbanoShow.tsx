// reportes/reporte_urbano/components/ReporteUrbanoShow.tsx
import { 
    Show, TabbedShowLayout, TextField, ReferenceField, DateField, 
    FunctionField, ArrayField, Datagrid, NumberField,
    ReferenceArrayField, Labeled,
    TabbedShowLayoutTabs,
    SimpleList
} from "react-admin";

import { Stack, Box, useMediaQuery, Theme, Divider, ImageList, ImageListItem } from "@mui/material";
import { SectionCard } from "../../components/SectionCard";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import GavelIcon from '@mui/icons-material/Gavel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ClickableImage from "./ClickableImage";


const FotosField = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <ArrayField source="fotos" label="Fotos">
            <ImageList cols={isSmall ? 2 : 4} gap={8}>
                <FunctionField
                    render={(record: any) => record.fotos.map((foto: any, index: number) => (
                        <ImageListItem key={index}>
                            <ClickableImage src={foto.src} title={foto.title || 'Foto'} />
                        </ImageListItem>
                    ))}
                />
            </ImageList>
        </ArrayField>
    );
};

export const ReporteUrbanoShow = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <Show>
            <TabbedShowLayout spacing={2} divider={<Divider flexItem />} tabs={<TabbedShowLayoutTabs variant="scrollable" scrollButtons="auto" />}>
                <TabbedShowLayout.Tab label="Datos Generales">
                    <SectionCard title="Información del Reporte" icon={<AccessTimeIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Día">
                                <DateField source="datos_generales.fecha" locales="es-MX" options={{weekday: 'long'}}/>
                            </Labeled>
                            <Labeled label="Fecha">
                                <DateField source="datos_generales.fecha"/>
                            </Labeled>
                            <Labeled label="Hora">
                                <DateField source="datos_generales.fecha" locales="es-MX" showDate={false} showTime/>
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Folio">
                                <TextField source="datos_generales.folio"/>
                            </Labeled>
                            <Labeled label="Turno">
                                <ReferenceField source="datos_generales.turno_id" reference="turnos" link={false}>
                                    <TextField source="nombre"/>
                                </ReferenceField>
                            </Labeled>
                        </Stack>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Personal y Activación">
                    <SectionCard title="Personal a Cargo" icon={<GroupIcon />}>
                        <ReferenceArrayField reference="usuarios" source="personal_y_activacion.personal_a_cargo">
                            {isSmall ? (
                                <SimpleList
                                    primaryText={record => `${record.nombre} ${record.apellido}`}
                                    secondaryText={record => record.rol?.nombre || ''}
                                    linkType="show"
                                />
                            ) : (
                                <Datagrid bulkActionButtons={false} rowClick="show" optimized>
                                    <FunctionField label="Nombre completo" render={record => `${record.nombre} ${record.apellido}`} />
                                    <ReferenceField source="rol_id" reference="roles" label="Rol" link={false}>
                                        <TextField source="nombre"/>
                                    </ReferenceField>
                                </Datagrid>
                            )}
                        </ReferenceArrayField>
                    </SectionCard>

                    <SectionCard title="Activación del Servicio" icon={<LocalFireDepartmentIcon />}>
                        <Box sx={{ mb: 2 }}>
                            <Labeled label="Modo de Activación">
                                <TextField source="personal_y_activacion.modo_activacion"/>
                            </Labeled>
                        </Box>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Tipo de Servicio">
                                <TextField source="personal_y_activacion.tipo_servicio"/>
                            </Labeled>
                            <Labeled label="Subtipo de Servicio">
                                <TextField source="personal_y_activacion.subtipo_servicio"/>
                            </Labeled>
                        </Stack>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Atención de Emergencia">
                    <SectionCard title="Tiempo y Distancia" icon={<AccessTimeIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Fecha y Hora de Atención">
                                <DateField source="atencion_emergencia.fecha_hora_atencion" showTime/>
                            </Labeled>
                            <Labeled label="Tiempo de Traslado (min)">
                                <NumberField source="atencion_emergencia.tiempo_traslado_minutos"/>
                            </Labeled>
                            <Labeled label="Kilómetros Recorridos">
                                <NumberField source="atencion_emergencia.km_recorridos"/>
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Ubicación del Servicio" icon={<LocationOnIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Calle">
                                <TextField source="atencion_emergencia.ubicacion.calle"/>
                            </Labeled>
                            <Labeled label="Colonia">
                                <TextField source="atencion_emergencia.ubicacion.colonia"/>
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Alcaldía">
                                <TextField source="atencion_emergencia.ubicacion.alcaldia"/>
                            </Labeled>
                            <Labeled label="Código Postal">
                                <TextField source="atencion_emergencia.ubicacion.codigo_postal"/>
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Estado">
                                <TextField source="atencion_emergencia.ubicacion.estado"/>
                            </Labeled>
                            <Labeled label="Municipio">
                                <TextField source="atencion_emergencia.ubicacion.municipio"/>
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Coordenadas">
                                <FunctionField 
                                    source="atencion_emergencia.ubicacion.coordenadas"
                                    render={record => 
                                        record.atencion_emergencia?.ubicacion?.coordenadas ? 
                                        `${record.atencion_emergencia.ubicacion.coordenadas[1]}, ${record.atencion_emergencia.ubicacion.coordenadas[0]}`
                                        : ''
                                    }
                                />
                            </Labeled>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Referencia de Ubicación">
                                <TextField source="atencion_emergencia.ubicacion.referencia"/>
                            </Labeled>
                        </Box>
                    </SectionCard>

                    <SectionCard title="Gravedad" icon={<LocalFireDepartmentIcon />}>
                        <Labeled label="Gravedad de la Emergencia">
                            <TextField source="atencion_emergencia.gravedad_emergencia"/>
                        </Labeled>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Acciones Realizadas">
                    <SectionCard title="Trabajos Realizados" icon={<BuildIcon />}>
                        <Box sx={{ mb: 2 }}>
                            <Labeled label="Trabajos Realizados">
                                <TextField source="acciones_realizadas.trabajos_realizados"/>
                            </Labeled>
                        </Box>
                        <Box>
                            <Labeled label="Conclusión/Dictamen">
                                <TextField source="acciones_realizadas.conclusion_dictamen"/>
                            </Labeled>
                        </Box>
                    </SectionCard>
                    
                    <SectionCard title="Observaciones y Fotografías" icon={<CameraAltIcon />}>
                        <ArrayField source="acciones_realizadas.observaciones">
                            {isSmall ? (
                                <SimpleList
                                    primaryText={record => record.texto}
                                    secondaryText={() => <FotosField />} // Usamos el componente personalizado aquí
                                    linkType={false}
                                />
                            ) : (
                                <Datagrid bulkActionButtons={false} rowClick={false} optimized>
                                    <TextField source="texto" label="Observación"/>
                                    <FotosField />
                                </Datagrid>
                            )}
                        </ArrayField>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Responsables y Autoridades">
                    <SectionCard title="Responsables" icon={<GroupIcon />}>
                        <ArrayField source="responsables_y_autoridades.responsables">
                            {isSmall ? (
                                <SimpleList
                                    primaryText={record => record.nombre}
                                    secondaryText={record => `Relación: ${record.relacion}`}
                                    tertiaryText={record => `Tel: ${record.telefono}`}
                                    linkType={false}
                                />
                            ) : (
                                <Datagrid bulkActionButtons={false} rowClick={false} optimized>
                                    <TextField source="relacion" label="Relación"/>
                                    <TextField source="nombre" label="Nombre"/>
                                    <TextField source="telefono" label="Teléfono"/>
                                    <TextField source="direccion" label="Dirección"/>
                                    <TextField source="identificacion" label="Identificación"/>
                                </Datagrid>
                            )}
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Autoridades Participantes" icon={<GavelIcon />}>
                        <ArrayField source="responsables_y_autoridades.autoridades_participantes">
                            {isSmall ? (
                                <SimpleList
                                    primaryText={record => record.responsable}
                                    secondaryText={record => (
                                        <ReferenceField record={record} source="institucion" reference="instituciones" link={false}>
                                            <TextField source="nombre" />
                                        </ReferenceField>
                                    )}
                                    tertiaryText={record => `Unidad: ${record.unidad} - Matrícula: ${record.matricula}`}
                                    linkType={false}
                                />
                            ) : (
                                <Datagrid bulkActionButtons={false} rowClick={false} optimized>
                                    <ReferenceField source="institucion" reference="instituciones">
                                        <TextField source="nombre" label="Institución"/>
                                    </ReferenceField>
                                    <TextField source="unidad" label="Unidad"/>
                                    <TextField source="responsable" label="Responsable"/>
                                    <TextField source="matricula" label="Matrícula"/>
                                </Datagrid>
                            )}
                        </ArrayField>
                    </SectionCard>

                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    );
};