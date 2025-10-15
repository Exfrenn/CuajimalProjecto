// reportes/reporte_urbano/components/ReporteUrbanoEdit.tsx
import { 
    TabbedForm, 
    Edit, 
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
    ImageField, 
    useCreate,
    TabbedFormTabs
} from "react-admin";
import { Stack, useMediaQuery, Theme } from "@mui/material";
import { useReporteNotifications } from "../hooks/useReporteNotifications";
import { SubtipoServicioInput } from "../misc/SubtipoServicioInput";
import BotonSoloCoordenadas from "../misc/BotonSoloCoordenadas";
import { SectionCard } from "../../components/SectionCard";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import GavelIcon from '@mui/icons-material/Gavel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { 
    tipoServicioChoices, 
    alcaldiasCDMX, 
    gravedadChoices, 
    modoActivacionChoices, 
} from "../../data/choices";

export const ReporteUrbanoEdit = () => {
    const { onEditSuccess } = useReporteNotifications();
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    
    return (
        <Edit mutationOptions={{ onSuccess: onEditSuccess }}>
            <TabbedForm warnWhenUnsavedChanges tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />}>
                <TabbedForm.Tab label="Datos Generales">
                    <SectionCard title="Información del Reporte" icon={<AccessTimeIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <DateTimeInput 
                                source="datos_generales.fecha" 
                                label="Fecha" 
                                validate={required()} 
                                fullWidth
                            />
                            <TextInput 
                                source="datos_generales.folio" 
                                label="Folio" 
                                validate={required()} 
                                fullWidth
                            />
                        </Stack>
                        <ReferenceInput 
                            label="Turno" 
                            source="datos_generales.turno_id" 
                            reference="turnos"
                        >
                            <SelectInput optionText="nombre" validate={required()} fullWidth />
                        </ReferenceInput>
                    </SectionCard>
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Personal y Activación">
                    <SectionCard title="Personal a Cargo" icon={<GroupIcon />}>
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
                                fullWidth
                            />
                        </ReferenceArrayInput>
                    </SectionCard>
                    
                    <SectionCard title="Activación del Servicio" icon={<LocalFireDepartmentIcon />}>
                        <SelectInput 
                            source="personal_y_activacion.modo_activacion"
                            label="Modo de activación" 
                            validate={required()}
                            choices={modoActivacionChoices}
                            fullWidth
                        />
                        
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput 
                                source="personal_y_activacion.tipo_servicio"
                                label="Tipo de servicio" 
                                validate={required()}
                                choices={tipoServicioChoices}
                                fullWidth
                            />
                            
                            <SubtipoServicioInput />
                        </Stack>
                    </SectionCard>
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Atención de Emergencia">
                    <SectionCard title="Tiempo y Distancia" icon={<AccessTimeIcon />}>
                        <DateTimeInput 
                            source="atencion_emergencia.fecha_hora_atencion" 
                            label="Fecha y Hora de Atención" 
                            validate={required()} 
                            fullWidth
                        />
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <NumberInput 
                                source="atencion_emergencia.tiempo_traslado_minutos" 
                                label="Tiempo de Traslado (min)" 
                                fullWidth
                            />
                            <NumberInput 
                                source="atencion_emergencia.km_recorridos" 
                                label="Kilómetros Recorridos" 
                                fullWidth
                            />
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Ubicación del Servicio" icon={<LocationOnIcon />}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
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
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <SelectInput
                                source="atencion_emergencia.ubicacion.alcaldia"
                                label="Alcaldía"
                                choices={alcaldiasCDMX}
                                fullWidth
                                validate={required()}
                            />
                            <TextInput 
                                source="atencion_emergencia.ubicacion.codigo_postal" 
                                label="Código Postal" 
                                validate={required()} 
                                fullWidth 
                            />
                        </Stack>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
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
                        </Stack>

                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
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
                        </Stack>
                        <TextInput 
                            source="atencion_emergencia.ubicacion.referencia" 
                            label="Referencia" 
                            fullWidth 
                        />
                        
                        <BotonSoloCoordenadas />
                    </SectionCard>
                    
                    <SectionCard title="Gravedad" icon={<LocalFireDepartmentIcon />}>
                        <SelectInput 
                            source="atencion_emergencia.gravedad_emergencia" 
                            label="Gravedad de la Emergencia" 
                            validate={required()} 
                            choices={gravedadChoices}
                            fullWidth
                        />
                    </SectionCard>
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Acciones Realizadas">
                    <SectionCard title="Trabajos Realizados" icon={<BuildIcon />}>
                        <TextInput 
                            source="acciones_realizadas.trabajos_realizados" 
                            label="Trabajos Realizados" 
                            validate={required()} 
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <TextInput 
                            source="acciones_realizadas.conclusion_dictamen" 
                            label="Conclusión/Dictamen" 
                            validate={required()} 
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </SectionCard>
                    
                    <SectionCard title="Observaciones y Fotografías" icon={<CameraAltIcon />}>
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
                    </SectionCard>
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Responsables y Autoridades">
                    <SectionCard title="Responsables" icon={<GroupIcon />}>
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
                                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                                    <TextInput 
                                        source="telefono" 
                                        label="Teléfono" 
                                        fullWidth 
                                        validate={required()} 
                                    />
                                    <TextInput 
                                        source="identificacion" 
                                        label="Identificación" 
                                        fullWidth 
                                        validate={required()} 
                                    />
                                </Stack>
                                <TextInput 
                                    source="direccion" 
                                    label="Dirección" 
                                    fullWidth 
                                    validate={required()} 
                                />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SectionCard>

                    <SectionCard title="Autoridades Participantes" icon={<GavelIcon />}>
                        <ArrayInput source="responsables_y_autoridades.autoridades_participantes" label="Autoridades Participantes">
                            <SimpleFormIterator>
                                <InstitucionInput/>
                                <TextInput 
                                    source="unidad" 
                                    label="Unidad" 
                                    fullWidth 
                                    validate={required()} 
                                />
                                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
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
                                </Stack>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SectionCard>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
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