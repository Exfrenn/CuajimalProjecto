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
    { id: "Cuajimalpa de Morelos", name: "Cuajimalpa de Morelos" },
    { id: "Miguel Hidalgo", name: "Miguel Hidalgo" },
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
    {id:"Aspiracion", name:"Aspiracion"},
    {id:"Canula orofaringea", name:"Canula orofaringea"},
    {id:"Canula nasofaringea", name:"Canula nasofaringea"},
    {id:"Intubacion orotraqueal", name:"Intubacion orotraqueal"},
    {id:"Combitubo", name:"Combitubo"},
    {id:"Intubacion nasotraqueal", name:"Intubacion nasotraqueal"},
    {id:"Mascarilla laringea", name:"Mascarilla laringea"},
    {id:"Oricotiroidotomia por puncion", name:"Oricotiroidotomia por puncion"},
]

export const asistenciaVentilatoriaChoices = [
    { id: "Balón-válvula mascarilla", name: "Balón-válvula mascarilla" },
    { id: "Válvula de demanda", name: "Válvula de demanda" },
    { id: "Hiperventilación", name: "Hiperventilación" },
    { id: "Puntas nasales", name: "Puntas nasales" },
    { id: "Mascarilla simple", name: "Mascarilla simple" },
    { id: "Ventilador automático", name: "Ventilador automático" },
    { id: "Hemitorax derecho", name: "Hemitorax derecho" },
    { id: "Hemitorax izquierdo", name: "Hemitorax izquierdo" },
    { id: "Descompresión pleural con aguja", name: "Descompresión pleural con aguja" },
    { id: "Mascarilla con reservorio", name: "Mascarilla con reservorio" },
    { id: "Mascarilla venturi", name: "Mascarilla venturi" },
];

export const controlHemorragiasChoices = [
    { id: "Presión directa", name: "Presión directa" },
    { id: "Presión indirecta", name: "Presión indirecta" },
    { id: "Gravedad", name: "Gravedad" },
    { id: "Vendaje compresivo", name: "Vendaje compresivo" },
    { id: "Crioterapia", name: "Crioterapia" },
    { id: "MAST", name: "MAST" },
];

export const viasVenosasChoices = [
    { id: "Hartmann", name: "Hartmann" },
    { id: "NaCl 0.9%", name: "NaCl 0.9%" },
    { id: "Mixta", name: "Mixta" },
    { id: "Glucosa 5%", name: "Glucosa 5%" },
    { id: "Otra", name: "Otra" },
];

export const atencionBasicaChoices = [
    { id: "RCP básica", name: "RCP básica" },
    { id: "RCP avanzada", name: "RCP avanzada" },
    { id: "Curación", name: "Curación" },
    { id: "Empaquetamiento", name: "Empaquetamiento" },
    { id: "Inmovilización de extremidades", name: "Inmovilización de extremidades" },
    { id: "Vendaje", name: "Vendaje" },
];