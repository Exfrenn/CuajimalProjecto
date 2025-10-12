import { useRecordContext } from "react-admin";
import SingleMarkerMap from "../../leaflet/SingleMarkerMap";

export const CoordenadasYMapa = () => {
    const record = useRecordContext();
    const coords = record?.atencion_emergencia?.ubicacion?.coordenadas;
    
    if (!coords || coords.length !== 2) return null;
    
    const [long, lat] = coords;
    
    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                <strong>Coordenadas:</strong> {lat}, {long}
            </div>
            <div style={{ height: '400px', width: '100%' }}>
                <SingleMarkerMap 
                    lat={lat} 
                    lng={long} 
                    popupContent="Ubicación del reporte" 
                />
            </div>
        </>
    );
};

export default CoordenadasYMapa;