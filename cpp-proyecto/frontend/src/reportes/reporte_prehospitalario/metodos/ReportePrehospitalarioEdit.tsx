import { Edit, TabbedForm, TextInput, DateInput, NumberInput, SelectInput, ArrayInput, 
    SimpleFormIterator, required, DateTimeInput, TimeInput, FileInput, FileField, TabbedFormTabs, 
    minLength, maxLength, regex } from "react-admin";

import { useReporteNotifications } from "../hooks/useReporteNotifications";
import { OperadorPrehospitalario } from "../../componentes/OperadorPrehospitalario";
import { TurnoInput } from "../../componentes/TurnoInput";
import BotonSoloCoordenadas from "../misc/BotonSoloCoordenadas";
import TablaApgar from "../misc/TablaApgar";
import { Stack, Box, useMediaQuery, Theme } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import WarningIcon from '@mui/icons-material/Warning';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { SectionCard } from "../../components/SectionCard";
import { GlasgowTotal } from "../misc/GlasgowTotal";

import { atencionChoices, alcaldiasCDMX, accidentesChoices, impactoChoices, 
        exploracionFisicaChoices, glasgowMotoraChoices, glasgowOcularChoices, glasgowVerbalChoices, 
        viaAereaChoices, asistenciaVentilatoriaChoices, controlHemorragiasChoices, viasVenosasChoices, 
        atencionBasicaChoices, sexoChoices, productoChoices, parabrisasChoices, volanteChoices, booleanChoices, 
        cinturonChoices, vehiculoChoices, atropelladoChoices, nivelConscienciaChoices, deglucionChoices, 
        viaAereaDisponibilidadChoices, ventilacionChoices, auscultacionChoices, hemitoraxChoices, sitioChoices, 
        pulsoChoices, calidadChoices, pielChoices, caracteristicasChoices, pupilasChoices, neuroChoices, 
        condicionPacienteChoices, prioridadChoices, controlCervicalChoices } from "../../data/choices";
import { ReportePrehospitalarioEditMobile } from "./ReportePrehospitalarioEditMobile";
import { LugarOcurrenciaInput, AgenteCausalInput, OrigenProbableInput, InstitucionInput } from "./customInputs";
import { Fullscreen } from "@mui/icons-material";


export const ReportePrehospitalarioEdit = () => {
    const { onEditSuccess } = useReporteNotifications();
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const validateLimit = (max: number) => [
        required('El nombre es obligatorio'),
        minLength(2, 'El nombre debe tener al menos 2 caracteres'),
        maxLength(max, `El nombre no puede exceder ${max} caracteres`),
        regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
    ];

    return (
        <Edit mutationOptions={{ onSuccess: onEditSuccess }} 
>  
            {isSmall ? ( <ReportePrehospitalarioEditMobile/>) : (
                <TabbedForm warnWhenUnsavedChanges tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />}>

                {/* PREÁMBULO */}
                <TabbedForm.Tab label="Preambulo">
                    <DateTimeInput source="preambulo.fecha" label="Fecha" />
                    <TurnoInput source="preambulo.turno_id" label="Turno" />
                    <TextInput source="preambulo.folio" label="Folio" fullWidth validate={required()} />
                </TabbedForm.Tab>

                {/* I. DATOS DEL SERVICIO */}
                <TabbedForm.Tab label="Datos del Servicio">
                    <SectionCard title="Cronometría" icon={<AccessTimeIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <TimeInput source="servicio.cronometro.hora_llamada" label="Hora de llamada" sx={{ flex: 1 }} />
                            <TimeInput source="servicio.cronometro.hora_salida" label="Hora de salida" sx={{ flex: 1 }} />
                            <TimeInput source="servicio.cronometro.hora_llegada" label="Hora de llegada" sx={{ flex: 1 }} />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TimeInput source="servicio.cronometro.hora_traslado" label="Hora de traslado" sx={{ flex: 1 }} />
                            <TimeInput source="servicio.cronometro.hora_hospital" label="Hora hospital" sx={{ flex: 1 }} />
                            <TimeInput source="servicio.cronometro.salida_hospital" label="Salida hospital" sx={{ flex: 1 }} />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TimeInput source="servicio.cronometro.hora_base" label="Hora base" sx={{ flex: 1 }} />
                        </Stack>
                    </SectionCard>

                    <SelectInput source="servicio.motivo" label="Motivo de atención" choices={atencionChoices} validate={required()} fullWidth />

                    <SectionCard title="Ubicación del Servicio" icon={<LocationOnIcon />}>
                        <TextInput source="servicio.ubicacion.calle" label="Calle" fullWidth helperText= {"Maximo de 50 caracteres"} validate={validateLimit(50)} />
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TextInput source="servicio.ubicacion.interseccion1" label="Intersección 1" sx={{ flex: 1 }} helperText= {"Maximo de 40 caracteres"} validate={validateLimit(40)} />
                            <TextInput source="servicio.ubicacion.interseccion2" label="Intersección 2" sx={{ flex: 1 }} helperText= {"Maximo de 50 caracteres"} validate={validateLimit(50)} />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TextInput source="servicio.ubicacion.colonia" label="Colonia/Comunidad" sx={{ flex: 1 }} helperText= {"Maximo de 60 caracteres"} validate={validateLimit(60)} />
                            <SelectInput source="servicio.ubicacion.alcaldia" label="Alcaldía" choices={alcaldiasCDMX} validate={required()} sx={{ flex: 1 }} />
                        </Stack>
                        <LugarOcurrenciaInput/>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <NumberInput source="servicio.ubicacion.coordenadas.0" label="Longitud" sx={{ flex: 1 }} />
                            <NumberInput source="servicio.ubicacion.coordenadas.1" label="Latitud" sx={{ flex: 1 }} />
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <BotonSoloCoordenadas/>
                        </Box>
                    </SectionCard>
                </TabbedForm.Tab>

                {/* II. CONTROL */}
                <TabbedForm.Tab label="Control">
                    <TextInput source="control.ambulancia_numero" label="Número de Ambulancia" />

                    <OperadorPrehospitalario />
                    
                    <TextInput source="control.tum" label="T.U.M" />
                    <TextInput source="control.socorrista" label="Socorrista" />
                    <TextInput source="control.helicoptero" label="Helicóptero Matrícula" />
                </TabbedForm.Tab>

                {/* III. DATOS DEL PACIENTE */}
                <TabbedForm.Tab label="Datos del Paciente">
                    <SectionCard title="Información del Paciente" icon={<PersonIcon />}>
                        <TextInput source="paciente.nombre" label="Nombre del paciente" fullWidth helperText= {"Maximo de 65 caracteres"} validate={validateLimit(65)} />
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <SelectInput
                                source="paciente.sexo"
                                label="Sexo"
                                choices={sexoChoices}
                                sx={{ flex: 1 }}
                            />
                            <NumberInput source="paciente.edad.anos" label="Edad (años)" sx={{ flex: 1 }} />
                            <NumberInput source="paciente.edad.meses" label="Edad (meses)" sx={{ flex: 1 }} />
                        </Stack>
                        <TextInput source="paciente.domicilio" label="Domicilio" fullWidth sx={{ mt: 2 }} />
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TextInput source="paciente.colonia" label="Colonia/Comunidad" sx={{ flex: 1 }} />
                            <TextInput source="paciente.alcaldia" label="Alcaldía/Municipio" sx={{ flex: 1 }} />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TextInput source="paciente.derechohabiente" label="Derechohabiente a" sx={{ flex: 1 }} />
                            <TextInput source="paciente.telefono" label="Teléfono" sx={{ flex: 1 }} />
                        </Stack>
                        <TextInput source="paciente.ocupacion" label="Ocupación" fullWidth sx={{ mt: 2 }} />
                    </SectionCard>
                </TabbedForm.Tab>

                {/* IV. PARTO */}
                <TabbedForm.Tab label="Parto">
                    <SectionCard title="Información de la Madre" icon={<PregnantWomanIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <NumberInput source="parto.madre.semanas_gesta" label="Semanas de gesta" sx={{ flex: 1 }} />
                            <TimeInput source="parto.madre.hora_inicio" label="Hora de inicio contracciones" sx={{ flex: 1 }} />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TextInput source="parto.madre.frecuencia" label="Frecuencia" sx={{ flex: 1 }} />
                            <TextInput source="parto.madre.duracion" label="Duración" sx={{ flex: 1 }} />
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Información del Recién Nacido" icon={<LocalHospitalIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <DateTimeInput source="parto.postparto.hora_nacimiento" label="Hora de nacimiento" sx={{ flex: 1 }} />
                            <TextInput source="parto.postparto.placenta" label="Placenta expulsada" sx={{ flex: 1 }} />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TextInput source="parto.postparto.lugar" label="Lugar" sx={{ flex: 1 }} />
                            <SelectInput
                                source="parto.postparto.producto"
                                label="Producto"
                                choices={productoChoices}
                                sx={{ flex: 1 }}
                            />
                        </Stack>
                        <SelectInput
                            source="parto.postparto.sexo"
                            label="Sexo del RN"
                            choices={sexoChoices}
                            sx={{ mt: 2 }}
                        />
                        <TextInput source="parto.edad_gestacional" label="Edad gestacional" fullWidth sx={{ mt: 2 }} />
                        <Box sx={{ mt: 2 }}>
                            <TablaApgar />
                        </Box>
                    </SectionCard>
                </TabbedForm.Tab>

                {/* V. CAUSA TRAUMÁTICA */}
                <TabbedForm.Tab label="Causa Traumatica">
                    <SectionCard title="Información del Trauma" icon={<WarningIcon />}>
                        <AgenteCausalInput/>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput 
                                source="trauma.accidente_auto" 
                                label="Accidente automovilístico" 
                                choices={accidentesChoices} 
                                validate={required()}
                                fullWidth
                            />
                            <SelectInput 
                                source="trauma.impacto" 
                                label="Impacto" 
                                choices={impactoChoices} 
                                validate={required()}
                                fullWidth
                            />
                        </Stack>
                        <TextInput source="trauma.cms" label="CMS" fullWidth/>
                    </SectionCard>

                    <SectionCard title="Condiciones del Vehículo" icon={<DirectionsCarIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput 
                                source="trauma.parabrisas" 
                                label="Parabrisas" 
                                validate={required()}
                                choices={parabrisasChoices}
                                fullWidth
                            />
                            <SelectInput 
                                source="trauma.volante" 
                                label="Volante" 
                                validate={required()}
                                choices={volanteChoices}
                                fullWidth
                            />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput 
                                source="trauma.bolsa_aire" 
                                label="Bolsa de aire" 
                                validate={required()}
                                choices={booleanChoices}
                                fullWidth
                            />
                            <SelectInput 
                                source="trauma.cinturon_seguridad" 
                                label="Cinturón de seguridad" 
                                validate={required()}
                                choices={cinturonChoices}
                                fullWidth
                            />
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Situación del Paciente" icon={<PersonIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput 
                                source="trauma.dentro_vehiculo" 
                                label="Dentro del vehículo" 
                                validate={required()}
                                choices={vehiculoChoices}
                                fullWidth
                            />
                            <SelectInput 
                                source="trauma.atropellado" 
                                label="Atropellado" 
                                validate={required()}
                                choices={atropelladoChoices}
                                fullWidth
                            />
                        </Stack>
                    </SectionCard>
                </TabbedForm.Tab>

                {/* VI. CAUSA CLÍNICA */}
                <TabbedForm.Tab label="Causa Clinica">
                    <SectionCard title="Origen Clínico" icon={<MedicalServicesIcon />}>
                        <OrigenProbableInput/>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput
                                source="clinica.primera_vez"
                                label="¿Primera vez?"
                                choices={booleanChoices}
                                fullWidth
                            />
                            <SelectInput
                                source="clinica.subsecuente"
                                label="¿Subsecuente?"
                                choices={booleanChoices}
                                fullWidth
                            />
                        </Stack>
                    </SectionCard>
                </TabbedForm.Tab>

                {/* VII. EVALUACIÓN INICIAL */}
                <TabbedForm.Tab label="Evaluacion Inicial">
                    <SelectInput source="evaluacion_inicial.nivel_consciencia" label="Nivel de consciencia" 
                        choices={nivelConscienciaChoices}

                    />
                    <SelectInput source="evaluacion_inicial.deglucion" label="Deglución" 
                        choices={deglucionChoices}
                    />
                    <SelectInput source="evaluacion_inicial.via_aerea" label="Vía aérea" 
                        choices={viaAereaDisponibilidadChoices}
                    />
                    <SelectInput source="evaluacion_inicial.ventilacion" label="Ventilación" 
                        choices={ventilacionChoices}
                    
                    />
                    <SelectInput source="evaluacion_inicial.auscultacion" label="Auscultación" 
                        choices={auscultacionChoices}
                    />
                    <SelectInput source="evaluacion_inicial.hemitorax" label="Hemitórax" 
                    choices={hemitoraxChoices}
                    
                    />
                    <SelectInput source="evaluacion_inicial.sitio" label="Sitio" 
                    choices={sitioChoices}
                    
                    />
                    <SelectInput source="evaluacion_inicial.pulsos.presencia" label="Presencia de pulsos" 
                    choices={pulsoChoices}
                    />
                    <SelectInput source="evaluacion_inicial.pulsos.calidad" label="Calidad" 
                    choices={calidadChoices}
                    />
                    <SelectInput source="evaluacion_inicial.piel" label="Piel" 
                    choices={pielChoices}
                    
                    />
                    <SelectInput source="evaluacion_inicial.caracteristicas" label="Características" 
                    choices={caracteristicasChoices}
                    />
                    <TextInput source="evaluacion_inicial.observaciones" label="Observaciones adicionales" fullWidth />
                </TabbedForm.Tab>

                {/* VIII. EVALUACIÓN SECUNDARIA */}
                <TabbedForm.Tab label="Evaluacion Secundaria    ">
                    <ArrayInput source="evaluacion_secundaria.zonas_lesion" label="Zonas de lesión">
                        <SimpleFormIterator>
                            <TextInput source="zona" label="Zona anatómica" />
                            <SelectInput
                                source="hallazgo"
                                label="Hallazgo físico"
                                choices={exploracionFisicaChoices}
                                fullWidth
                            />
                            <DateInput source="fecha" label="Fecha" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <SelectInput source="evaluacion_secundaria.pupilas" label="Pupilas" choices={pupilasChoices}/>
                    <ArrayInput source="evaluacion_secundaria.signos_vitales" label="Signos vitales y monitoreo">
                        <SimpleFormIterator>
                            <TimeInput source="hora" label="Hora" />
                            <TextInput source="fr" label="FR" />
                            <TextInput source="fc" label="FC" />
                            <TextInput source="tas" label="TAS" />
                            <TextInput source="tad" label="TAD" />
                            <TextInput source="sao2" label="SaO₂" />
                            <TextInput source="gluc" label="Glucosa" />
                            <SelectInput source="neuro" label="Neuro Test" choices={neuroChoices}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                        <SelectInput
                            source="evaluacion_secundaria.glasgow_ocular"
                            label="Apertura ocular"
                            choices={glasgowOcularChoices}
                        />
                        <SelectInput
                            source="evaluacion_secundaria.glasgow_motora"
                            label="Respuesta motora"
                            choices={glasgowMotoraChoices}
                        />
                        <SelectInput
                            source="evaluacion_secundaria.glasgow_verbal"
                            label="Respuesta verbal"
                            choices={glasgowVerbalChoices}
                            />

                    <GlasgowTotal />
                    <TextInput source="evaluacion_secundaria.alergias" label="Alergias" />
                    <TextInput source="evaluacion_secundaria.medicamentos" label="Medicamentos" />
                    <TextInput source="evaluacion_secundaria.padecimientos" label="Padecimientos / Cirugías" />
                    <TextInput source="evaluacion_secundaria.ultima_comida" label="Última comida" />
                    <TextInput source="evaluacion_secundaria.eventos_previos" label="Eventos previos" />
                    <SelectInput source="evaluacion_secundaria.condicion" label="Condición del paciente" choices={condicionPacienteChoices}/>
                    <SelectInput source="evaluacion_secundaria.prioridad" label="Prioridad" choices={prioridadChoices}/>
                </TabbedForm.Tab>

                {/* IX. TRASLADO */}
                <TabbedForm.Tab label="Traslados">
                    <TextInput source="traslado.hospital" label="Hospital" />
                    <TextInput source="traslado.dr" label="Doctor" />
                    <TextInput source="traslado.folio_cru" label="Folio CRU" />
                    <SelectInput source="traslado.negativa" label="Negativa a recibir atencion/ser trasladado" choices={booleanChoices}/>
                </TabbedForm.Tab>

                {/* X. TRATAMIENTO */}
                <TabbedForm.Tab label="Tratamiento">
                    <SelectInput source="tratamiento.via_aerea" label="Vía aérea" choices={viaAereaChoices}/>
                    <SelectInput source="tratamiento.control_cervical" label="Control cervical" choices={controlCervicalChoices}/>

                    <SelectInput
                        source="tratamiento.asistencia_ventilatoria.tipo"
                        label="Asistencia ventilatoria"
                        choices={asistenciaVentilatoriaChoices}
                        fullWidth
                    />
                    <NumberInput source="tratamiento.asistencia_ventilatoria.ltsxmin" label="LTS X MIN"/>
                    <ArrayInput source="tratamiento.asistencia_ventilatoria.medicacion" label="Medicación administrada">
                        <SimpleFormIterator>
                            <TimeInput source="hora" label="Hora" />
                            <TextInput source="medicamento" label="Medicamento" />
                            <TextInput source="dosis" label="Dosis" />
                            <TextInput source="via" label="Vía administración" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <TextInput source="tratamiento.dr_tratante" label="Dr. tratante" />
                    <SelectInput source="tratamiento.hemorragias" label="Control de hemorragias" choices={controlHemorragiasChoices}/>
                    <ArrayInput source="tratamiento.vias_venosas" label="Vías venosas y solución">
                        <SimpleFormIterator>
                            <SelectInput source="tipo" label="Tipo de solución" choices={viasVenosasChoices}/>
                            <NumberInput source="lineaIV" label="Linea IV #" />
                            <NumberInput source="cateter" label="Catéter #" />
                            <NumberInput source="cantidad" label="Cantidad" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <SelectInput source="tratamiento.atencion_basica" label="Atención básica" choices={atencionBasicaChoices} fullWidth />
                </TabbedForm.Tab>

                {/* XI–XVI */}
                <TabbedForm.Tab label="Otros">
                    <TextInput source="observaciones.pertenencias" label="Pertenencias" fullWidth />
                    <ArrayInput source="legales.autoridades" label="Autoridades">
                        <SimpleFormIterator>
                            <InstitucionInput/>
                            <TextInput source="unidad" label="Unidad" />
                            <TextInput source="oficiales" label="N° de los oficiales" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="legales.vehiculos" label="Vehículos involucrados">
                        <SimpleFormIterator>
                            <TextInput source="tipo" label="Tipo y marca" />
                            <TextInput source="placas" label="Placas" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    
                </TabbedForm.Tab>
                <TabbedForm.Tab label="Documento PDF">
                    <FileInput
                        source="documento_pdf"
                        label="Subir PDF"
                        removeIcon={RemoveCircleIcon}
                        accept={{ 'application/pdf': ['.pdf'] }}
                        multiple={false}
                        maxSize={5000000} // opcional: 5MB
                    >
                        <FileField source="src" title="title" />
                    </FileInput>
                </TabbedForm.Tab>
            </TabbedForm>
            )}
        </Edit>
    );
};