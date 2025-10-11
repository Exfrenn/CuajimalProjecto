import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Show, TabbedShowLayout, TabbedForm, TextField, ReferenceField, DateField, FunctionField, ArrayField, Datagrid, NumberField, ImageField, Edit, SimpleForm, TextInput, DateTimeInput, useNotify, useRedirect, useRefresh, ReferenceInput, SelectInput, EditButton, required, SelectArrayInput, ReferenceArrayField, ReferenceArrayInput, NumberInput, SimpleFormIterator, ArrayInput, ImageInput, Create, SimpleShowLayout } from "react-admin";
import { useWatch } from 'react-hook-form';
import BotonGeolocalizacion from "./BotonGeolocalizacion";
import SingleMarkerMap from "../leaflet/SingleMarkerMap";
import { useRecordContext } from "react-admin";
import BotonSoloCoordenadas from "./BotonSoloCoordenadas";



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
                    <DataTable.Col>
                        <EditButton/>
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
}

function CoordenadasYMapa() {
    const record = useRecordContext();
    const coords = record?.atencion_emergencia?.ubicacion?.coordenadas;
    if (!coords || coords.length !== 2) return null;
    const [long, lat] = coords;
    return (
        <>
            <div>
                <strong>Coordenadas:</strong> {lat}, {long}
            </div>
            <SingleMarkerMap lat={lat} lng={long} popupContent="Ubicación del reporte" />
        </>
    );
}

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
                
                {/* Observaciones */}
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
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);


// Opciones principales
const tipoServicioChoices = [
    { id: 'Mitigacion', name: 'Mitigación' },
    { id: 'Evaluacion', name: 'Evaluación' },
];

// Subopciones según la opción principal
const subtipoChoices = {
    Mitigacion: [
        { id: 'Incendio', name: 'Incendio' },
        { id: 'Inundacion', name: 'Inundación' },
        { id: 'Capacitacion', name: 'Capacitación' },
        { id: 'Pirotecnia', name: 'Pirotecnia' },
        { id: 'Sustancia Peligrosa', name: 'Sustancia peligrosa' },
    ],
    Evaluacion: [
        { id: 'Evaluacion tecnica de riesgos', name: 'Evaluacion tecnica de riesgos' },
        { id: 'Planes internos de P.C.', name: 'Planes internos de P.C.' },
        { id: 'Altas de riesgo', name: 'Altas de riesgo' }
        // ...agrega más si necesitas
    ],
};

function SubtipoServicioInput() {
    const tipo = useWatch({ name: "personal_y_activacion.tipo_servicio" });
    
    // Debug: agregar console.log para ver qué está pasando
    console.log('Tipo seleccionado:', tipo);
    console.log('Subtipos disponibles:', subtipoChoices);
    
    if (!tipo || !(tipo in subtipoChoices)) {
        console.log('No se muestra subtipo porque:', { tipo, haySubtipos: tipo in subtipoChoices });
        return null;
    }
    
    return (
        <SelectInput
            source="personal_y_activacion.subtipo_servicio"
            label="Subtipo de servicio"
            choices={subtipoChoices[tipo as keyof typeof subtipoChoices]}
            validate={required()}
        />
    );
}

const alcaldiasCDMX = [
    { id: "Álvaro Obregón", name: "Álvaro Obregón" },
    { id: "Azcapotzalco", name: "Azcapotzalco" },
    { id: "Benito Juárez", name: "Benito Juárez" },
    { id: "Coyoacán", name: "Coyoacán" },
    { id: "Cuajimalpa de Morelos", name: "Cuajimalpa de Morelos" },
    { id: "Cuauhtémoc", name: "Cuauhtémoc" },
    { id: "Gustavo A. Madero", name: "Gustavo A. Madero" },
    { id: "Iztacalco", name: "Iztacalco" },
    { id: "Iztapalapa", name: "Iztapalapa" },
    { id: "La Magdalena Contreras", name: "La Magdalena Contreras" },
    { id: "Miguel Hidalgo", name: "Miguel Hidalgo" },
    { id: "Milpa Alta", name: "Milpa Alta" },
    { id: "Tláhuac", name: "Tláhuac" },
    { id: "Tlalpan", name: "Tlalpan" },
    { id: "Venustiano Carranza", name: "Venustiano Carranza" },
    { id: "Xochimilco", name: "Xochimilco" }
];

export const ReporteUrbanoEdit = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
        
    const onSuccess = () => {
        notify('Cambios guardados', {undoable:true, autoHideDuration: 5000});
        redirect('/reportes_urbanos');
        refresh();
    }
    
    return(
    <Edit mutationOptions ={{onSuccess}}>
        <TabbedForm warnWhenUnsavedChanges>
            <TabbedForm.Tab label="Datos Generales">
                <DateTimeInput source ="datos_generales.fecha" label="Fecha" validate={required()}/>
                <TextInput source="datos_generales.folio" label="Folio" validate={required()}/>
                <ReferenceInput label="Turno" source="datos_generales.turno_id" reference="turnos">
                    <SelectInput optionText="nombre" validate={required()}/>
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
                    label="Modo de activacion" 
                    validate={required()}
                    choices={[
                        {id: 'Llamada de emergencia', name: 'Llamada de Emergencia'},
                        {id: 'Seguimiento de llamada', name: 'Seguimiento de oficio'}
                    ]}/>
                <SelectInput 
                    source="personal_y_activacion.tipo_servicio"
                    label="Tipo de servicio" 
                    validate={required()}
                    choices={tipoServicioChoices}
                />
                <SubtipoServicioInput />
            </TabbedForm.Tab>

            <TabbedForm.Tab label="Atención de Emergencia">
                <DateTimeInput source="atencion_emergencia.fecha_hora_atencion" label="Fecha y Hora de Atención" validate={required()}/>
                <NumberInput source="atencion_emergencia.tiempo_traslado_minutos" label="Tiempo de Traslado (min)"/>
                <NumberInput source="atencion_emergencia.km_recorridos" label="Kilómetros Recorridos"/>
                

                <TextInput source="atencion_emergencia.ubicacion.calle" label="Calle" fullWidth validate={required()}/>
                <TextInput source="atencion_emergencia.ubicacion.colonia" label="Colonia" fullWidth validate={required()}/>
                <SelectInput
                    source="atencion_emergencia.ubicacion.alcaldia"
                    label="Alcaldía"
                    choices={alcaldiasCDMX}
                    fullWidth
                    validate={required()}
                />
                <TextInput source="atencion_emergencia.ubicacion.estado" label="Estado" fullWidth validate={required()}/>
                <TextInput source="atencion_emergencia.ubicacion.municipio" label="Municipio" fullWidth validate={required()}/>
                <TextInput source="atencion_emergencia.ubicacion.codigo_postal" label="Codigo Postal" validate={required()} fullWidth />


                <NumberInput source="atencion_emergencia.ubicacion.coordenadas.0" label="Longitud" fullWidth />
                <NumberInput source="atencion_emergencia.ubicacion.coordenadas.1" label="Latitud" fullWidth />
                <TextInput source="atencion_emergencia.ubicacion.referencia" label="Referencia" fullWidth />
                {/* <BotonGeolocalizacion />  */}
                <BotonSoloCoordenadas/>      
                
                <SelectInput source="atencion_emergencia.gravedad_emergencia" label="Gravedad de la Emergencia" validate={required()} choices={[
                    {id: "Baja", name: "Baja"},
                    {id: "Moderada", name: "Moderada"},
                    {id: "Grave", name: "Grave"}
                ]}
                />
            </TabbedForm.Tab>

            <TabbedForm.Tab label="Acciones Realizadas">
                <TextInput source="acciones_realizadas.trabajos_realizados" label="Trabajos Realizados" validate={required()}/>
                <TextInput source="acciones_realizadas.conclusion_dictamen" label="Conclusion/Dictamen" validate={required()}/>
                
                {/* Observaciones con imágenes */}
                <ArrayInput source="acciones_realizadas.observaciones" label="Observaciones">
                    <SimpleFormIterator>
                        <TextInput source="texto" label="Observación" fullWidth multiline rows={3} />
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
                {/* Responsables */}
                <ArrayInput source="responsables_y_autoridades.responsables" label="Responsables">
                    <SimpleFormIterator>
                        <TextInput source="relacion" label="Relación" fullWidth validate={required()}/>
                        <TextInput source="nombre" label="Nombre" fullWidth validate={required()}/>
                        <TextInput source="telefono" label="Teléfono" fullWidth validate={required()}/>
                        <TextInput source="direccion" label="Dirección" fullWidth validate={required()}/>
                        <TextInput source="identificacion" label="Identificación" fullWidth validate={required()}/>
                    </SimpleFormIterator>
                </ArrayInput>

                {/* Autoridades Participantes */}
                <ArrayInput source="responsables_y_autoridades.autoridades_participantes" label="Autoridades Participantes">
                    <SimpleFormIterator>
                        <SelectInput 
                            source="institucion" 
                            label="Institución" 
                            fullWidth
                            choices={[
                                { id: 'Bomberos', name: 'Bomberos' },
                                { id: 'Seguridad Publica', name: 'Seguridad Pública' },
                                { id: 'C5', name: 'C5' },
                                { id: 'Cruz Roja', name: 'Cruz Roja' },
                                { id: 'Proteccion Civil Municipal', name: 'Protección Civil Municipal' },
                                { id: 'Proteccion Civil Estatal', name: 'Protección Civil Estatal' },
                                { id: 'CFE', name: 'CFE' },
                                { id: 'SAPAC', name: 'SAPAC' },
                                { id: 'Transito Municipal', name: 'Tránsito Municipal' }
                            ]}
                            validate={required()}
                        />
                        <TextInput source="unidad" label="Unidad" fullWidth validate={required()}/>
                        <TextInput source="responsable" label="Responsable" fullWidth validate={required()}/>
                        <TextInput source="matricula" label="Matrícula" fullWidth validate={required()}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
    )
};

export const ReporteUrbanoCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = () => {
        notify('Reporte urbano creado exitosamente', { type: 'success', undoable: true, autoHideDuration: 5000 });
        redirect('/reportes_urbanos');
        refresh();
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <TabbedForm warnWhenUnsavedChanges>
                <TabbedForm.Tab label="Datos Generales">
                    <DateTimeInput source ="datos_generales.fecha" label="Fecha" validate={required()}/>
                    <TextInput source="datos_generales.folio" label="Folio" validate={required()}/>
                    <ReferenceInput label="Turno" source="datos_generales.turno_id" reference="turnos">
                        <SelectInput optionText="nombre" validate={required()}/>
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
                        label="Modo de activacion" 
                        validate={required()}
                        choices={[
                            {id: 'Llamada de emergencia', name: 'Llamada de Emergencia'},
                            {id: 'Seguimiento de llamada', name: 'Seguimiento de oficio'}
                        ]}/>
                    <SelectInput 
                        source="personal_y_activacion.tipo_servicio"
                        label="Tipo de servicio" 
                        validate={required()}
                        choices={tipoServicioChoices}
                    />
                    <SubtipoServicioInput />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Atención de Emergencia">
                    <DateTimeInput source="atencion_emergencia.fecha_hora_atencion" label="Fecha y Hora de Atención" validate={required()}/>
                    <NumberInput source="atencion_emergencia.tiempo_traslado_minutos" label="Tiempo de Traslado (min)"/>
                    <NumberInput source="atencion_emergencia.km_recorridos" label="Kilómetros Recorridos"/>
                    

                    <TextInput source="atencion_emergencia.ubicacion.calle" label="Calle" fullWidth validate={required()}/>
                    <TextInput source="atencion_emergencia.ubicacion.colonia" label="Colonia" fullWidth validate={required()}/>
                    <SelectInput
                        source="atencion_emergencia.ubicacion.alcaldia"
                        label="Alcaldía"
                        choices={alcaldiasCDMX}
                        fullWidth
                        validate={required()}
                    />
                    <TextInput source="atencion_emergencia.ubicacion.estado" label="Estado" fullWidth validate={required()}/>
                    <TextInput source="atencion_emergencia.ubicacion.municipio" label="Municipio" fullWidth validate={required()}/>
                    <TextInput source="atencion_emergencia.ubicacion.codigo_postal" label="Codigo Postal" validate={required()} fullWidth />


                    <NumberInput source="atencion_emergencia.ubicacion.coordenadas.0" label="Longitud" fullWidth />
                    <NumberInput source="atencion_emergencia.ubicacion.coordenadas.1" label="Latitud" fullWidth />
                    <TextInput source="atencion_emergencia.ubicacion.referencia" label="Referencia" fullWidth />
                    {/* <BotonGeolocalizacion />  */}
                    <BotonSoloCoordenadas/>        
                    
                    <SelectInput source="atencion_emergencia.gravedad_emergencia" label="Gravedad de la Emergencia" validate={required()} choices={[
                        {id: "Baja", name: "Baja"},
                        {id: "Moderada", name: "Moderada"},
                        {id: "Grave", name: "Grave"}
                    ]}
                    />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Acciones Realizadas">
                    <TextInput source="acciones_realizadas.trabajos_realizados" label="Trabajos Realizados" validate={required()}/>
                    <TextInput source="acciones_realizadas.conclusion_dictamen" label="Conclusion/Dictamen" validate={required()}/>
                    
                    {/* Observaciones con imágenes */}
                    <ArrayInput source="acciones_realizadas.observaciones" label="Observaciones">
                        <SimpleFormIterator>
                            <TextInput source="texto" label="Observación" fullWidth multiline rows={3} />
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
                    {/* Responsables */}
                    <ArrayInput source="responsables_y_autoridades.responsables" label="Responsables">
                        <SimpleFormIterator>
                            <TextInput source="relacion" label="Relación" fullWidth validate={required()}/>
                            <TextInput source="nombre" label="Nombre" fullWidth validate={required()}/>
                            <TextInput source="telefono" label="Teléfono" fullWidth validate={required()}/>
                            <TextInput source="direccion" label="Dirección" fullWidth validate={required()}/>
                            <TextInput source="identificacion" label="Identificación" fullWidth validate={required()}/>
                        </SimpleFormIterator>
                    </ArrayInput>

                    {/* Autoridades Participantes */}
                    <ArrayInput source="responsables_y_autoridades.autoridades_participantes" label="Autoridades Participantes">
                        <SimpleFormIterator>
                            <SelectInput 
                                source="institucion" 
                                label="Institución" 
                                fullWidth
                                choices={[
                                    { id: 'Bomberos', name: 'Bomberos' },
                                    { id: 'Seguridad Publica', name: 'Seguridad Pública' },
                                    { id: 'C5', name: 'C5' },
                                    { id: 'Cruz Roja', name: 'Cruz Roja' },
                                    { id: 'Proteccion Civil Municipal', name: 'Protección Civil Municipal' },
                                    { id: 'Proteccion Civil Estatal', name: 'Protección Civil Estatal' },
                                    { id: 'CFE', name: 'CFE' },
                                    { id: 'SAPAC', name: 'SAPAC' },
                                    { id: 'Transito Municipal', name: 'Tránsito Municipal' }
                                ]}
                                validate={required()}
                            />
                            <TextInput source="unidad" label="Unidad" fullWidth validate={required()}/>
                            <TextInput source="responsable" label="Responsable" fullWidth validate={required()}/>
                            <TextInput source="matricula" label="Matrícula" fullWidth validate={required()}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    );
};