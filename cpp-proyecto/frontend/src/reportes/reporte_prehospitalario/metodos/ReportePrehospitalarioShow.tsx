import { 
    Show, TabbedShowLayout, TextField, ReferenceField, DateField, 
    FunctionField, ArrayField, Datagrid, NumberField
} from "react-admin";

export const ReportePrehospitalarioShow = () => (
    <Show
    sx = {{
            display : 'flex',
            flexDirection : 'collumn',
            margin : '0 auto',
            xs : { width : '100%' },
            sm : { width : '100%' },
            md : { width : '80%' },
            lg : { width : '70%' },
        }}>  
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Preámbulo">
                <DateField source="preambulo.fecha" label="Fecha"/>
                <TextField source="preambulo.folio" label="Folio"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Datos del Servicio">
                <TextField source="datos_servicio.motivo_atencion" label="Motivo de Atención"/>
                
                {/* Cronometría */}
                <DateField source="datos_servicio.cronometria.hora_llamada" label="Hora de Llamada" showTime showDate={false}/>
                <DateField source="datos_servicio.cronometria.hora_salida" label="Hora de Salida" showTime showDate={false}/>
                <DateField source="datos_servicio.cronometria.hora_llegada" label="Hora de Llegada" showTime showDate={false}/>
                <DateField source="datos_servicio.cronometria.hora_traslado" label="Hora de Traslado" showTime showDate={false}/>
                <DateField source="datos_servicio.cronometria.hora_hospital" label="Hora en Hospital" showTime showDate={false}/>
                <DateField source="datos_servicio.cronometria.salida_hospital" label="Salida del Hospital" showTime showDate={false}/>
                <DateField source="datos_servicio.cronometria.hora_base" label="Hora Base" showTime showDate={false}/>
                
                {/* Ubicación */}
                <TextField source="datos_servicio.ubicacion.calle" label="Calle"/>
                <TextField source="datos_servicio.ubicacion.interseccion1" label="Intersección 1"/>
                <TextField source="datos_servicio.ubicacion.interseccion2" label="Intersección 2"/>
                <TextField source="datos_servicio.ubicacion.colonia" label="Colonia"/>
                <TextField source="datos_servicio.ubicacion.alcaldia" label="Alcaldía"/>
                <TextField source="datos_servicio.ubicacion.lugar_ocurrencia" label="Lugar de Ocurrencia"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Control">
                <TextField source="control.numero_ambulancia" label="Número de Ambulancia"/>
                <ReferenceField source="control.operadorId" reference="usuarios" label="Operador">
                    <FunctionField render={record => `${record.nombre} ${record.apellido}`} />
                </ReferenceField>
                <FunctionField 
                    source="control.tumId" 
                    label="T.U.M"
                    render={record => 
                        Array.isArray(record.control?.tumId) 
                            ? record.control.tumId.join(', ') 
                            : record.control?.tumId || ''
                    }
                />
                <FunctionField 
                    source="control.socorristaId" 
                    label="Socorrista"
                    render={record => 
                        Array.isArray(record.control?.socorristaId) 
                            ? record.control.socorristaId.join(', ') 
                            : record.control?.socorristaId || ''
                    }
                />
                <TextField source="control.helicoptero_matricula" label="Helicóptero Matrícula"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Datos del Paciente">
                <TextField source="datos_paciente.nombre" label="Nombre"/>
                <TextField source="datos_paciente.sexo" label="Sexo"/>
                <NumberField source="datos_paciente.edad.años" label="Edad (años)"/>
                <NumberField source="datos_paciente.edad.meses" label="Edad (meses)"/>
                <TextField source="datos_paciente.domicilio" label="Domicilio"/>
                <TextField source="datos_paciente.colonia" label="Colonia"/>
                <TextField source="datos_paciente.alcaldia" label="Alcaldía"/>
                <TextField source="datos_paciente.derechohabiente_a" label="Derechohabiente a"/>
                <TextField source="datos_paciente.telefono" label="Teléfono"/>
                <TextField source="datos_paciente.ocupacion" label="Ocupación"/>
                <TextField source="datos_paciente.parto" label="Parto"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Causa Traumática">
                <TextField source="causa_traumatica.agente_causal" label="Agente Causal"/>
                
                {/* Accidente Automovilístico */}
                <TextField source="causa_traumatica.accidente_automovilistico.tipo" label="Tipo de Accidente"/>
                <TextField source="causa_traumatica.accidente_automovilistico.impacto" label="Impacto"/>
                <TextField source="causa_traumatica.accidente_automovilistico.hundimiento" label="Hundimiento"/>
                <TextField source="causa_traumatica.accidente_automovilistico.parabrisas" label="Parabrisas"/>
                <TextField source="causa_traumatica.accidente_automovilistico.volante" label="Volante"/>
                <TextField source="causa_traumatica.accidente_automovilistico.bolsa_de_aire" label="Bolsa de Aire"/>
                <TextField source="causa_traumatica.accidente_automovilistico.cinturon_seguridad" label="Cinturón de Seguridad"/>
                <TextField source="causa_traumatica.accidente_automovilistico.dentro_del_vehiculo" label="Dentro del Vehículo"/>
                <TextField source="causa_traumatica.accidente_automovilistico.atropellado" label="Atropellado"/>
                <TextField source="causa_traumatica.causa_clinica" label="Causa Clínica"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Evaluación Inicial">
                <TextField source="evaluacion_inicial.nivel_consciencia" label="Nivel de Consciencia"/>
                <TextField source="evaluacion_inicial.deglucion" label="Deglución"/>
                <TextField source="evaluacion_inicial.via_aerea" label="Vía Aérea"/>
                <TextField source="evaluacion_inicial.ventilacion" label="Ventilación"/>
                <TextField source="evaluacion_inicial.auscultacion" label="Auscultación"/>
                <TextField source="evaluacion_inicial.hemitorax" label="Hemitórax"/>
                <TextField source="evaluacion_inicial.sitio" label="Sitio"/>
                <TextField source="evaluacion_inicial.presencia_pulsos" label="Presencia de Pulsos"/>
                <TextField source="evaluacion_inicial.calidad" label="Calidad"/>
                <TextField source="evaluacion_inicial.piel" label="Piel"/>
                <TextField source="evaluacion_inicial.caracteristicas" label="Características"/>
                <TextField source="evaluacion_inicial.comentario" label="Comentario"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Evaluación Secundaria">
                <TextField source="evaluacion_secundaria.exploracion_fisica" label="Exploración Física"/>
                
                {/* Zonas de Lesión */}
                <ArrayField source="evaluacion_secundaria.zonas_lesion" label="Zonas de Lesión">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="nombre" label="Zona"/>
                        <TextField source="asunto" label="Lesión"/>
                        <DateField source="fecha" label="Fecha"/>
                    </Datagrid>
                </ArrayField>
                
                <TextField source="evaluacion_secundaria.pupilas" label="Pupilas"/>
                
                {/* Signos Vitales */}
                <ArrayField source="evaluacion_secundaria.signos_vitales" label="Signos Vitales">
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
                
                <TextField source="evaluacion_secundaria.alergias" label="Alergias"/>
                <TextField source="evaluacion_secundaria.medicamentos" label="Medicamentos"/>
                <TextField source="evaluacion_secundaria.padecimientos_cirugias" label="Padecimientos/Cirugías"/>
                <TextField source="evaluacion_secundaria.ultima_comida" label="Última Comida"/>
                <TextField source="evaluacion_secundaria.eventos_previos" label="Eventos Previos"/>
                <TextField source="evaluacion_secundaria.condicion_paciente" label="Condición del Paciente"/>
                <TextField source="evaluacion_secundaria.prioridad" label="Prioridad"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Traslado">
                {/* Institución */}
                <TextField source="traslado.institucion.hospital" label="Hospital"/>
                <TextField source="traslado.institucion.doctor_recibe" label="Doctor que Recibe"/>
                <TextField source="traslado.institucion.folio_cru" label="Folio CRU"/>
                <TextField source="traslado.institucion.negativa_atencion" label="Negativa de Atención"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Tratamiento">
                <TextField source="tratamiento.via_aerea_manejo" label="Manejo de Vía Aérea"/>
                <TextField source="tratamiento.control_cervical" label="Control Cervical"/>
                
                {/* Asistencia Ventilatoria */}
                <TextField source="tratamiento.asistencia_ventilatoria.tipo" label="Tipo de Asistencia Ventilatoria"/>
                <NumberField source="tratamiento.asistencia_ventilatoria.lts_min" label="Lts/min"/>
                
                {/* Medicamentos */}
                <ArrayField source="tratamiento.medicamentos" label="Medicamentos">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="medicamento" label="Medicamento"/>
                        <TextField source="dosis" label="Dosis"/>
                        <TextField source="via" label="Vía"/>
                    </Datagrid>
                </ArrayField>
                
                <TextField source="tratamiento.control_hemorragias" label="Control de Hemorragias"/>
                
                {/* Vías Venosas */}
                <ArrayField source="tratamiento.vias_venosas" label="Vías Venosas">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="tipo_solucion" label="Tipo de Solución"/>
                        <NumberField source="cateter_n" label="Catéter N°"/>
                        <NumberField source="cantidad_ml" label="Cantidad (ml)"/>
                    </Datagrid>
                </ArrayField>
                
                <TextField source="tratamiento.atencion_basica" label="Atención Básica"/>
                <TextField source="tratamiento.observaciones_pertenencias" label="Observaciones/Pertenencias"/>
                <TextField source="tratamiento.ministerio_publico" label="Ministerio Público"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Datos Legales">
                {/* Autoridades */}
                <ArrayField source="datos_legales.autoridades" label="Autoridades">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="dependencia" label="Dependencia"/>
                        <TextField source="numero_unidad" label="Número de Unidad"/>
                        <NumberField source="numero_oficiales" label="Número de Oficiales"/>
                    </Datagrid>
                </ArrayField>
                
                {/* Vehículos Involucrados */}
                <ArrayField source="datos_legales.vehiculos_involucrados" label="Vehículos Involucrados">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="tipo_marca" label="Tipo/Marca"/>
                        <TextField source="placas" label="Placas"/>
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Firmas y Adicionales">
                {/* Firmas */}
                <TextField source="firmas.paciente" label="Firma del Paciente"/>
                <TextField source="firmas.testigo" label="Firma del Testigo"/>
                <TextField source="firmas.paramedico" label="Firma del Paramédico"/>
                <TextField source="firmas.medico_recibe" label="Firma del Médico que Recibe"/>
                
                {/* Adicionales */}
                <TextField source="adicionales.reporte_escaneado" label="Reporte Escaneado"/>
                <ReferenceField source="adicionales.turnoId" reference="turnos" label="Turno">
                    <TextField source="nombre"/>
                </ReferenceField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);
