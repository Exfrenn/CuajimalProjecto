import { 
    Show, TabbedShowLayout, TextField, ReferenceField, DateField, 
    FunctionField, ArrayField, Datagrid, NumberField, Labeled,
    ReferenceArrayField,
    TabbedShowLayoutTabs,
    FileField
} from "react-admin";
import { Stack, Box, Chip, useMediaQuery, Theme } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import GavelIcon from '@mui/icons-material/Gavel';
import DrawIcon from '@mui/icons-material/Draw';
import WarningIcon from '@mui/icons-material/Warning';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { SectionCard } from "../../components/SectionCard";

export const ReportePrehospitalarioShow = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <Show>
            <TabbedShowLayout tabs={<TabbedShowLayoutTabs variant="scrollable" scrollButtons="auto" />}>
                <TabbedShowLayout.Tab label="Preámbulo">
                    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                        <Labeled label="Fecha">
                            <DateField source="preambulo.fecha" />
                        </Labeled>
                        <Labeled label="Folio">
                            <TextField source="preambulo.folio" />
                        </Labeled>
                    </Stack>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Datos del Servicio">
                    <SectionCard title="Cronometría" icon={<AccessTimeIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Hora de Llamada">
                                <DateField source="servicio.cronometro.hora_llamada" showTime showDate={false} />
                            </Labeled>
                            <Labeled label="Hora de Salida">
                                <DateField source="servicio.cronometro.hora_salida" showTime showDate={false} />
                            </Labeled>
                            <Labeled label="Hora de Llegada">
                                <DateField source="servicio.cronometro.hora_llegada" showTime showDate={false} />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Hora de Traslado">
                                <DateField source="servicio.cronometro.hora_traslado" showTime showDate={false} />
                            </Labeled>
                            <Labeled label="Hora Hospital">
                                <DateField source="servicio.cronometro.hora_hospital" showTime showDate={false} />
                            </Labeled>
                            <Labeled label="Salida Hospital">
                                <DateField source="servicio.cronometro.salida_hospital" showTime showDate={false} />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Hora Base">
                                <DateField source="servicio.cronometro.hora_base" showTime showDate={false} />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <Box sx={{ mt: 2 }}>
                        <Labeled label="Motivo de Atención">
                            <TextField source="servicio.motivo" />
                        </Labeled>
                    </Box>

                    <SectionCard title="Ubicación del Servicio" icon={<LocationOnIcon />}>
                        <Labeled label="Calle">
                            <TextField source="servicio.ubicacion.calle" />
                        </Labeled>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Intersección 1">
                                <TextField source="servicio.ubicacion.interseccion1" />
                            </Labeled>
                            <Labeled label="Intersección 2">
                                <TextField source="servicio.ubicacion.interseccion2" />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Colonia">
                                <TextField source="servicio.ubicacion.colonia" />
                            </Labeled>
                            <Labeled label="Alcaldía">
                                <TextField source="servicio.ubicacion.alcaldia" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Lugar de Ocurrencia">
                                <TextField source="servicio.ubicacion.lugar_ocurrencia" />
                            </Labeled>
                        </Box>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Longitud">
                                <TextField source="servicio.ubicacion.coordenadas.0" />
                            </Labeled>
                            <Labeled label="Latitud">
                                <TextField source="servicio.ubicacion.coordenadas.1" />
                            </Labeled>
                        </Stack>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Control">
                    <SectionCard title="Control de Unidad" icon={<LocalHospitalIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Número de Ambulancia">
                                <TextField source="control.ambulancia_numero" />
                            </Labeled>
                            <Labeled label="Helicóptero Matrícula">
                                <TextField source="control.helicoptero" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Operadores">
                            <ReferenceArrayField
                                reference="usuarios"
                                source="control.operador"
                                >
                                <Datagrid bulkActionButtons={false} rowClick="show">
                                    <FunctionField
                                        label="Nombre completo"
                                        render={record => `${record.nombre} ${record.apellido}`}
                                    />
                                    <ReferenceField source="rol_id" reference="roles" label="Rol" link={false}>
                                        <TextField source="nombre"/>
                                    </ReferenceField>
                                </Datagrid>
                            </ReferenceArrayField>
                            </Labeled>
                        </Box>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="T.U.M">
                                <TextField source="control.tum" />
                            </Labeled>
                            <Labeled label="Socorrista">
                                <TextField source="control.socorrista" />
                            </Labeled>
                        </Stack>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Datos del Paciente">
                    <SectionCard title="Información del Paciente" icon={<PersonIcon />}>
                        <Labeled label="Nombre del Paciente">
                            <TextField source="paciente.nombre" />
                        </Labeled>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Sexo">
                                <TextField source="paciente.sexo" />
                            </Labeled>
                            <Labeled label="Edad (años)">
                                <NumberField source="paciente.edad.anos" />
                            </Labeled>
                            <Labeled label="Edad (meses)">
                                <NumberField source="paciente.edad.meses" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Domicilio">
                                <TextField source="paciente.domicilio" />
                            </Labeled>
                        </Box>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Colonia/Comunidad">
                                <TextField source="paciente.colonia" />
                            </Labeled>
                            <Labeled label="Alcaldía/Municipio">
                                <TextField source="paciente.alcaldia" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Teléfono">
                                <TextField source="paciente.telefono" />
                            </Labeled>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Ocupación">
                                <TextField source="paciente.ocupacion" />
                            </Labeled>
                        </Box>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Parto">
                    <SectionCard title="Información de la Madre" icon={<PregnantWomanIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Semanas de gestación">
                                <NumberField source="parto.madre.semanas_gesta" />
                            </Labeled>
                            <Labeled label="Hora de inicio contracciones">
                                <DateField source="parto.madre.hora_inicio" showTime showDate={false} />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Frecuencia">
                                <TextField source="parto.madre.frecuencia" />
                            </Labeled>
                            <Labeled label="Duración">
                                <TextField source="parto.madre.duracion" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Información del Recién Nacido" icon={<LocalHospitalIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Hora de nacimiento">
                                <DateField source="parto.postparto.hora_nacimiento" showTime />
                            </Labeled>
                            <Labeled label="Placenta expulsada">
                                <TextField source="parto.postparto.placenta" />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Lugar">
                                <TextField source="parto.postparto.lugar" />
                            </Labeled>
                            <Labeled label="Producto">
                                <TextField source="parto.postparto.producto" />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Sexo del RN">
                                <TextField source="parto.postparto.sexo" />
                            </Labeled>
                            <Labeled label="Edad gestacional">
                                <TextField source="parto.edad_gestacional" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Evaluaciones APGAR" icon={<MonitorHeartIcon />}>
                        <ArrayField source="parto.evaluaciones_apgar">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="tiempo" label="Tiempo"/>
                                <NumberField source="color" label="Color"/>
                                <NumberField source="fc" label="FC"/>
                                <NumberField source="irritabilidad" label="Irritabilidad"/>
                                <NumberField source="tono" label="Tono"/>
                                <NumberField source="respiracion" label="Respiración"/>
                                <NumberField source="puntaje_total" label="Puntaje Total"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Causa Traumática">
                    <SectionCard title="Información del Trauma" icon={<WarningIcon />}>
                        <Labeled label="Agente causal">
                            <ReferenceField source="trauma.agente" reference="agentes_causal" link={false}>
                                <TextField source="nombre" />
                            </ReferenceField>
                        </Labeled>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Accidente automovilístico">
                                <TextField source="trauma.accidente_auto" />
                            </Labeled>
                            <Labeled label="Impacto">
                                <TextField source="trauma.impacto" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="CMS">
                                <TextField source="trauma.cms" />
                            </Labeled>
                        </Box>
                    </SectionCard>

                    <SectionCard title="Condiciones del Vehículo" icon={<DirectionsCarIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Parabrisas">
                                <TextField source="trauma.parabrisas" />
                            </Labeled>
                            <Labeled label="Volante">
                                <TextField source="trauma.volante" />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Bolsa de aire">
                                <TextField source="trauma.bolsa_aire" />
                            </Labeled>
                            <Labeled label="Cinturón de seguridad">
                                <TextField source="trauma.cinturon_seguridad" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Situación del Paciente" icon={<PersonIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Dentro del vehículo">
                                <TextField source="trauma.dentro_vehiculo" />
                            </Labeled>
                            <Labeled label="Atropellado">
                                <TextField source="trauma.atropellado" />
                            </Labeled>
                        </Stack>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Causa Clínica">
                    <SectionCard title="Origen Clínico" icon={<MedicalServicesIcon />}>
                        <Labeled label="Origen probable">
                            <ReferenceField source="clinica.origen" reference="origen_probable" link={false}>
                                <TextField source="nombre" />
                            </ReferenceField>
                        </Labeled>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="¿Primera vez?">
                                <TextField source="clinica.primera_vez" />
                            </Labeled>
                            <Labeled label="¿Subsecuente?">
                                <TextField source="clinica.subsecuente" />
                            </Labeled>
                        </Stack>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Evaluación Inicial">
                    <SectionCard title="Nivel de Consciencia" icon={<WarningIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Nivel de consciencia">
                                <TextField source="evaluacion_inicial.nivel_consciencia" />
                            </Labeled>
                            <Labeled label="Deglución">
                                <TextField source="evaluacion_inicial.deglucion" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Vía Aérea y Ventilación" icon={<MedicalServicesIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Vía aérea">
                                <TextField source="evaluacion_inicial.via_aerea" />
                            </Labeled>
                            <Labeled label="Ventilación">
                                <TextField source="evaluacion_inicial.ventilacion" />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Auscultación">
                                <TextField source="evaluacion_inicial.auscultacion" />
                            </Labeled>
                            <Labeled label="Hemitórax">
                                <TextField source="evaluacion_inicial.hemitorax" />
                            </Labeled>
                            <Labeled label="Sitio">
                                <TextField source="evaluacion_inicial.sitio" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Pulsos y Perfusión" icon={<MonitorHeartIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Presencia de pulsos">
                                <TextField source="evaluacion_inicial.pulsos.presencia" />
                            </Labeled>
                            <Labeled label="Calidad">
                                <TextField source="evaluacion_inicial.pulsos.calidad" />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Piel">
                                <TextField source="evaluacion_inicial.piel" />
                            </Labeled>
                            <Labeled label="Características">
                                <TextField source="evaluacion_inicial.caracteristicas" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Observaciones">
                                <TextField source="evaluacion_inicial.observaciones" />
                            </Labeled>
                        </Box>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Evaluación Secundaria">
                    <SectionCard title="Zonas de Lesión" icon={<WarningIcon />}>
                        <ArrayField source="evaluacion_secundaria.zonas_lesion">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="zona" label="Zona anatómica"/>
                                <TextField source="hallazgo" label="Hallazgo físico"/>
                                <DateField source="fecha" label="Fecha"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Evaluación Neurológica" icon={<MonitorHeartIcon />}>
                        <Labeled label="Pupilas">
                            <TextField source="evaluacion_secundaria.pupilas" />
                        </Labeled>
                    </SectionCard>

                    <SectionCard title="Signos Vitales y Monitoreo" icon={<MonitorHeartIcon />}>
                        <ArrayField source="evaluacion_secundaria.signos_vitales">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="hora" label="Hora"/>
                                <TextField source="fr" label="FR"/>
                                <TextField source="fc" label="FC"/>
                                <TextField source="tas" label="TAS"/>
                                <TextField source="tad" label="TAD"/>
                                <TextField source="sao2" label="SaO2"/>
                                <TextField source="gluc" label="Glucosa"/>
                                <TextField source="neuro" label="Neuro Test"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Escala de Glasgow" icon={<MonitorHeartIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Apertura ocular">
                                <TextField source="evaluacion_secundaria.glasgow_ocular" />
                            </Labeled>
                            <Labeled label="Respuesta motora">
                                <TextField source="evaluacion_secundaria.glasgow_motora" />
                            </Labeled>
                            <Labeled label="Respuesta verbal">
                                <TextField source="evaluacion_secundaria.glasgow_verbal" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Puntaje Total Glasgow">
                                <NumberField source="evaluacion_secundaria.glasgow"/>
                            </Labeled>
                        </Box>
                    </SectionCard>

                    <SectionCard title="Historial Médico (SAMPLE)" icon={<MedicalServicesIcon />}>
                        <Box sx={{ mb: 2 }}>
                            <Labeled label="Alergias">
                                <TextField source="evaluacion_secundaria.alergias" />
                            </Labeled>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Labeled label="Medicamentos">
                                <TextField source="evaluacion_secundaria.medicamentos" />
                            </Labeled>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Labeled label="Padecimientos/Cirugías">
                                <TextField source="evaluacion_secundaria.padecimientos" />
                            </Labeled>
                        </Box>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Última Comida">
                                <TextField source="evaluacion_secundaria.ultima_comida" />
                            </Labeled>
                            <Labeled label="Eventos Previos">
                                <TextField source="evaluacion_secundaria.eventos_previos" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Condición General" icon={<MonitorHeartIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Condición del Paciente">
                                <TextField source="evaluacion_secundaria.condicion" />
                            </Labeled>
                            <Labeled label="Prioridad">
                                <FunctionField
                                    source="evaluacion_secundaria.prioridad"
                                    render={(record: any) => {
                                        const prioridad = record?.evaluacion_secundaria?.prioridad;
                                        const colorMap: Record<string, 'error' | 'warning' | 'success' | 'default'> = {
                                            'Rojo': 'error',
                                            'Amarillo': 'warning',
                                            'Verde': 'success',
                                            'Negra': 'default'
                                        };
                                        return prioridad ? (
                                            <Chip 
                                                label={prioridad} 
                                                color={colorMap[prioridad] || 'default'}
                                                size="small"
                                            />
                                        ) : null;
                                    }}
                                />
                            </Labeled>
                        </Stack>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Traslado">
                    <SectionCard title="Institución de Destino" icon={<AirportShuttleIcon />}>
                        <Box sx={{ mb: 2 }}>
                            <Labeled label="Hospital">
                                <TextField source="traslado.hospital" />
                            </Labeled>
                        </Box>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Doctor que Recibe">
                                <TextField source="traslado.dr" />
                            </Labeled>
                            <Labeled label="Folio CRU">
                                <TextField source="traslado.folio_cru" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Negativa a recibir atención/ser trasladado">
                                <TextField source="traslado.negativa" />
                            </Labeled>
                        </Box>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Tratamiento">
                    <SectionCard title="Manejo de Vía Aérea" icon={<MedicalServicesIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Vía aérea">
                                <TextField source="tratamiento.via_aerea" />
                            </Labeled>
                            <Labeled label="Control Cervical">
                                <TextField source="tratamiento.control_cervical" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Asistencia Ventilatoria" icon={<MonitorHeartIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Tipo de Asistencia Ventilatoria">
                                <TextField source="tratamiento.asistencia_ventilatoria.tipo" />
                            </Labeled>
                            <Labeled label="Lts/min">
                                <NumberField source="tratamiento.asistencia_ventilatoria.ltsxmin" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Medicación Administrada" icon={<LocalPharmacyIcon />}>
                        <ArrayField source="tratamiento.asistencia_ventilatoria.medicacion">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <DateField source="hora" label="Hora" showTime showDate={false} />
                                <TextField source="medicamento" label="Medicamento"/>
                                <TextField source="dosis" label="Dosis"/>
                                <TextField source="via" label="Vía"/>
                            </Datagrid>
                        </ArrayField>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Dr. tratante">
                                <TextField source="tratamiento.dr_tratante" />
                            </Labeled>
                        </Box>
                    </SectionCard>

                    <SectionCard title="Control de Hemorragias" icon={<MedicalServicesIcon />}>
                        <Labeled label="Control de Hemorragias">
                            <TextField source="tratamiento.hemorragias" />
                        </Labeled>
                    </SectionCard>

                    <SectionCard title="Vías Venosas y Solución" icon={<LocalPharmacyIcon />}>
                        <ArrayField source="tratamiento.vias_venosas">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="tipo" label="Tipo de Solución"/>
                                <NumberField source="lineaIV" label="Línea IV #"/>
                                <NumberField source="cateter" label="Catéter #"/>
                                <NumberField source="cantidad" label="Cantidad"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Atención Básica" icon={<MedicalServicesIcon />}>
                        <Labeled label="Atención Básica">
                            <TextField source="tratamiento.atencion_basica" />
                        </Labeled>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Otros">
                    <SectionCard title="Observaciones" icon={<VisibilityIcon />}>
                        <Labeled label="Pertenencias">
                            <TextField source="observaciones.pertenencias" />
                        </Labeled>
                    </SectionCard>

                    <SectionCard title="Autoridades Presentes" icon={<GavelIcon />}>
                        <ArrayField source="legales.autoridades">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <ReferenceField source="institucion" reference="instituciones" label="Dependencia" link={false}>
                                    <TextField source="nombre"/>
                                </ReferenceField>
                                <TextField source="unidad" label="Unidad"/>
                                <TextField source="oficiales" label="N° de oficiales"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Vehículos Involucrados" icon={<AirportShuttleIcon />}>
                        <ArrayField source="legales.vehiculos">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="tipo" label="Tipo y marca"/>
                                <TextField source="placas" label="Placas"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Documento PDF">
                    <SectionCard title="PDF del Reporte" icon={<VisibilityIcon />}>
                        <Labeled label="Documento PDF">
                            <FileField source="documento_pdf.src" title="documento_pdf.title" target="_blank" />
                        </Labeled>
                    </SectionCard>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    );
};