// reportes/reporte_urbano/components/ReporteUrbanoCreate.tsx
import { 
    TabbedForm, 
    Create, 
    TextInput, 
    DateTimeInput, 
    ReferenceInput, 
    SelectInput, 
    required, 
    SelectArrayInput, 
    ReferenceArrayInput, 
    NumberInput, 
    SimpleFormIterator, 
    ArrayInput, 
    ImageInput, 
    ImageField 
} from "react-admin";
import { useReporteNotifications } from "../hooks/useReporteNotifications";
import { SubtipoServicioInput } from "../misc/SubtipoServicioInput";
import BotonSoloCoordenadas from "../misc/BotonSoloCoordenadas";
import { 
    tipoServicioChoices, 
    alcaldiasCDMX, 
    gravedadChoices, 
    modoActivacionChoices, 
    institucionChoices 
} from "../../data/choices";

export const ReporteUrbanoCreate = () => {
    const { onCreateSuccess } = useReporteNotifications();

    return (
        <Create mutationOptions={{ onSuccess: onCreateSuccess }}>
            <TabbedForm warnWhenUnsavedChanges>
                <TabbedForm.Tab label="Datos Generales">
                    <DateTimeInput 
                        source="datos_generales.fecha" 
                        label="Fecha" 
                        validate={required()} 
                    />
                    <TextInput 
                        source="datos_generales.folio" 
                        label="Folio" 
                        validate={required()} 
                    />
                    <ReferenceInput 
                        label="Turno" 
                        source="datos_generales.turno_id" 
                        reference="turnos"
                    >
                        <SelectInput optionText="nombre" validate={required()} />
                    </ReferenceInput>
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Personal y Activación">
                    <ReferenceArrayInput
                        label="Personal a Cargo"
                        source="personal_y_activacion.personal_a_cargo"
                        reference="usuarios"
                    >
                        <SelectArrayInput
                            optionText={record => `${record.nombre} ${record.apellido}`}
                            optionValue="id"
                            helperText="selecciona a las personas a cargo"
                            validate={required()}
                        />
                    </ReferenceArrayInput>
                    
                    <SelectInput 
                        source="personal_y_activacion.modo_activacion"
                        label="Modo de activación" 
                        validate={required()}
                        choices={modoActivacionChoices}
                    />
                    
                    <SelectInput 
                        source="personal_y_activacion.tipo_servicio"
                        label="Tipo de servicio" 
                        validate={required()}
                        choices={tipoServicioChoices}
                    />
                    
                    <SubtipoServicioInput />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Atención de Emergencia">
                    <DateTimeInput 
                        source="atencion_emergencia.fecha_hora_atencion" 
                        label="Fecha y Hora de Atención" 
                        validate={required()} 
                    />
                    <NumberInput 
                        source="atencion_emergencia.tiempo_traslado_minutos" 
                        label="Tiempo de Traslado (min)" 
                    />
                    <NumberInput 
                        source="atencion_emergencia.km_recorridos" 
                        label="Kilómetros Recorridos" 
                    />

                    <TextInput 
                        source="atencion_emergencia.ubicacion.calle" 
                        label="Calle" 
                        fullWidth 
                        validate={required()} 
                    />
                    <TextInput 
                        source="atencion_emergencia.ubicacion.colonia" 
                        label="Colonia" 
                        fullWidth 
                        validate={required()} 
                    />
                    <SelectInput
                        source="atencion_emergencia.ubicacion.alcaldia"
                        label="Alcaldía"
                        choices={alcaldiasCDMX}
                        fullWidth
                        validate={required()}
                    />
                    <TextInput 
                        source="atencion_emergencia.ubicacion.estado" 
                        label="Estado" 
                        fullWidth 
                        validate={required()} 
                    />
                    <TextInput 
                        source="atencion_emergencia.ubicacion.municipio" 
                        label="Municipio" 
                        fullWidth 
                        validate={required()} 
                    />
                    <TextInput 
                        source="atencion_emergencia.ubicacion.codigo_postal" 
                        label="Código Postal" 
                        validate={required()} 
                        fullWidth 
                    />

                    <NumberInput 
                        source="atencion_emergencia.ubicacion.coordenadas.0" 
                        label="Longitud" 
                        fullWidth 
                    />
                    <NumberInput 
                        source="atencion_emergencia.ubicacion.coordenadas.1" 
                        label="Latitud" 
                        fullWidth 
                    />
                    <TextInput 
                        source="atencion_emergencia.ubicacion.referencia" 
                        label="Referencia" 
                        fullWidth 
                    />

                    <BotonSoloCoordenadas />
                    
                    <SelectInput 
                        source="atencion_emergencia.gravedad_emergencia" 
                        label="Gravedad de la Emergencia" 
                        validate={required()} 
                        choices={gravedadChoices}
                    />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Acciones Realizadas">
                    <TextInput 
                        source="acciones_realizadas.trabajos_realizados" 
                        label="Trabajos Realizados" 
                        validate={required()} 
                    />
                    <TextInput 
                        source="acciones_realizadas.conclusion_dictamen" 
                        label="Conclusión/Dictamen" 
                        validate={required()} 
                    />
                    
                    <ArrayInput source="acciones_realizadas.observaciones" label="Observaciones">
                        <SimpleFormIterator>
                            <TextInput 
                                source="texto" 
                                label="Observación" 
                                fullWidth 
                                multiline 
                                rows={3} 
                            />
                            <ImageInput 
                                source="fotos" 
                                label="Fotos de esta observación" 
                                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                                multiple
                                maxSize={5000000}
                                placeholder={<p>Arrastra las imágenes de esta observación aquí</p>}
                            >
                                <ImageField source="src" title="title" />
                            </ImageInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Responsables y Autoridades">
                    <ArrayInput source="responsables_y_autoridades.responsables" label="Responsables">
                        <SimpleFormIterator>
                            <TextInput 
                                source="relacion" 
                                label="Relación" 
                                fullWidth 
                                validate={required()} 
                            />
                            <TextInput 
                                source="nombre" 
                                label="Nombre" 
                                fullWidth 
                                validate={required()} 
                            />
                            <TextInput 
                                source="telefono" 
                                label="Teléfono" 
                                fullWidth 
                                validate={required()} 
                            />
                            <TextInput 
                                source="direccion" 
                                label="Dirección" 
                                fullWidth 
                                validate={required()} 
                            />
                            <TextInput 
                                source="identificacion" 
                                label="Identificación" 
                                fullWidth 
                                validate={required()} 
                            />
                        </SimpleFormIterator>
                    </ArrayInput>

                    <ArrayInput source="responsables_y_autoridades.autoridades_participantes" label="Autoridades Participantes">
                        <SimpleFormIterator>
                            <SelectInput 
                                source="institucion" 
                                label="Institución" 
                                fullWidth
                                choices={institucionChoices}
                                validate={required()}
                            />
                            <TextInput 
                                source="unidad" 
                                label="Unidad" 
                                fullWidth 
                                validate={required()} 
                            />
                            <TextInput 
                                source="responsable" 
                                label="Responsable" 
                                fullWidth 
                                validate={required()} 
                            />
                            <TextInput 
                                source="matricula" 
                                label="Matrícula" 
                                fullWidth 
                                validate={required()} 
                            />
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    );
};