// reportes/reporte_urbano/components/ReporteUrbanoShow.tsx
import { 
    Show, TabbedShowLayout, TextField, ReferenceField, DateField, 
    FunctionField, ArrayField, Datagrid, NumberField, ImageField, 
    ReferenceArrayField
} from "react-admin";

export const ReporteUrbanoShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Datos Generales">
                <DateField source="datos_generales.fecha" label="Día" locales="es-MX" options={{weekday: 'long'}}/>
                <DateField source="datos_generales.fecha" label="Fecha"/>
                <DateField source="datos_generales.fecha" label="Hora" locales="es-MX" showDate={false} showTime/>
                <TextField source="datos_generales.folio" label="Folio"/>
                <ReferenceField source="datos_generales.turno_id" reference="turnos" label="Turno">
                    <TextField source="nombre"/>
                </ReferenceField>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Personal y Activación">
                <ReferenceArrayField
                    label="Personal a Cargo"
                    reference="usuarios"
                    source="personal_y_activacion.personal_a_cargo"
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
                <TextField source="personal_y_activacion.modo_activacion" label="Modo de Activación"/>
                <TextField source="personal_y_activacion.tipo_servicio" label="Tipo de Servicio"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Atención de Emergencia">
                <DateField source="atencion_emergencia.fecha_hora_atencion" label="Fecha y Hora de Atención" showTime/>
                <NumberField source="atencion_emergencia.tiempo_traslado_minutos" label="Tiempo de Traslado (min)"/>
                <NumberField source="atencion_emergencia.km_recorridos" label="Kilómetros Recorridos"/>
                <TextField source="atencion_emergencia.ubicacion.calle" label="Calle" />
                <TextField source="atencion_emergencia.ubicacion.colonia" label="Colonia" />
                <TextField source="atencion_emergencia.ubicacion.alcaldia" label="Alcaldía" />
                <TextField source="atencion_emergencia.ubicacion.estado" label="Estado" />
                <TextField source="atencion_emergencia.ubicacion.municipio" label="Municipio" />
                <TextField source="atencion_emergencia.ubicacion.codigo_postal" label="Codigo Postal"/>
                <FunctionField 
                    source="atencion_emergencia.ubicacion.coordenadas" 
                    label="Coordenadas"
                    render={record => 
                        record.atencion_emergencia?.ubicacion?.coordenadas ? 
                        `${record.atencion_emergencia.ubicacion.coordenadas[1]}, ${record.atencion_emergencia.ubicacion.coordenadas[0]}`
                        : ''
                    }
                />
                <TextField source="atencion_emergencia.ubicacion.referencia" label="Referencia de Ubicación"/>
                <TextField source="atencion_emergencia.gravedad_emergencia" label="Gravedad de la Emergencia"/>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Acciones Realizadas">
                <TextField source="acciones_realizadas.trabajos_realizados" label="Trabajos Realizados"/>
                <TextField source="acciones_realizadas.conclusion_dictamen" label="Conclusión/Dictamen"/>
                
                <ArrayField source="acciones_realizadas.observaciones" label="Observaciones">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="texto" label="Observación"/>
                        <ArrayField source="fotos" label="Fotos">
                            <Datagrid bulkActionButtons={false} rowClick={false}>
                                <ImageField source="src" title="title" label=""/>
                            </Datagrid>
                        </ArrayField>
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Responsables y Autoridades">
                <ArrayField source="responsables_y_autoridades.responsables" label="Responsables">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="relacion" label="Relación"/>
                        <TextField source="nombre" label="Nombre"/>
                        <TextField source="telefono" label="Teléfono"/>
                        <TextField source="direccion" label="Dirección"/>
                        <TextField source="identificacion" label="Identificación"/>
                    </Datagrid>
                </ArrayField>

                <ArrayField source="responsables_y_autoridades.autoridades_participantes" label="Autoridades Participantes">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="institucion" label="Institución"/>
                        <TextField source="unidad" label="Unidad"/>
                        <TextField source="responsable" label="Responsable"/>
                        <TextField source="matricula" label="Matrícula"/>
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);