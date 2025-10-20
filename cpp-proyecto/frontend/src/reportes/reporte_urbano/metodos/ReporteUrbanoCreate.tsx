// reportes/reporte_urbano/components/ReporteUrbanoEdit.tsx
import { 
    TabbedForm, 
    TextInput, 
    DateTimeInput, 
    ReferenceInput,
    SelectInput, 
    required, 
    NumberInput, 
    SimpleFormIterator, 
    ArrayInput, 
    ImageInput, 
    ImageField, 
    useCreate,
    TabbedFormTabs,
    Create
} from "react-admin";
import { useReporteNotifications } from "../hooks/useReporteNotifications";
import { PersonalACargo } from "../../componentes/PersonalACargo";
import { TurnoInput } from "../../componentes/TurnoInput";
import { SubtipoServicioInput } from "../misc/SubtipoServicioInput";
import BotonSoloCoordenadas from "../misc/BotonSoloCoordenadas";
import { 
    tipoServicioChoices, 
    alcaldiasCDMX, 
    gravedadChoices, 
    modoActivacionChoices, 
} from "../../data/choices";

export const ReporteUrbanoCreate = () => {
    const { onEditSuccess } = useReporteNotifications();
    
    return (
        <Create mutationOptions={{ onSuccess: onEditSuccess }}>
            <TabbedForm warnWhenUnsavedChanges tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />}>
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
                    <TurnoInput source="datos_generales.turno_id" label="Turno" />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Personal y Activación">
                    <PersonalACargo />
                    
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
                            <InstitucionInput/>
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
                label="Institución"
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