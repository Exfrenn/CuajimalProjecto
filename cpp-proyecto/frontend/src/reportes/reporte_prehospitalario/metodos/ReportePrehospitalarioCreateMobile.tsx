import { 
    TextInput, 
    DateInput, 
    NumberInput, 
    SelectInput, 
    ArrayInput, 
    SimpleFormIterator, 
    required, 
    DateTimeInput, 
    TimeInput, 
    useCreate, 
    ReferenceInput, 
    FileInput, 
    FileField,
    SimpleForm,
    SimpleList
} from "react-admin";
import { Stack, Box, useMediaQuery, Theme, Card } from "@mui/material";
import { OperadorPrehospitalario } from "../../componentes/OperadorPrehospitalario";
import { TurnoInput } from "../../componentes/TurnoInput";
import BotonSoloCoordenadas from "../misc/BotonSoloCoordenadas";
import TablaApgar from "../misc/TablaApgar";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

import { 
    atencionChoices,
    alcaldiasCDMX,
    accidentesChoices,
    impactoChoices,
    exploracionFisicaChoices,
    glasgowMotoraChoices,
    glasgowOcularChoices,
    glasgowVerbalChoices,
    viaAereaChoices,
    asistenciaVentilatoriaChoices,
    controlHemorragiasChoices,
    viasVenosasChoices,
    atencionBasicaChoices
} from "../../data/choices";

import { LugarOcurrenciaInput, AgenteCausalInput, OrigenProbableInput, InstitucionInput } from "./customInputs";

export const ReportePrehospitalarioCreateMobile = () => {
    return (
        <SimpleForm warnWhenUnsavedChanges>
                    <Stack spacing={2}>
                        {/* PREÁMBULO */}
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Preámbulo</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <DateTimeInput source="preambulo.fecha" label="Fecha" fullWidth />
                                <TextInput source="preambulo.folio" label="Folio" fullWidth validate={required()} />
                                <TurnoInput source="preambulo.turno_id" label="Turno" />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Datos del Servicio</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <SectionCard title="Cronometría" icon={<AccessTimeIcon />}>
                                    <Stack spacing={2} direction="column">
                                        <TextInput
                                            source="servicio.ubicacion.calle"
                                            label="Calle"
                                            fullWidth
                                            />
                                        <TimeInput source="servicio.cronometro.hora_salida" label="Hora de salida" fullWidth />
                                        <TimeInput source="servicio.cronometro.hora_llegada" label="Hora de llegada" fullWidth />
                                        <TimeInput source="servicio.cronometro.hora_traslado" label="Hora de traslado" fullWidth />
                                        <TimeInput source="servicio.cronometro.hora_hospital" label="Hora hospital" fullWidth />
                                        <TimeInput source="servicio.cronometro.salida_hospital" label="Salida hospital" fullWidth />
                                        <TimeInput source="servicio.cronometro.hora_base" label="Hora base" fullWidth />
                                    </Stack>
                                </SectionCard>
                                <SelectInput source="servicio.motivo" label="Motivo de atención" choices={atencionChoices} validate={required()} fullWidth />
                                <SectionCard title="Ubicación del Servicio" icon={<LocationOnIcon />}>
                                    <Stack spacing={2} direction="column">
                                        <TextInput source="servicio.ubicacion.calle" label="Calle" fullWidth />
                                        <TextInput source="servicio.ubicacion.interseccion1" label="Intersección 1" fullWidth />
                                        <TextInput source="servicio.ubicacion.interseccion2" label="Intersección 2" fullWidth />
                                        <TextInput source="servicio.ubicacion.colonia" label="Colonia/Comunidad" fullWidth />
                                        <SelectInput source="servicio.ubicacion.alcaldia" label="Alcaldía" choices={alcaldiasCDMX} validate={required()} fullWidth />
                                        <LugarOcurrenciaInput />
                                        <NumberInput source="servicio.ubicacion.coordenadas.0" label="Longitud" fullWidth />
                                        <NumberInput source="servicio.ubicacion.coordenadas.1" label="Latitud" fullWidth />
                                        <BotonSoloCoordenadas />
                                    </Stack>
                                </SectionCard>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Control</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <TextInput source="control.ambulancia_numero" label="Número de Ambulancia" fullWidth />
                                <OperadorPrehospitalario />
                                <TextInput source="control.tum" label="T.U.M" fullWidth />
                                <TextInput source="control.socorrista" label="Socorrista" fullWidth />
                                <TextInput source="control.helicoptero" label="Helicóptero Matrícula" fullWidth />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Datos del Paciente</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SectionCard title="Información del Paciente" icon={<PersonIcon />}>
                                <Stack spacing={2} direction="column">
                                    <TextInput source="paciente.nombre" label="Nombre del paciente" fullWidth />
                                    <SelectInput source="paciente.sexo" label="Sexo" choices={[{ id: "Masc", name: "Masculino" }, { id: "Fem", name: "Femenino" }]} fullWidth />
                                    <NumberInput source="paciente.edad.anos" label="Edad (años)" fullWidth />
                                    <NumberInput source="paciente.edad.meses" label="Edad (meses)" fullWidth />
                                    <TextInput source="paciente.domicilio" label="Domicilio" fullWidth />
                                    <TextInput source="paciente.colonia" label="Colonia/Comunidad" fullWidth />
                                    <TextInput source="paciente.alcaldia" label="Alcaldía/Municipio" fullWidth />
                                    <TextInput source="paciente.derechohabiente" label="Derechohabiente a" fullWidth />
                                    <TextInput source="paciente.telefono" label="Teléfono" fullWidth />
                                    <TextInput source="paciente.ocupacion" label="Ocupación" fullWidth />
                                </Stack>
                            </SectionCard>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Parto</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <SectionCard title="Información de la Madre" icon={<PregnantWomanIcon />}>
                                    <Stack spacing={2} direction="column">
                                        <NumberInput source="parto.madre.semanas_gesta" label="Semanas de gesta" fullWidth />
                                        <TimeInput source="parto.madre.hora_inicio" label="Hora de inicio contracciones" fullWidth />
                                        <TextInput source="parto.madre.frecuencia" label="Frecuencia" fullWidth />
                                        <TextInput source="parto.madre.duracion" label="Duración" fullWidth />
                                    </Stack>
                                </SectionCard>
                                <SectionCard title="Información del Recién Nacido" icon={<LocalHospitalIcon />}>
                                    <Stack spacing={2} direction="column">
                                        <DateTimeInput source="parto.postparto.hora_nacimiento" label="Hora de nacimiento" fullWidth />
                                        <TextInput source="parto.postparto.placenta" label="Placenta expulsada" fullWidth />
                                        <TextInput source="parto.postparto.lugar" label="Lugar" fullWidth />
                                        <SelectInput source="parto.postparto.producto" label="Producto" choices={[{ id: "vivo", name: "Vivo" }, { id: "muerto", name: "Muerto" }]} fullWidth />
                                        <SelectInput source="parto.postparto.sexo" label="Sexo del RN" choices={[{ id: "Masc", name: "Masculino" }, { id: "Fem", name: "Femenino" }]} fullWidth />
                                        <TextInput source="parto.edad_gestacional" label="Edad gestacional" fullWidth />
                                        <TablaApgar />
                                    </Stack>
                                </SectionCard>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Causa Traumática</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <SectionCard title="Información del Trauma" icon={<WarningIcon />}>
                                    <Stack spacing={2} direction="column">
                                        <AgenteCausalInput />
                                        <SelectInput source="trauma.accidente_auto" label="Accidente automovilístico" choices={accidentesChoices} validate={required()} fullWidth />
                                        <SelectInput source="trauma.impacto" label="Impacto" choices={impactoChoices} validate={required()} fullWidth />
                                        <TextInput source="trauma.cms" label="CMS" fullWidth />
                                    </Stack>
                                </SectionCard>
                                <SectionCard title="Condiciones del Vehículo" icon={<DirectionsCarIcon />}>
                                    <Stack spacing={2} direction="column">
                                        <SelectInput source="trauma.parabrisas" label="Parabrisas" validate={required()} choices={[{id: "Integro", name: "Íntegro"}, {id: "Estrellado", name: "Estrellado" }]} fullWidth />
                                        <SelectInput source="trauma.volante" label="Volante" validate={required()} choices={[{id: "Integro", name: "Íntegro"}, {id: "Doblado", name: "Doblado"}]} fullWidth />
                                        <SelectInput source="trauma.bolsa_aire" label="Bolsa de aire" validate={required()} choices={[{id: "Si", name: "Sí"}, {id: "No", name: "No"}]} fullWidth />
                                        <SelectInput source="trauma.cinturon_seguridad" label="Cinturón de seguridad" validate={required()} choices={[{id: "Colocado", name: "Colocado"}, {id: "No colocado", name: "No colocado"}]} fullWidth />
                                    </Stack>
                                </SectionCard>
                                <SectionCard title="Situación del Paciente" icon={<PersonIcon />}>
                                    <Stack spacing={2} direction="column">
                                        <SelectInput source="trauma.dentro_vehiculo" label="Dentro del vehículo" validate={required()} choices={[{id: "Si", name: "Sí"}, {id: "No", name: "No"}, {id: "Eyectado", name: "Eyectado"}]} fullWidth />
                                        <SelectInput source="trauma.atropellado" label="Atropellado" validate={required()} choices={[{id: "Automotor", name: "Automotor"}, {id: "Motocicleta", name: "Motocicleta"}, {id: "Bicicleta", name: "Bicicleta"}, {id: "Maquinaria", name: "Maquinaria"}]} fullWidth />
                                    </Stack>
                                </SectionCard>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Causa Clínica</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SectionCard title="Origen Clínico" icon={<MedicalServicesIcon />}>
                                <Stack spacing={2} direction="column">
                                    <OrigenProbableInput/>
                                    <SelectInput source="clinica.primera_vez" label="¿Primera vez?" choices={[{ id: "sí", name: "Sí" }, { id: "no", name: "No" }]} fullWidth />
                                    <SelectInput source="clinica.subsecuente" label="¿Subsecuente?" choices={[{ id: "sí", name: "Sí" }, { id: "no", name: "No" }]} fullWidth />
                                </Stack>
                            </SectionCard>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Evaluación Inicial</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <SelectInput source="evaluacion_inicial.nivel_consciencia" label="Nivel de consciencia" choices={[{id:"Alerta",name: "Alerta"}, {id:"Dolor",name: "Dolor"}, {id:"Verbal",name: "Verbal"}, {id:"Inconsciente",name: "Inconsciente"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.deglucion" label="Deglución" choices={[{id:"Ausente",name: "Ausente"}, {id:"Presente",name: "Presente"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.via_aerea" label="Vía aérea" choices={[{id:"Permeable",name: "Permeable"}, {id:"Comprometida",name: "Comprometida"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.ventilacion" label="Ventilación" choices={[{id:"Automatismo regular",name: "Automatismo regular"}, {id:"Automatismo irregular",name: "Automatismo irregular"}, {id:"Automatismo rapido",name: "Automatismo rapido"}, {id:"Automatismo superficial",name: "Automatismo superficial"}, {id:"Apnea",name: "Apnea"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.auscultacion" label="Auscultación" choices={[{id:"Ruidos respiratorios normales",name: "Ruidos respiratorios normales"}, {id:"Ruidos respiratorios disminuidos",name: "Ruidos respiratorios disminuidos"}, {id:"Ruidos respiratorios ausentes",name: "Ruidos respiratorios ausentes"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.hemitorax" label="Hemitórax" choices={[{id:"Derecho",name: "Derecho"}, {id:"Izquierdo",name: "Izquierdo"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.sitio" label="Sitio" choices={[{id:"Apical",name: "Apical"}, {id:"Base",name: "Base"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.pulsos.presencia" label="Presencia de pulsos" choices={[{id:"Carotideo",name: "Carotideo"}, {id:"Radial",name: "Radial"}, {id:"Paro cardiorespiratorio",name: "Paro cardiorespiratorio"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.pulsos.calidad" label="Calidad" choices={[{id:"Rapido",name: "Rapido"}, {id:"Lento",name: "Lento"}, {id:"Ritmico",name: "Ritmico"}, {id:"Arritmico",name: "Arritmico"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.piel" label="Piel" choices={[{id:"Normal",name: "Normal"}, {id:"Palida",name: "Palida"}, {id:"Cianotica",name: "Cianotica"}]} fullWidth />
                                <SelectInput source="evaluacion_inicial.caracteristicas" label="Características" choices={[{id:"Caliente",name: "Caliente"}, {id:"Fria",name: "Fria"}, {id:"Diaforesis",name: "Diaforesis"}, {id:"Normotermico",name: "Normotermico"}]} fullWidth />
                                <TextInput source="evaluacion_inicial.observaciones" label="Observaciones adicionales" fullWidth multiline />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Evaluación Secundaria</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <ArrayInput source="evaluacion_secundaria.zonas_lesion" label="Zonas de lesión">
                                    <SimpleFormIterator>
                                        <TextInput source="zona" label="Zona anatómica" />
                                        <SelectInput source="hallazgo" label="Hallazgo físico" choices={exploracionFisicaChoices} fullWidth />
                                        <DateInput source="fecha" label="Fecha" />
                                    </SimpleFormIterator>
                                </ArrayInput>
                                <SelectInput source="evaluacion_secundaria.pupilas" label="Pupilas" choices={[{id:"Derecha",name: "Derecha"}, {id:"Izquierda",name: "Izquierda"}]} fullWidth />
                                <ArrayInput source="evaluacion_secundaria.signos_vitales" label="Signos vitales y monitoreo">
                                    <SimpleFormIterator>
                                        <TimeInput source="hora" label="Hora" />
                                        <TextInput source="fr" label="FR" />
                                        <TextInput source="fc" label="FC" />
                                        <TextInput source="tas" label="TAS" />
                                        <TextInput source="tad" label="TAD" />
                                        <TextInput source="sao2" label="SaO₂" />
                                        <TextInput source="gluc" label="Glucosa" />
                                        <SelectInput source="neuro" label="Neuro Test" choices={[{id:"A",name: "A"},{id:"V",name: "V"},{id:"D",name: "D"},{id:"I",name: "I"}]} />
                                    </SimpleFormIterator>
                                </ArrayInput>
                                <SelectInput source="evaluacion_secundaria.glasgow_ocular" label="Apertura ocular" choices={glasgowOcularChoices} fullWidth />
                                <SelectInput source="evaluacion_secundaria.glasgow_motora" label="Respuesta motora" choices={glasgowMotoraChoices} fullWidth />
                                <SelectInput source="evaluacion_secundaria.glasgow_verbal" label="Respuesta verbal" choices={glasgowVerbalChoices} fullWidth />
                                <GlasgowTotal />
                                <TextInput source="evaluacion_secundaria.alergias" label="Alergias" fullWidth />
                                <TextInput source="evaluacion_secundaria.medicamentos" label="Medicamentos" fullWidth />
                                <TextInput source="evaluacion_secundaria.padecimientos" label="Padecimientos / Cirugías" fullWidth />
                                <TextInput source="evaluacion_secundaria.ultima_comida" label="Última comida" fullWidth />
                                <TextInput source="evaluacion_secundaria.eventos_previos" label="Eventos previos" fullWidth />
                                <SelectInput source="evaluacion_secundaria.condicion" label="Condición del paciente" choices={[{ id: "Critico", name: "Critico" }, { id: "No critico", name: "No critico" }, { id: "Estable", name: "Estable" }, { id: "Inestable", name: "Inestable" }]} fullWidth />
                                <SelectInput source="evaluacion_secundaria.prioridad" label="Prioridad" choices={[{ id: "Rojo", name: "Rojo" }, { id: "Amarillo", name: "Amarillo" }, { id: "Verde", name: "Verde" }, { id: "Negra", name: "Negra" }]} fullWidth />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Traslado</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <TextInput source="traslado.hospital" label="Hospital" fullWidth />
                                <TextInput source="traslado.dr" label="Doctor" fullWidth />
                                <TextInput source="traslado.folio_cru" label="Folio CRU" fullWidth />
                                <SelectInput source="traslado.negativa" label="Negativa a recibir atencion/ser trasladado" choices={[{ id: "sí", name: "Sí" }, { id: "no", name: "No" }]} fullWidth />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Tratamiento</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <SelectInput source="tratamiento.via_aerea" label="Vía aérea" choices={viaAereaChoices} fullWidth />
                                <SelectInput source="tratamiento.control_cervical" label="Control cervical" choices={[{ id: "Manual", name: "Manual" }, { id: "Collarin rigido", name: "Collarin rigido" }, { id: "Collarin blando", name: "Collarin blando" }]} fullWidth />
                                <SelectInput source="tratamiento.asistencia_ventilatoria.tipo" label="Asistencia ventilatoria" choices={asistenciaVentilatoriaChoices} fullWidth />
                                <NumberInput source="tratamiento.asistencia_ventilatoria.ltsxmin" label="LTS X MIN" fullWidth />
                                <ArrayInput source="tratamiento.asistencia_ventilatoria.medicacion" label="Medicación administrada">
                                    <SimpleFormIterator>
                                        <TimeInput source="hora" label="Hora" />
                                        <TextInput source="medicamento" label="Medicamento" />
                                        <TextInput source="dosis" label="Dosis" />
                                        <TextInput source="via" label="Vía administración" />
                                    </SimpleFormIterator>
                                </ArrayInput>
                                <TextInput source="tratamiento.dr_tratante" label="Dr. tratante" fullWidth />
                                <SelectInput source="tratamiento.hemorragias" label="Control de hemorragias" choices={controlHemorragiasChoices} fullWidth />
                                <ArrayInput source="tratamiento.vias_venosas" label="Vías venosas y solución">
                                    <SimpleFormIterator>
                                        <SelectInput source="tipo" label="Tipo de solución" choices={viasVenosasChoices}/>
                                        <NumberInput source="lineaIV" label="Linea IV #" />
                                        <NumberInput source="cateter" label="Catéter #" />
                                        <NumberInput source="cantidad" label="Cantidad" />
                                    </SimpleFormIterator>
                                </ArrayInput>
                                <SelectInput source="tratamiento.atencion_basica" label="Atención básica" choices={atencionBasicaChoices} fullWidth />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Otros</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <TextInput source="observaciones.pertenencias" label="Pertenencias" fullWidth multiline />
                                <ArrayInput source="legales.autoridades" label="Autoridades">
                                    <SimpleFormIterator>
                                        <InstitucionInput />
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
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Documento PDF</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                        </AccordionDetails>
                    </Accordion>
                </Stack>
        </SimpleForm>
    );
};
