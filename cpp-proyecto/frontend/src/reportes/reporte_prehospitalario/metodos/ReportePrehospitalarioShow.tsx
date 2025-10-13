import {
    Show, TabbedShowLayout, TextField, DateField,
    NumberField, FunctionField, ArrayField, Datagrid
} from "react-admin";

export const ReportePrehospitalarioShow = () => (
    <Show>
        <TabbedShowLayout>

            {/* PREÁMBULO */}
            <TabbedShowLayout.Tab label="PREÁMBULO">
                <NumberField source="preambulo.fecha.ano" label="Año" />
                <NumberField source="preambulo.fecha.mes" label="Mes" />
                <NumberField source="preambulo.fecha.dia" label="Día" />
                <TextField source="preambulo.folio" label="Folio" />
            </TabbedShowLayout.Tab>

            {/* I. DATOS DEL SERVICIO */}
            <TabbedShowLayout.Tab label="I. DATOS DEL SERVICIO">
                <TextField source="servicio.cronometro.hora_llamada" label="Hora de Llamada" />
                <TextField source="servicio.cronometro.hora_salida" label="Hora de Salida" />
                <TextField source="servicio.cronometro.hora_llegada" label="Hora de Llegada" />
                <TextField source="servicio.cronometro.hora_traslado" label="Hora de Traslado" />
                <TextField source="servicio.cronometro.hora_hospital" label="Hora en Hospital" />
                <TextField source="servicio.cronometro.salida_hospital" label="Salida del Hospital" />
                <TextField source="servicio.cronometro.hora_base" label="Hora Base" />
                <TextField source="servicio.motivo" label="Motivo de la Atención" />
                <TextField source="servicio.ubicacion.calle" label="Calle" />
                <TextField source="servicio.ubicacion.interseccion1" label="Intersección 1" />
                <TextField source="servicio.ubicacion.interseccion2" label="Intersección 2" />
                <TextField source="servicio.ubicacion.colonia" label="Colonia/Comunidad" />
                <TextField source="servicio.ubicacion.alcaldia" label="Alcaldía/Municipio" />
                <TextField source="servicio.ubicacion.lugar_ocurrencia" label="Lugar de Ocurrencia" />
            </TabbedShowLayout.Tab>

            {/* II. CONTROL */}
            <TabbedShowLayout.Tab label="II. CONTROL">
                <TextField source="control.ambulancia_numero" label="Número de Ambulancia" />
                <TextField source="control.operador" label="Operador" />
                <TextField source="control.tum" label="T.U.M" />
                <TextField source="control.socorrista" label="Socorrista" />
                <TextField source="control.helicoptero" label="Helicóptero Matrícula" />
            </TabbedShowLayout.Tab>

            {/* III. DATOS DEL PACIENTE */}
            <TabbedShowLayout.Tab label="III. DATOS DEL PACIENTE">
                <TextField source="paciente.nombre" label="Nombre del Paciente" />
                <TextField source="paciente.sexo" label="Sexo" />
                <NumberField source="paciente.edad.anos" label="Edad (años)" />
                <NumberField source="paciente.edad.meses" label="Edad (meses)" />
                <TextField source="paciente.domicilio" label="Domicilio" />
                <TextField source="paciente.colonia" label="Colonia/Comunidad" />
                <TextField source="paciente.alcaldia" label="Alcaldía/Municipio" />
                <TextField source="paciente.derechohabiente" label="Derechohabiente a" />
                <TextField source="paciente.telefono" label="Teléfono" />
                <TextField source="paciente.ocupacion" label="Ocupación" />
            </TabbedShowLayout.Tab>

            {/* IV. PARTO */}
            <TabbedShowLayout.Tab label="IV. PARTO">
                <NumberField source="parto.madre.semanas_gesta" label="Semanas de Gesta" />
                <TextField source="parto.madre.hora_inicio" label="Hora de Inicio de Contracciones" />
                <TextField source="parto.madre.frecuencia" label="Frecuencia" />
                <TextField source="parto.madre.duracion" label="Duración" />
                <TextField source="parto.postparto.hora_nacimiento" label="Hora de Nacimiento" />
                <TextField source="parto.postparto.placenta" label="Placenta Expulsada" />
                <TextField source="parto.postparto.lugar" label="Lugar" />
                <TextField source="parto.postparto.producto" label="Producto" />
                <TextField source="parto.postparto.sexo" label="Sexo del RN" />
                <ArrayField source="parto.apgar" label="Puntaje Apgar">
                    <Datagrid>
                        <TextField source="edad_gestacional" label="Edad Gestacional" />
                        <TextField source="color" label="Color" />
                        <TextField source="fc" label="FC" />
                        <TextField source="irritabilidad" label="Irritabilidad" />
                        <TextField source="tono" label="Tono Muscular" />
                        <TextField source="respiracion" label="Respiración" />
                        <TextField source="tiempo" label="Tiempo" />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>

            {/* V. CAUSA TRAUMÁTICA */}
            <TabbedShowLayout.Tab label="V. CAUSA TRAUMÁTICA">
                <TextField source="trauma.agente" label="Agente Causal" />
                <ArrayField source="trauma.accidente_auto" label="Accidente Automovilístico">
                    <Datagrid>
                        <TextField source="tipo" label="Tipo" />
                        <TextField source="impacto" label="Impacto" />
                        <TextField source="hundimiento" label="Hundimiento" />
                        <TextField source="parabrisas" label="Parabrisas" />
                        <TextField source="volante" label="Volante" />
                        <TextField source="bolsa_aire" label="Bolsa de Aire" />
                        <TextField source="cinturon" label="Cinturón de Seguridad" />
                        <TextField source="dentro_vehiculo" label="Dentro del Vehículo" />
                    </Datagrid>
                </ArrayField>
                <TextField source="trauma.atropellado" label="Atropellado" />
            </TabbedShowLayout.Tab>

            {/* VI. CAUSA CLÍNICA */}
            <TabbedShowLayout.Tab label="VI. CAUSA CLÍNICA">
                <TextField source="clinica.origen" label="Origen Probable" />
                <TextField source="clinica.primera_vez" label="¿Primera vez?" />
                <TextField source="clinica.subsecuente" label="¿Subsecuente?" />
            </TabbedShowLayout.Tab>

            {/* VII. EVALUACIÓN INICIAL */}
            <TabbedShowLayout.Tab label="VII. EVALUACIÓN INICIAL">
                <TextField source="evaluacion_inicial.nivel_consciencia" label="Nivel de Consciencia" />
                <TextField source="evaluacion_inicial.deglucion" label="Deglución" />
                <TextField source="evaluacion_inicial.via_aerea" label="Vía Aérea" />
                <TextField source="evaluacion_inicial.ventilacion" label="Ventilación" />
                <TextField source="evaluacion_inicial.auscultacion" label="Auscultación" />
                <TextField source="evaluacion_inicial.hemitorax" label="Hemitórax" />
                <TextField source="evaluacion_inicial.sitio" label="Sitio" />
                <TextField source="evaluacion_inicial.pulsos.presencia" label="Presencia de Pulsos" />
                <TextField source="evaluacion_inicial.pulsos.calidad" label="Calidad" />
                <TextField source="evaluacion_inicial.piel" label="Piel" />
                <TextField source="evaluacion_inicial.caracteristicas" label="Características" />
                <TextField source="evaluacion_inicial.comentario" label="Comentario" />
            </TabbedShowLayout.Tab>

            {/* VIII. EVALUACIÓN SECUNDARIA */}
            <TabbedShowLayout.Tab label="VIII. EVALUACIÓN SECUNDARIA">
                <TextField source="evaluacion_secundaria.exploracion" label="Exploración Física" />
                <ArrayField source="evaluacion_secundaria.zonas_lesion" label="Zonas de Lesión">
                    <Datagrid>
                        <TextField source="nombre" label="Nombre" />
                        <TextField source="asunto" label="Asunto N." />
                        <DateField source="fecha" label="Fecha" />
                    </Datagrid>
                </ArrayField>
                <TextField source="evaluacion_secundaria.pupilas" label="Pupilas" />
                <ArrayField source="evaluacion_secundaria.signos_vitales" label="Signos Vitales y Monitoreo">
                    <Datagrid>
                        <TextField source="hora" label="Hora" />
                        <TextField source="fr" label="FR" />
                        <TextField source="fc" label="FC" />
                        <TextField source="tas" label="TAS" />
                        <TextField source="tad" label="TAD" />
                        <TextField source="sao2" label="SaO2" />
                        <TextField source="gluc" label="Glucosa" />
                        <TextField source="neuro" label="Neuro Test" />
                    </Datagrid>
                </ArrayField>
                <NumberField source="evaluacion_secundaria.glasgow" label="Puntaje Glasgow" />
                <TextField source="evaluacion_secundaria.alergias" label="Alergias" />
                <TextField source="evaluacion_secundaria.medicamentos" label="Medicamentos" />
                <TextField source="evaluacion_secundaria.padecimientos" label="Padecimientos / Cirugías" />
                <TextField source="evaluacion_secundaria.ultima_comida" label="Última Comida" />
                <TextField source="evaluacion_secundaria.eventos_previos" label="Eventos Previos" />
                <TextField source="evaluacion_secundaria.condicion" label="Condición del Paciente" />
                <TextField source="evaluacion_secundaria.prioridad" label="Prioridad" />
            </TabbedShowLayout.Tab>

            {/* IX. TRASLADO */}
            <TabbedShowLayout.Tab label="IX. TRASLADO">
                <TextField source="traslado.hospital" label="Hospital" />
                <TextField source="traslado.dr" label="Doctor" />
                <TextField source="traslado.folio_cru" label="Folio CRU" />
                <TextField source="traslado.negativa.nombre" label="Nombre (Negativa Atención)" />
                <TextField source="traslado.negativa.firma" label="Firma" />
            </TabbedShowLayout.Tab>

            {/* X. TRATAMIENTO */}
            <TabbedShowLayout.Tab label="X. TRATAMIENTO">
                <TextField source="tratamiento.via_aerea" label="Vía Aérea" />
                <TextField source="tratamiento.control_cervical" label="Control Cervical" />
                <TextField source="tratamiento.asistencia_ventilatoria.hora" label="Hora (Asistencia Ventilatoria)" />
                <TextField source="tratamiento.asistencia_ventilatoria.medicamento" label="Medicamento" />
                <TextField source="tratamiento.asistencia_ventilatoria.dosis" label="Dosis" />
                <TextField source="tratamiento.asistencia_ventilatoria.via" label="Vía Administración" />
                <TextField source="tratamiento.dr_tratante" label="Dr. Tratante" />
                <TextField source="tratamiento.hemorragias" label="Control de Hemorragias" />
                <ArrayField source="tratamiento.vias_venosas" label="Vías Venosas y Solución">
                    <Datagrid>
                        <TextField source="tipo" label="Tipo de Solución" />
                        <TextField source="cateter" label="Catéter #" />
                        <TextField source="cantidad" label="Cantidad" />
                    </Datagrid>
                </ArrayField>
                <TextField source="tratamiento.atencion_basica" label="Atención Básica" />
            </TabbedShowLayout.Tab>

            {/* XI–XVI */}
            <TabbedShowLayout.Tab label="XI–XVI OTROS">
                <TextField source="observaciones.pertenencias" label="Pertenencias" />
                <TextField source="ministerio_publico.sello" label="Sello Ministerio Público" />
                <TextField source="ministerio_publico.nombre" label="Nombre y Firma (MP)" />
                <ArrayField source="legales.autoridades" label="Autoridades">
                    <Datagrid>
                        <TextField source="dependencia" label="Dependencia" />
                        <TextField source="unidad" label="Unidad" />
                        <TextField source="oficiales" label="Número de Oficiales" />
                    </Datagrid>
                </ArrayField>
                <ArrayField source="legales.vehiculos" label="Vehículos Involucrados">
                    <Datagrid>
                        <TextField source="tipo" label="Tipo y Marca" />
                        <TextField source="placas" label="Placas" />
                    </Datagrid>
                </ArrayField>
                <ArrayField source="firmas" label="Firmas">
                    <Datagrid>
                        <TextField source="paciente" label="Paciente" />
                        <TextField source="testigo" label="Testigo" />
                        <TextField source="paramedico" label="Paramédico" />
                        <TextField source="medico" label="Médico" />
                    </Datagrid>
                </ArrayField>
                <TextField source="modificaciones.usuario" label="Usuario" />
                <NumberField source="modificaciones.fecha.ano" label="Año (Modificación)" />
                <NumberField source="modificaciones.fecha.mes" label="Mes (Modificación)" />
                <NumberField source="modificaciones.fecha.dia" label="Día (Modificación)" />
                <TextField source="adicionales.reporte_escaneado" label="Reporte Escaneado" />
                <TextField source="adicionales.turno" label="Turno" />
            </TabbedShowLayout.Tab>

        </TabbedShowLayout>
    </Show>
);
