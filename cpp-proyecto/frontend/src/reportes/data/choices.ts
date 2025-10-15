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

export const gravedadChoices = [
    { id: "Baja", name: "Baja" },
    { id: "Moderada", name: "Moderada" },
    { id: "Grave", name: "Grave" }
];

export const modoActivacionChoices = [
    { id: 'Llamada de emergencia', name: 'Llamada de Emergencia' },
    { id: 'Seguimiento de llamada', name: 'Seguimiento de oficio' }
];

export const institucionChoices = [
    { id: 'Bomberos', name: 'Bomberos' },
    { id: 'Seguridad Publica', name: 'Seguridad Pública' },
    { id: 'C5', name: 'C5' },
    { id: 'Cruz Roja', name: 'Cruz Roja' },
    { id: 'Proteccion Civil Municipal', name: 'Protección Civil Municipal' },
    { id: 'Proteccion Civil Estatal', name: 'Protección Civil Estatal' },
    { id: 'CFE', name: 'CFE' },
    { id: 'SAPAC', name: 'SAPAC' },
    { id: 'Transito Municipal', name: 'Tránsito Municipal' }
];