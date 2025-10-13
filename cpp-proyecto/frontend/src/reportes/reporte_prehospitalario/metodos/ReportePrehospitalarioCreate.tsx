import {
    Create,
    TabbedForm,
    TextInput,
    DateInput,
    DateTimeInput,
    NumberInput,
    SelectInput,
    SelectArrayInput,
    ArrayInput,
    SimpleFormIterator,
    required,
    ImageInput,
    ImageField
} from "react-admin";
import { useReporteNotifications } from "../hooks/useReporteNotifications";

export const ReportePrehospitalarioCreate = () => {
    const { onCreateSuccess } = useReporteNotifications();

    return (
        <Create mutationOptions={{ onSuccess: onCreateSuccess }}>
            <TabbedForm warnWhenUnsavedChanges>

                {/* PREÁMBULO */}
                <TabbedForm.Tab label="PREÁMBULO">
                    <NumberInput source="preambulo.fecha.ano" label="Año" validate={required()} />
                    <NumberInput source="preambulo.fecha.mes" label="Mes" validate={required()} />
                    <NumberInput source="preambulo.fecha.dia" label="Día" validate={required()} />
                    <TextInput source="preambulo.folio" label="Folio" fullWidth validate={required()} />
                </TabbedForm.Tab>

                {/* I. DATOS DEL SERVICIO */}
                <TabbedForm.Tab label="I. DATOS DEL SERVICIO">
                    <TextInput source="servicio.cronometro.hora_llamada" label="Hora de llamada" />
                    <TextInput source="servicio.cronometro.hora_salida" label="Hora de salida" />
                    <TextInput source="servicio.cronometro.hora_llegada" label="Hora de llegada" />
                    <TextInput source="servicio.cronometro.hora_traslado" label="Hora de traslado" />
                    <TextInput source="servicio.cronometro.hora_hospital" label="Hora hospital" />
                    <TextInput source="servicio.cronometro.salida_hospital" label="Salida hospital" />
                    <TextInput source="servicio.cronometro.hora_base" label="Hora base" />
                    <TextInput source="servicio.motivo" label="Motivo de atención" fullWidth />
                    <TextInput source="servicio.ubicacion.calle" label="Calle" fullWidth />
                    <TextInput source="servicio.ubicacion.interseccion1" label="Intersección 1" />
                    <TextInput source="servicio.ubicacion.interseccion2" label="Intersección 2" />
                    <TextInput source="servicio.ubicacion.colonia" label="Colonia/Comunidad" fullWidth />
                    <TextInput source="servicio.ubicacion.alcaldia" label="Alcaldía/Municipio" fullWidth />
                    <TextInput source="servicio.ubicacion.lugar_ocurrencia" label="Lugar de ocurrencia" fullWidth />
                </TabbedForm.Tab>

                {/* II. CONTROL */}
                <TabbedForm.Tab label="II. CONTROL">
                    <TextInput source="control.ambulancia_numero" label="Número de Ambulancia" />
                    <TextInput source="control.operador" label="Operador" />
                    <TextInput source="control.tum" label="T.U.M" />
                    <TextInput source="control.socorrista" label="Socorrista" />
                    <TextInput source="control.helicoptero" label="Helicóptero Matrícula" />
                </TabbedForm.Tab>

                {/* III. DATOS DEL PACIENTE */}
                <TabbedForm.Tab label="III. DATOS DEL PACIENTE">
                    <TextInput source="paciente.nombre" label="Nombre del paciente" fullWidth />
                    <SelectInput
                        source="paciente.sexo"
                        label="Sexo"
                        choices={[
                            { id: "M", name: "Masculino" },
                            { id: "F", name: "Femenino" },
                            { id: "O", name: "Otro" },
                        ]}
                    />
                    <NumberInput source="paciente.edad.anos" label="Edad (años)" />
                    <NumberInput source="paciente.edad.meses" label="Edad (meses)" />
                    <TextInput source="paciente.domicilio" label="Domicilio" fullWidth />
                    <TextInput source="paciente.colonia" label="Colonia/Comunidad" />
                    <TextInput source="paciente.alcaldia" label="Alcaldía/Municipio" />
                    <TextInput source="paciente.derechohabiente" label="Derechohabiente a" />
                    <TextInput source="paciente.telefono" label="Teléfono" />
                    <TextInput source="paciente.ocupacion" label="Ocupación" />
                </TabbedForm.Tab>

                {/* IV. PARTO */}
                <TabbedForm.Tab label="IV. PARTO">
                    <NumberInput source="parto.madre.semanas_gesta" label="Semanas de gesta" />
                    <TextInput source="parto.madre.hora_inicio" label="Hora de inicio contracciones" />
                    <TextInput source="parto.madre.frecuencia" label="Frecuencia" />
                    <TextInput source="parto.madre.duracion" label="Duración" />
                    <TextInput source="parto.postparto.hora_nacimiento" label="Hora de nacimiento" />
                    <TextInput source="parto.postparto.placenta" label="Placenta expulsada" />
                    <TextInput source="parto.postparto.lugar" label="Lugar" />
                    <SelectInput
                        source="parto.postparto.producto"
                        label="Producto"
                        choices={[
                            { id: "único", name: "Único" },
                            { id: "múltiple", name: "Múltiple" },
                        ]}
                    />
                    <SelectInput
                        source="parto.postparto.sexo"
                        label="Sexo del RN"
                        choices={[
                            { id: "M", name: "Masculino" },
                            { id: "F", name: "Femenino" },
                        ]}
                    />
                    <ArrayInput source="parto.apgar" label="Puntaje Apgar">
                        <SimpleFormIterator>
                            <TextInput source="edad_gestacional" label="Edad gestacional" />
                            <TextInput source="color" label="Color" />
                            <TextInput source="fc" label="FC" />
                            <TextInput source="irritabilidad" label="Irritabilidad" />
                            <TextInput source="tono" label="Tono muscular" />
                            <TextInput source="respiracion" label="Respiración" />
                            <TextInput source="tiempo" label="Tiempo" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

                {/* V. CAUSA TRAUMÁTICA */}
                <TabbedForm.Tab label="V. CAUSA TRAUMÁTICA">
                    <TextInput source="trauma.agente" label="Agente causal" />
                    <ArrayInput source="trauma.accidente_auto" label="Accidente automovilístico">
                        <SimpleFormIterator>
                            <SelectInput source="tipo" label="Tipo" />
                            <SelectInput source="impacto" label="Impacto" />
                            <SelectInput source="hundimiento" label="Hundimiento" />
                            <SelectInput source="parabrisas" label="Parabrisas" />
                            <SelectInput source="volante" label="Volante" />
                            <SelectInput source="bolsa_aire" label="Bolsa de aire" />
                            <SelectInput source="cinturon" label="Cinturón de seguridad" />
                            <SelectInput source="dentro_vehiculo" label="Dentro del vehículo" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <TextInput source="trauma.atropellado" label="Atropellado" />
                </TabbedForm.Tab>

                {/* VI. CAUSA CLÍNICA */}
                <TabbedForm.Tab label="VI. CAUSA CLÍNICA">
                    <TextInput source="clinica.origen" label="Origen probable" />
                    <SelectInput
                        source="clinica.primera_vez"
                        label="¿Primera vez?"
                        choices={[
                            { id: "sí", name: "Sí" },
                            { id: "no", name: "No" },
                        ]}
                    />
                    <SelectInput
                        source="clinica.subsecuente"
                        label="¿Subsecuente?"
                        choices={[
                            { id: "sí", name: "Sí" },
                            { id: "no", name: "No" },
                        ]}
                    />
                </TabbedForm.Tab>

                {/* VII. EVALUACIÓN INICIAL */}
                <TabbedForm.Tab label="VII. EVALUACIÓN INICIAL">
                    <SelectInput source="evaluacion_inicial.nivel_consciencia" label="Nivel de consciencia" />
                    <SelectInput source="evaluacion_inicial.deglucion" label="Deglución" />
                    <SelectInput source="evaluacion_inicial.via_aerea" label="Vía aérea" />
                    <SelectInput source="evaluacion_inicial.ventilacion" label="Ventilación" />
                    <SelectInput source="evaluacion_inicial.auscultacion" label="Auscultación" />
                    <SelectInput source="evaluacion_inicial.hemitorax" label="Hemitórax" />
                    <SelectInput source="evaluacion_inicial.sitio" label="Sitio" />
                    <SelectInput source="evaluacion_inicial.pulsos.presencia" label="Presencia de pulsos" />
                    <SelectInput source="evaluacion_inicial.pulsos.calidad" label="Calidad" />
                    <SelectInput source="evaluacion_inicial.piel" label="Piel" />
                    <SelectInput source="evaluacion_inicial.caracteristicas" label="Características" />
                    <TextInput source="evaluacion_inicial.comentario" label="Comentario" fullWidth />
                </TabbedForm.Tab>

                {/* VIII. EVALUACIÓN SECUNDARIA */}
                <TabbedForm.Tab label="VIII. EVALUACIÓN SECUNDARIA">
                    <TextInput source="evaluacion_secundaria.exploracion" label="Exploración física" fullWidth />
                    <ArrayInput source="evaluacion_secundaria.zonas_lesion" label="Zonas de lesión">
                        <SimpleFormIterator>
                            <TextInput source="nombre" label="Nombre" />
                            <TextInput source="asunto" label="Asunto N." />
                            <DateInput source="fecha" label="Fecha" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <TextInput source="evaluacion_secundaria.pupilas" label="Pupilas" />
                    <ArrayInput source="evaluacion_secundaria.signos_vitales" label="Signos vitales y monitoreo">
                        <SimpleFormIterator>
                            <TextInput source="hora" label="Hora" />
                            <TextInput source="fr" label="FR" />
                            <TextInput source="fc" label="FC" />
                            <TextInput source="tas" label="TAS" />
                            <TextInput source="tad" label="TAD" />
                            <TextInput source="sao2" label="SaO₂" />
                            <TextInput source="gluc" label="Glucosa" />
                            <TextInput source="neuro" label="Neuro Test" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <NumberInput source="evaluacion_secundaria.glasgow" label="Puntaje Glasgow" />
                    <TextInput source="evaluacion_secundaria.alergias" label="Alergias" />
                    <TextInput source="evaluacion_secundaria.medicamentos" label="Medicamentos" />
                    <TextInput source="evaluacion_secundaria.padecimientos" label="Padecimientos / Cirugías" />
                    <TextInput source="evaluacion_secundaria.ultima_comida" label="Última comida" />
                    <TextInput source="evaluacion_secundaria.eventos_previos" label="Eventos previos" />
                    <SelectInput source="evaluacion_secundaria.condicion" label="Condición del paciente" />
                    <SelectInput source="evaluacion_secundaria.prioridad" label="Prioridad" />
                </TabbedForm.Tab>

                {/* IX. TRASLADO */}
                <TabbedForm.Tab label="IX. TRASLADO">
                    <TextInput source="traslado.hospital" label="Hospital" />
                    <TextInput source="traslado.dr" label="Doctor" />
                    <TextInput source="traslado.folio_cru" label="Folio CRU" />
                    <TextInput source="traslado.negativa.nombre" label="Nombre (Negativa)" />
                    <TextInput source="traslado.negativa.firma" label="Firma" />
                </TabbedForm.Tab>

                {/* X. TRATAMIENTO */}
                <TabbedForm.Tab label="X. TRATAMIENTO">
                    <SelectInput source="tratamiento.via_aerea" label="Vía aérea" />
                    <SelectInput source="tratamiento.control_cervical" label="Control cervical" />
                    <TextInput source="tratamiento.asistencia_ventilatoria.hora" label="Hora" />
                    <TextInput source="tratamiento.asistencia_ventilatoria.medicamento" label="Medicamento" />
                    <TextInput source="tratamiento.asistencia_ventilatoria.dosis" label="Dosis" />
                    <TextInput source="tratamiento.asistencia_ventilatoria.via" label="Vía administración" />
                    <TextInput source="tratamiento.dr_tratante" label="Dr. tratante" />
                    <TextInput source="tratamiento.hemorragias" label="Control de hemorragias" />
                    <ArrayInput source="tratamiento.vias_venosas" label="Vías venosas y solución">
                        <SimpleFormIterator>
                            <TextInput source="tipo" label="Tipo de solución" />
                            <TextInput source="cateter" label="Catéter #" />
                            <TextInput source="cantidad" label="Cantidad" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <TextInput source="tratamiento.atencion_basica" label="Atención básica" fullWidth />
                </TabbedForm.Tab>

                {/* XI–XVI */}
                <TabbedForm.Tab label="XI–XVI OTROS">
                    <TextInput source="observaciones.pertenencias" label="Pertenencias" fullWidth />
                    <TextInput source="ministerio_publico.sello" label="Sello de Ministerio Público" />
                    <TextInput source="ministerio_publico.nombre" label="Nombre/Firma MP" />
                    <ArrayInput source="legales.autoridades" label="Autoridades">
                        <SimpleFormIterator>
                            <TextInput source="dependencia" label="Dependencia" />
                            <TextInput source="unidad" label="Unidad" />
                            <TextInput source="oficiales" label="N° de oficiales" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="legales.vehiculos" label="Vehículos involucrados">
                        <SimpleFormIterator>
                            <TextInput source="tipo" label="Tipo y marca" />
                            <TextInput source="placas" label="Placas" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="firmas" label="Firmas">
                        <SimpleFormIterator>
                            <TextInput source="paciente" label="Nombre paciente" />
                            <TextInput source="testigo" label="Nombre testigo" />
                            <TextInput source="paramedico" label="Paramédico" />
                            <TextInput source="medico" label="Médico" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <TextInput source="modificaciones.usuario" label="Usuario modificación" />
                    <NumberInput source="modificaciones.fecha.ano" label="Año modificación" />
                    <NumberInput source="modificaciones.fecha.mes" label="Mes modificación" />
                    <NumberInput source="modificaciones.fecha.dia" label="Día modificación" />
                    <TextInput source="adicionales.reporte_escaneado" label="Reporte escaneado" />
                    <TextInput source="adicionales.turno" label="Turno" />
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    );
};
