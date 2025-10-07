import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, SimpleShowLayout, TextField, ReferenceField, DateField, FunctionField, ArrayField, Datagrid, NumberField } from "react-admin";

export const ReporteUrbanoList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `Folio: ${record.datos_generales?.folio}`}
                    secondaryText={(record) => `Fecha: ${record.datos_generales?.fecha}`}
                    tertiaryText={(record) => `Tipo de Servicio: ${record.personal_y_activacion?.tipo_servicio}`}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="datos_generales.folio" label="Folio"/>
                    <DataTable.Col source="datos_generales.fecha" label="Fecha">
                        <DateField source="datos_generales.fecha" />
                    </DataTable.Col>
                    <DataTable.Col source="datos_generales.dia" label="Día"/>
                    <DataTable.Col source="personal_y_activacion.tipo_servicio" label="Tipo de Servicio"/>
                    <DataTable.Col source="personal_y_activacion.modo_activacion" label="Modo de Activación"/>
                    <DataTable.Col source="atencion_emergencia.gravedad_emergencia" label="Gravedad"/>
                    <DataTable.Col label="Turno">
                        <ReferenceField source="datos_generales.turno_id" reference="turnos">
                            <TextField source="nombre" />
                        </ReferenceField>
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}

export const ReporteUrbanoShow = () => (
    <Show>
        <SimpleShowLayout>
            {/* Datos Generales */}
            <TextField source="datos_generales.dia" label="Día"/>
            <DateField source="datos_generales.fecha" label="Fecha"/>
            <FunctionField 
                label="Hora"
                render={record => 
                    record.datos_generales?.hora ? 
                    new Date(`2000-01-01T${record.datos_generales.hora}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                    : ''
                }
            />
            <TextField source="datos_generales.folio" label="Folio"/>
            <ReferenceField source="datos_generales.turno_id" reference="turnos" label="Turno">
                <TextField source="nombre" />
            </ReferenceField>

            {/* Personal y Activación */}
            <ArrayField source="personal_y_activacion.personal_a_cargo" label="Personal a Cargo">
                <Datagrid bulkActionButtons={false} rowClick={false}>
                    <ReferenceField source="personal_id" reference="usuarios" label="Personal">
                        <FunctionField render={record => `${record.nombre} ${record.apellido}`} />
                    </ReferenceField>
                    <ReferenceField source="personal_id" reference="usuarios" label="Rol">
                        <ReferenceField source="rol_id" reference="roles" link={false}>
                            <TextField source="nombre" />
                        </ReferenceField>
                    </ReferenceField>
                </Datagrid>
            </ArrayField>
            <TextField source="personal_y_activacion.modo_activacion" label="Modo de Activación"/>
            <TextField source="personal_y_activacion.tipo_servicio" label="Tipo de Servicio"/>

            {/* Atención de Emergencia */}
            <DateField source="atencion_emergencia.fecha_hora_atencion" label="Fecha y Hora de Atención" showTime/>
            <NumberField source="atencion_emergencia.tiempo_traslado_minutos" label="Tiempo de Traslado (min)"/>
            <NumberField source="atencion_emergencia.km_recorridos" label="Kilómetros Recorridos"/>
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

            {/* Acciones Realizadas */}
            <TextField source="acciones_realizadas.trabajos_realizados" label="Trabajos Realizados"/>
            <TextField source="acciones_realizadas.conclusion_dictamen" label="Conclusión/Dictamen"/>

            {/* Observaciones */}
            <ArrayField source="acciones_realizadas.observaciones" label="Observaciones">
                <Datagrid bulkActionButtons={false} rowClick={false}>
                    <TextField source="texto" label="Observación"/>
                    <TextField source="url_foto" label="URL de Foto"/>
                </Datagrid>
            </ArrayField>

            {/* Responsables */}
            <ArrayField source="responsables_y_autoridades.responsables" label="Responsables">
                <Datagrid bulkActionButtons={false} rowClick={false}>
                    <TextField source="relacion" label="Relación"/>
                    <TextField source="nombre" label="Nombre"/>
                    <TextField source="telefono" label="Teléfono"/>
                    <TextField source="direccion" label="Dirección"/>
                    <TextField source="identificacion" label="Identificación"/>
                </Datagrid>
            </ArrayField>

            {/* Autoridades Participantes */}
            <ArrayField source="responsables_y_autoridades.autoridades_participantes" label="Autoridades Participantes">
                <Datagrid bulkActionButtons={false} rowClick={false}>
                    <TextField source="institucion" label="Institución"/>
                    <TextField source="unidad" label="Unidad"/>
                    <TextField source="responsable" label="Responsable"/>
                    <TextField source="matricula" label="Matrícula"/>
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);

export const ReporteUrbanoEdit = () => (
    <Show>
        <SimpleShowLayout>
            {/* Solo lectura - Los reportes urbanos normalmente no se editan */}
            <TextField source="datos_generales.folio" label="Folio"/>
            <TextField source="datos_generales.dia" label="Día"/>
            <DateField source="datos_generales.fecha" label="Fecha"/>
            <TextField source="personal_y_activacion.tipo_servicio" label="Tipo de Servicio"/>
            <TextField source="atencion_emergencia.gravedad_emergencia" label="Gravedad"/>
            <TextField source="acciones_realizadas.trabajos_realizados" label="Trabajos Realizados"/>
        </SimpleShowLayout>
    </Show>
);

export const ReporteUrbanoCreate = () => (
    <Show>
        <SimpleShowLayout>
            {/* Los reportes urbanos se crean desde formularios específicos */}
            <TextField source="mensaje" defaultValue="Los reportes urbanos se crean desde formularios específicos de campo" />
        </SimpleShowLayout>
    </Show>
);