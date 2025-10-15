// reportes/reporte_urbano/data/choices.ts
export const tipoServicioChoices = [
    { id: 'Mitigacion', name: 'Mitigación' },
    { id: 'Evaluacion', name: 'Evaluación' },
];

export const subtipoChoices = {
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
    ],
};

export const alcaldiasCDMX = [
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

export const atencionChoices = [
    {id: "Enfermedad", name: "Enfermedad"},
    {id: "Traumatismo", name: "Traumatismo"},
    {id: "Ginecoobstetricio", name: "Ginecoobstetricio"}
];

export const gravedadChoices = [
    { id: "Baja", name: "Baja" },
    { id: "Moderada", name: "Moderada" },
    { id: "Grave", name: "Grave" }
];

export const modoActivacionChoices = [
    { id: 'Llamada de emergencia', name: 'Llamada de Emergencia' },
    { id: 'Seguimiento de llamada', name: 'Seguimiento de oficio' }
];

// Opciones para la tabla APGAR
export const apgarColorChoices = [
    { id: 0, name: 'Azul cianótico' },
    { id: 1, name: 'Acrocianosis' },
    { id: 2, name: 'Rosado completamente' }
];

export const apgarFCChoices = [
    { id: 0, name: 'Ausente' },
    { id: 1, name: '< 100 / min' },
    { id: 2, name: '> 100 / min' }
];

export const apgarIrritabilidadChoices = [
    { id: 0, name: 'No respuesta' },
    { id: 1, name: 'Mueca' },
    { id: 2, name: 'Llora o retira' }
];

export const apgarTonoChoices = [
    { id: 0, name: 'Flácido' },
    { id: 1, name: 'Alguna flexión' },
    { id: 2, name: 'Movimientos activos' }
];

export const apgarRespiracionChoices = [
    { id: 0, name: 'Ausente' },
    { id: 1, name: 'Lenta irregular' },
    { id: 2, name: 'Buena, llora' }
];

export const accidentesChoices = [
    {id: 0, name: "Colision"},
    {id: 1, name: "Volcadura"},
    {id: 2, name: "Automotor"},
    {id: 3, name: "Bicicleta"},
    {id: 4, name: "Motocicleta"},
    {id: 5, name: "Maquinaria"},
    {id: 6, name: "Contra objeto fijo"},
];

export const impactoChoices = [
    {id: 0, name: "Posterior"},
    {id: 1, name: "Volcadura"},
    {id: 2, name: "Rotacional"},
    {id: 3, name: "Frontal"},
    {id: 4, name: "Lateral"},
    {id: 5, name: "Hundimiento"},
];

export const exploracionFisicaChoices = [
    { id: "DEF", name: "Deformidades" },
    { id: "CON", name: "Contusiones" },
    { id: "ABR", name: "Abrasiones" },
    { id: "PEN", name: "Penetraciones" },
    { id: "MP", name: "Movimiento paradójico" },
    { id: "CRI", name: "Crepitación" },
    { id: "HER", name: "Heridas" },
    { id: "FRA", name: "Fracturas" },
    { id: "ESB", name: "Enfisema subcutáneo" },
    { id: "QUE", name: "Quemaduras" },
    { id: "LAC", name: "Laceraciones" },
    { id: "EDE", name: "Edema" },
    { id: "AS", name: "Alteración de sensibilidad" },
    { id: "AM", name: "Alteración de movilidad" },
    { id: "DOL", name: "Dolor" },
];


export const glasgowOcularChoices = [
    { id: 4, name: "Espontánea" },
    { id: 3, name: "A la voz" },
    { id: 2, name: "Al dolor" },
    { id: 1, name: "Ninguna" },
];

export const glasgowMotoraChoices = [
    { id: 6, name: "Espontánea, normal" },
    { id: 5, name: "Localiza al tacto" },
    { id: 4, name: "Localiza al dolor" },
    { id: 3, name: "Decorticación" },
    { id: 2, name: "Descerabración" },
    { id: 1, name: "Ninguna" },
];

export const glasgowVerbalChoices = [
    { id: 5, name: "Orientada" },
    { id: 4, name: "Confusa" },
    { id: 3, name: "Palabras inapropiadas" },
    { id: 2, name: "Sonidos incomprensibles" },
    { id: 1, name: "Ninguna" },
];

export const viaAereaChoices = [
    {id:1, name:"Aspiracion"},
    {id:2, name:"Canula orofaringea"},
    {id:3, name:"Canula nasofaringea"},
    {id:4, name:"Intubacion orotraqueal"},
    {id:5, name:"Combitubo"},
    {id:6, name:"Intubacion nasotraqueal"},
    {id:7, name:"Mascarilla laringea"},
    {id:8, name:"Oricotiroidotomia por puncion"},
]

export const asistenciaVentilatoriaChoices = [
    { id: "balon_valvula_mascarilla", name: "Balón-válvula mascarilla" },
    { id: "valvula_demanda", name: "Válvula de demanda" },
    { id: "hiperventilacion", name: "Hiperventilación" },
    { id: "puntas_nasales", name: "Puntas nasales" },
    { id: "mascarilla_simple", name: "Mascarilla simple" },
    { id: "ventilador_automatico", name: "Ventilador automático" },
    { id: "hemitorax_derecho", name: "Hemitorax derecho" },
    { id: "hemitorax_izquierdo", name: "Hemitorax izquierdo" },
    { id: "descompresion_pleural_aguja", name: "Descompresión pleural con aguja" },
    { id: "mascarilla_reservorio", name: "Mascarilla con reservorio" },
    { id: "mascarilla_venturi", name: "Mascarilla venturi" },
];

export const controlHemorragiasChoices = [
    { id: "presion_directa", name: "Presión directa" },
    { id: "presion_indirecta", name: "Presión indirecta" },
    { id: "gravedad", name: "Gravedad" },
    { id: "vendaje_compresivo", name: "Vendaje compresivo" },
    { id: "criotrapia", name: "Crioterapia" },
    { id: "mast", name: "MAST" },
];

export const viasVenosasChoices = [
    { id: "hartmann", name: "Hartmann" },
    { id: "nacl_09", name: "NaCl 0.9%" },
    { id: "mixta", name: "Mixta" },
    { id: "glucosa_5", name: "Glucosa 5%" },
    { id: "otra", name: "Otra" },
];

export const atencionBasicaChoices = [
    { id: "rcp_basica", name: "RCP básica" },
    { id: "rcp_avanzada", name: "RCP avanzada" },
    { id: "curacion", name: "Curación" },
    { id: "empaquetamiento", name: "Empaquetamiento" },
    { id: "inmovilizacion_extremidades", name: "Inmovilización de extremidades" },
    { id: "vendaje", name: "Vendaje" },
];