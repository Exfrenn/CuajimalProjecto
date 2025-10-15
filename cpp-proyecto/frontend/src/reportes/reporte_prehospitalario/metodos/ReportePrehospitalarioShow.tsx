import { 
    Show, TabbedShowLayout, TextField, ReferenceField, DateField, 
    FunctionField, ArrayField, Datagrid, NumberField, Labeled
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
import { SectionCard } from "../../components/SectionCard";

export const ReportePrehospitalarioShow = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <Show>
            <TabbedShowLayout>
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
                                <TextField source="control.operador" />
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
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Derechohabiente a">
                                <TextField source="paciente.derechohabiente" />
                            </Labeled>
                            <Labeled label="Teléfono">
                                <TextField source="paciente.telefono" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Ocupación">
                                <TextField source="paciente.ocupacion" />
                            </Labeled>
                        </Box>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Evaluación Inicial">
                    <SectionCard title="Evaluación Primaria" icon={<WarningIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Piel">
                                <TextField source="evaluacion_inicial.piel" />
                            </Labeled>
                            <Labeled label="Características">
                                <TextField source="evaluacion_inicial.caracteristicas" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Comentario">
                                <TextField source="evaluacion_inicial.comentario" />
                            </Labeled>
                        </Box>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Evaluación Secundaria">
                    <SectionCard title="Exploración Física" icon={<VisibilityIcon />}>
                        <Labeled label="Exploración Física">
                            <TextField source="evaluacion_secundaria.exploracion_fisica" />
                        </Labeled>
                    </SectionCard>

                    <SectionCard title="Zonas de Lesión" icon={<WarningIcon />}>
                        <ArrayField source="evaluacion_secundaria.zonas_lesion">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="nombre" label="Zona"/>
                                <TextField source="asunto" label="Lesión"/>
                                <DateField source="fecha" label="Fecha"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Evaluación Neurológica" icon={<MonitorHeartIcon />}>
                        <Labeled label="Pupilas">
                            <TextField source="evaluacion_secundaria.pupilas" />
                        </Labeled>
                    </SectionCard>

                    <SectionCard title="Signos Vitales" icon={<MonitorHeartIcon />}>
                        <ArrayField source="evaluacion_secundaria.signos_vitales">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="hora" label="Hora"/>
                                <NumberField source="fr" label="FR"/>
                                <NumberField source="fc" label="FC"/>
                                <NumberField source="tas" label="TAS"/>
                                <NumberField source="tad" label="TAD"/>
                                <NumberField source="sao2" label="SaO2"/>
                                <NumberField source="gluc" label="Glucosa"/>
                                <TextField source="neuro_test" label="Neuro Test"/>
                                <NumberField source="glasgow" label="Glasgow"/>
                            </Datagrid>
                        </ArrayField>
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
                                <TextField source="evaluacion_secundaria.padecimientos_cirugias" />
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
                                <TextField source="evaluacion_secundaria.condicion_paciente" />
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
                                <TextField source="traslado.institucion.hospital" />
                            </Labeled>
                        </Box>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Doctor que Recibe">
                                <TextField source="traslado.institucion.doctor_recibe" />
                            </Labeled>
                            <Labeled label="Folio CRU">
                                <TextField source="traslado.institucion.folio_cru" />
                            </Labeled>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Labeled label="Negativa de Atención">
                                <TextField source="traslado.institucion.negativa_atencion" />
                            </Labeled>
                        </Box>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Tratamiento">
                    <SectionCard title="Manejo de Vía Aérea" icon={<MedicalServicesIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Manejo de Vía Aérea">
                                <TextField source="tratamiento.via_aerea_manejo" />
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
                                <NumberField source="tratamiento.asistencia_ventilatoria.lts_min" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Medicamentos Aplicados" icon={<LocalPharmacyIcon />}>
                        <ArrayField source="tratamiento.medicamentos">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="medicamento" label="Medicamento"/>
                                <TextField source="dosis" label="Dosis"/>
                                <TextField source="via" label="Vía"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Control de Hemorragias" icon={<MedicalServicesIcon />}>
                        <Labeled label="Control de Hemorragias">
                            <TextField source="tratamiento.control_hemorragias" />
                        </Labeled>
                    </SectionCard>

                    <SectionCard title="Vías Venosas" icon={<LocalPharmacyIcon />}>
                        <ArrayField source="tratamiento.vias_venosas">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="tipo_solucion" label="Tipo de Solución"/>
                                <NumberField source="cateter_n" label="Catéter N°"/>
                                <NumberField source="cantidad_ml" label="Cantidad (ml)"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Otros Procedimientos" icon={<MedicalServicesIcon />}>
                        <Box sx={{ mb: 2 }}>
                            <Labeled label="Atención Básica">
                                <TextField source="tratamiento.atencion_basica" />
                            </Labeled>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Labeled label="Observaciones/Pertenencias">
                                <TextField source="tratamiento.observaciones_pertenencias" />
                            </Labeled>
                        </Box>
                        <Box>
                            <Labeled label="Ministerio Público">
                                <TextField source="tratamiento.ministerio_publico" />
                            </Labeled>
                        </Box>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Datos Legales">
                    <SectionCard title="Autoridades Presentes" icon={<GavelIcon />}>
                        <ArrayField source="datos_legales.autoridades">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="dependencia" label="Dependencia"/>
                                <TextField source="numero_unidad" label="Número de Unidad"/>
                                <NumberField source="numero_oficiales" label="Número de Oficiales"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>

                    <SectionCard title="Vehículos Involucrados" icon={<AirportShuttleIcon />}>
                        <ArrayField source="datos_legales.vehiculos_involucrados">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <TextField source="tipo_marca" label="Tipo/Marca"/>
                                <TextField source="placas" label="Placas"/>
                            </Datagrid>
                        </ArrayField>
                    </SectionCard>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Firmas y Adicionales">
                    <SectionCard title="Firmas" icon={<DrawIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Firma del Paciente">
                                <TextField source="firmas.paciente" />
                            </Labeled>
                            <Labeled label="Firma del Testigo">
                                <TextField source="firmas.testigo" />
                            </Labeled>
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <Labeled label="Firma del Paramédico">
                                <TextField source="firmas.paramedico" />
                            </Labeled>
                            <Labeled label="Firma del Médico que Recibe">
                                <TextField source="firmas.medico_recibe" />
                            </Labeled>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Información Adicional" icon={<LocalHospitalIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Labeled label="Reporte Escaneado">
                                <TextField source="adicionales.reporte_escaneado" />
                            </Labeled>
                            <Labeled label="Turno">
                                <ReferenceField source="adicionales.turnoId" reference="turnos">
                                    <TextField source="nombre"/>
                                </ReferenceField>
                            </Labeled>
                        </Stack>
                    </SectionCard>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    );
};