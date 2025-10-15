import { Edit, TabbedForm, TextInput, DateInput, NumberInput, SelectInput, ArrayInput, SimpleFormIterator, required, DateTimeInput, TimeInput, ReferenceArrayInput, SelectArrayInput, useCreate, ReferenceInput, FileInput, FileField, TabbedFormTabs} from "react-admin";
import { useReporteNotifications } from "../hooks/useReporteNotifications";
import BotonSoloCoordenadas from "../misc/BotonSoloCoordenadas";
import TablaApgar from "../misc/TablaApgar";
import { Stack, Box } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import WarningIcon from '@mui/icons-material/Warning';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { SectionCard } from "../../components/SectionCard";

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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { GlasgowTotal } from "../misc/GlasgowTotal";

export const ReportePrehospitalarioEdit = () => {
    const { onEditSuccess } = useReporteNotifications();

    return (
        <Edit mutationOptions={{ onSuccess: onEditSuccess }}>
            <TabbedForm warnWhenUnsavedChanges tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />}>

                {/* PREÁMBULO */}
                <TabbedForm.Tab label="PREÁMBULO">
                    <DateTimeInput source="preambulo.fecha" label="Fecha" />
                    <TextInput source="preambulo.folio" label="Folio" fullWidth validate={required()} />
                </TabbedForm.Tab>

                {/* I. DATOS DEL SERVICIO */}
                <TabbedForm.Tab label="I. DATOS DEL SERVICIO">
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
                        <TextInput source="servicio.ubicacion.calle" label="Calle" fullWidth />
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TextInput source="servicio.ubicacion.interseccion1" label="Intersección 1" sx={{ flex: 1 }} />
                            <TextInput source="servicio.ubicacion.interseccion2" label="Intersección 2" sx={{ flex: 1 }} />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <TextInput source="servicio.ubicacion.colonia" label="Colonia/Comunidad" sx={{ flex: 1 }} />
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
                <TabbedForm.Tab label="II. CONTROL">
                    <TextInput source="control.ambulancia_numero" label="Número de Ambulancia" />

                    <ReferenceArrayInput
                        label="Operadores"
                        source="control.operador"
                        reference="usuarios"
                        >
                        <SelectArrayInput
                            optionText={record => `${record.nombre} ${record.apellido}`}
                            optionValue="id"
                            helperText="selecciona a las personas a cargo"
                            validate={required()}
                            />
                    </ReferenceArrayInput>
                    <TextInput source="control.tum" label="T.U.M" />
                    <TextInput source="control.socorrista" label="Socorrista" />
                    <TextInput source="control.helicoptero" label="Helicóptero Matrícula" />
                </TabbedForm.Tab>

                {/* III. DATOS DEL PACIENTE */}
                <TabbedForm.Tab label="III. DATOS DEL PACIENTE">
                    <SectionCard title="Información del Paciente" icon={<PersonIcon />}>
                        <TextInput source="paciente.nombre" label="Nombre del paciente" fullWidth />
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 2 }}>
                            <SelectInput
                                source="paciente.sexo"
                                label="Sexo"
                                choices={[
                                    { id: "Masc", name: "Masculino" },
                                    { id: "Fem", name: "Femenino" },
                                ]}
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
                <TabbedForm.Tab label="IV. PARTO">
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
                                choices={[
                                    { id: "vivo", name: "Vivo" },
                                    { id: "muerto", name: "Muerto" },
                                ]}
                                sx={{ flex: 1 }}
                            />
                        </Stack>
                        <SelectInput
                            source="parto.postparto.sexo"
                            label="Sexo del RN"
                            choices={[
                                { id: "Masc", name: "Masculino" },
                                { id: "Fem", name: "Femenino" },
                            ]}
                            sx={{ mt: 2 }}
                        />
                        <TextInput source="parto.edad_gestacional" label="Edad gestacional" fullWidth sx={{ mt: 2 }} />
                        <Box sx={{ mt: 2 }}>
                            <TablaApgar />
                        </Box>
                    </SectionCard>
                </TabbedForm.Tab>

                {/* V. CAUSA TRAUMÁTICA */}
                <TabbedForm.Tab label="V. CAUSA TRAUMÁTICA">
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
                                choices={[
                                    {id: "Integro", name: "Íntegro"},
                                    {id: "Estrellado", name: "Estrellado" },
                                ]}
                                fullWidth
                            />
                            <SelectInput 
                                source="trauma.volante" 
                                label="Volante" 
                                validate={required()}
                                choices={[
                                    {id: "Integro", name: "Íntegro"},
                                    {id: "Doblado", name: "Doblado"},
                                ]}
                                fullWidth
                            />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput 
                                source="trauma.bolsa_aire" 
                                label="Bolsa de aire" 
                                validate={required()}
                                choices={[
                                    {id: "Si", name: "Sí"},
                                    {id: "No", name: "No"},
                                ]}
                                fullWidth
                            />
                            <SelectInput 
                                source="trauma.cinturon_seguridad" 
                                label="Cinturón de seguridad" 
                                validate={required()}
                                choices={[
                                    {id: "Colocado", name: "Colocado"},
                                    {id: "No colocado", name: "No colocado"},
                                ]}
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
                                choices={[
                                    {id: "Si", name: "Sí"},
                                    {id: "No", name: "No"},
                                    {id: "Eyectado", name: "Eyectado"},
                                ]}
                                fullWidth
                            />
                            <SelectInput 
                                source="trauma.atropellado" 
                                label="Atropellado" 
                                validate={required()}
                                choices={[
                                    {id: "Automotor", name: "Automotor"},
                                    {id: "Motocicleta", name: "Motocicleta"},
                                    {id: "Bicicleta", name: "Bicicleta"},
                                    {id: "Maquinaria", name: "Maquinaria"},
                                ]}
                                fullWidth
                            />
                        </Stack>
                    </SectionCard>
                </TabbedForm.Tab>

                {/* VI. CAUSA CLÍNICA */}
                <TabbedForm.Tab label="VI. CAUSA CLÍNICA">
                    <SectionCard title="Origen Clínico" icon={<MedicalServicesIcon />}>
                        <OrigenProbableInput/>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput
                                source="clinica.primera_vez"
                                label="¿Primera vez?"
                                choices={[
                                    { id: "sí", name: "Sí" },
                                    { id: "no", name: "No" },
                                ]}
                                fullWidth
                            />
                            <SelectInput
                                source="clinica.subsecuente"
                                label="¿Subsecuente?"
                                choices={[
                                    { id: "sí", name: "Sí" },
                                    { id: "no", name: "No" },
                                ]}
                                fullWidth
                            />
                        </Stack>
                    </SectionCard>
                </TabbedForm.Tab>

                {/* VII. EVALUACIÓN INICIAL */}
                <TabbedForm.Tab label="VII. EVALUACIÓN INICIAL">
                    <SelectInput source="evaluacion_inicial.nivel_consciencia" label="Nivel de consciencia" 
                        choices={[
                            {id:"Alerta",name: "Alerta"},
                            {id:"Dolor",name: "Dolor"},
                            {id:"Verbal",name: "Verbal"},
                            {id:"Inconsciente",name: "Inconsciente"},
                        ]}

                    />
                    <SelectInput source="evaluacion_inicial.deglucion" label="Deglución" 
                        choices={[
                            {id:"Ausente",name: "Ausente"},
                            {id:"Presente",name: "Presente"},
                        ]}
                    />
                    <SelectInput source="evaluacion_inicial.via_aerea" label="Vía aérea" 
                        choices={[
                            {id:"Permeable",name: "Permeable"},
                            {id:"Comprometida",name: "Comprometida"},
                        ]}
                    />
                    <SelectInput source="evaluacion_inicial.ventilacion" label="Ventilación" 
                        choices={[
                            {id:"Automatismo regular",name: "Automatismo regular"},
                            {id:"Automatismo irregular",name: "Automatismo irregular"},
                            {id:"Automatismo rapido",name: "Automatismo rapido"},
                            {id:"Automatismo superficial",name: "Automatismo superficial"},
                            {id:"Apnea",name: "Apnea"},
                        ]}
                    
                    />
                    <SelectInput source="evaluacion_inicial.auscultacion" label="Auscultación" 
                        choices={[
                            {id:"Ruidos respiratorios normales",name: "Ruidos respiratorios normales"},
                            {id:"Ruidos respiratorios disminuidos",name: "Ruidos respiratorios disminuidos"},
                            {id:"Ruidos respiratorios ausentes",name: "Ruidos respiratorios ausentes"},
                        ]}
                    />
                    <SelectInput source="evaluacion_inicial.hemitorax" label="Hemitórax" 
                    choices={[
                            {id:"Derecho",name: "Derecho"},
                            {id:"Izquierdo",name: "Izquierdo"},
                        ]}
                    
                    />
                    <SelectInput source="evaluacion_inicial.sitio" label="Sitio" 
                    choices={[
                            {id:"Apical",name: "Apical"},
                            {id:"Base",name: "Base"},
                        ]}
                    
                    />
                    <SelectInput source="evaluacion_inicial.pulsos.presencia" label="Presencia de pulsos" 
                    choices={[
                            {id:"Carotideo",name: "Carotideo"},
                            {id:"Radial",name: "Radial"},
                            {id:"Paro cardiorespiratorio",name: "Paro cardiorespiratorio"},
                        ]}
                    />
                    <SelectInput source="evaluacion_inicial.pulsos.calidad" label="Calidad" 
                    choices={[
                            {id:"Rapido",name: "Rapido"},
                            {id:"Lento",name: "Lento"},
                            {id:"Ritmico",name: "Ritmico"},
                            {id:"Arritmico",name: "Arritmico"},
                        ]}
                    />
                    <SelectInput source="evaluacion_inicial.piel" label="Piel" 
                    choices={[
                            {id:"Normal",name: "Normal"},
                            {id:"Palida",name: "Palida"},
                            {id:"Cianotica",name: "Cianotica"},
                        ]}
                    
                    />
                    <SelectInput source="evaluacion_inicial.caracteristicas" label="Características" 
                    choices={[
                            {id:"Caliente",name: "Caliente"},
                            {id:"Fria",name: "Fria"},
                            {id:"Diaforesis",name: "Diaforesis"},
                            {id:"Normotermico",name: "Normotermico"},
                        ]}
                    />
                    <TextInput source="evaluacion_inicial.observaciones" label="Observaciones adicionales" fullWidth />
                </TabbedForm.Tab>

                {/* VIII. EVALUACIÓN SECUNDARIA */}
                <TabbedForm.Tab label="VIII. EVALUACIÓN SECUNDARIA">
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
                    <SelectInput source="evaluacion_secundaria.pupilas" label="Pupilas" choices={[
                            {id:"Derecha",name: "Derecha"},
                            {id:"Izquierda",name: "Izquierda"},
                        ]}/>
                    <ArrayInput source="evaluacion_secundaria.signos_vitales" label="Signos vitales y monitoreo">
                        <SimpleFormIterator>
                            <TimeInput source="hora" label="Hora" />
                            <TextInput source="fr" label="FR" />
                            <TextInput source="fc" label="FC" />
                            <TextInput source="tas" label="TAS" />
                            <TextInput source="tad" label="TAD" />
                            <TextInput source="sao2" label="SaO₂" />
                            <TextInput source="gluc" label="Glucosa" />
                            <SelectInput source="neuro" label="Neuro Test" choices={[
                            {id:"A",name: "A"},
                            {id:"V",name: "V"},
                            {id:"D",name: "D"},
                            {id:"I",name: "I"},
                        ]}/>
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
                    <SelectInput source="evaluacion_secundaria.condicion" label="Condición del paciente" choices={[
                            { id: "Critico", name: "Critico" },
                            { id: "No critico", name: "No critico" },
                            { id: "Estable", name: "Estable" },
                            { id: "Inestable", name: "Inestable" },
                    ]}/>
                    <SelectInput source="evaluacion_secundaria.prioridad" label="Prioridad" choices={[
                            { id: "Rojo", name: "Rojo" },
                            { id: "Amarillo", name: "Amarillo" },
                            { id: "Verde", name: "Verde" },
                            { id: "Negra", name: "Negra" },
                    ]}/>
                </TabbedForm.Tab>

                {/* IX. TRASLADO */}
                <TabbedForm.Tab label="IX. TRASLADO">
                    <TextInput source="traslado.hospital" label="Hospital" />
                    <TextInput source="traslado.dr" label="Doctor" />
                    <TextInput source="traslado.folio_cru" label="Folio CRU" />
                    <SelectInput source="traslado.negativa" label="Negativa a recibir atencion/ser trasladado" choices={[
                            { id: "sí", name: "Sí" },
                            { id: "no", name: "No" },
                    ]}/>
                </TabbedForm.Tab>

                {/* X. TRATAMIENTO */}
                <TabbedForm.Tab label="X. TRATAMIENTO">
                    <SelectInput source="tratamiento.via_aerea" label="Vía aérea" choices={viaAereaChoices}/>
                    <SelectInput source="tratamiento.control_cervical" label="Control cervical" choices={[
                        { id: "Manual", name: "Manual" },
                            { id: "Collarin rigido", name: "Collarin rigido" },
                            { id: "Collarin blando", name: "Collarin blando" },
                    ]}/>

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
                <TabbedForm.Tab label="XI–XVI OTROS">
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

                    <TextInput source="modificaciones.usuario" label="Usuario modificación" />
                    <NumberInput source="modificaciones.fecha.ano" label="Año modificación" />
                    <NumberInput source="modificaciones.fecha.mes" label="Mes modificación" />
                    <NumberInput source="modificaciones.fecha.dia" label="Día modificación" />
                    <TextInput source="adicionales.reporte_escaneado" label="Reporte escaneado" />
                    <TextInput source="adicionales.turno" label="Turno" />
                </TabbedForm.Tab>
                <TabbedForm.Tab label="Scan">
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
        </Edit>
    );
};

const LugarOcurrenciaInput = () => {
    const [create] = useCreate();
    return (
        <ReferenceInput
            source="servicio.ubicacion.lugar_ocurrencia"
            reference="lugares_ocurrencia"
            >
            <SelectInput
                validate={required()}
                label = "Lugar de ocurrencia"
                optionText="nombre"
                onCreate={async ()=>{
                const newNombreLugarOcurrencia = prompt("Ingresa el nuevo lugar de ocurrencia");
                if (newNombreLugarOcurrencia){
                    const newLugarOcurrencia = await create(
                        "lugares_ocurrencia",
                        {data: {nombre: newNombreLugarOcurrencia}},
                        {returnPromise : true}
                    );
                    return newLugarOcurrencia;
                }
            }}/>

        </ReferenceInput>
    );
};

const AgenteCausalInput = () => {
    const [create] = useCreate();
    return (
        <ReferenceInput
            source="trauma.agente"
            reference="agentes_causal"
            >
            <SelectInput
                validate={required()}
                label = "Agente causal"
                optionText="nombre"
                onCreate={async ()=>{
                const newNombreAgenteCausal = prompt("Ingresa el nuevo agente causal");
                if (newNombreAgenteCausal){
                    const newAgenteCausal = await create(
                        "agentes_causal",
                        {data: {nombre: newNombreAgenteCausal}},
                        {returnPromise : true}
                    );
                    return newAgenteCausal;
                }
            }}/>

        </ReferenceInput>
    );
};

const OrigenProbableInput = () => {
    const [create] = useCreate();
    return (
        <ReferenceInput
            source="clinica.origen"
            reference="origen_probable"
            >
            <SelectInput
                validate={required()}
                label = "Origen probable"
                optionText="nombre"
                onCreate={async ()=>{
                const newNombreOrigenProbable = prompt("Ingresa el nuevo origen probable");
                if (newNombreOrigenProbable){
                    const newOrigenProbable = await create(
                        "agentes_causal",
                        {data: {nombre: newNombreOrigenProbable}},
                        {returnPromise : true}
                    );
                    return newOrigenProbable;
                }
            }}/>

        </ReferenceInput>
    );
};

const InstitucionInput = () => {
    const [create] = useCreate();
    return (
        <ReferenceInput
            source="institucion"
            reference="instituciones"
            sort={{field: "nombre", order: "ASC"}}
        >
            <SelectInput
                validate={required()}
                label="Dependencia"
                optionText="nombre"
                fullWidth
                onCreate={async ()=>{
                    const newNombreInstitucion = prompt("Ingresa el nombre de la nueva institución");
                    if (newNombreInstitucion){
                        const newInstitucion = await create(
                            "instituciones",
                            {data: {nombre: newNombreInstitucion}},
                            {returnPromise : true}
                        );
                        return newInstitucion;
                    }
                }}
            />
        </ReferenceInput>
    );
};
