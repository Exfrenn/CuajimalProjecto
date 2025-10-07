import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "./MakeClusterGroup";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { useGetList } from "react-admin";

// Definir el tipo para los reportes
interface ReporteUrbano {
    id: number;
    datos_generales: {
        folio: string;
        fecha: string;
        dia: string;
        turno_id: number;
    };
    atencion_emergencia: {
        ubicacion: {
            coordenadas: [number, number]; // [longitud, latitud]
            referencia: string;
        };
        gravedad_emergencia: string;
    };
    personal_y_activacion: {
        tipo_servicio: string;
    };
}

const MapView: React.FC = () => {
    // Obtener los reportes urbanos
    const { data: reportes, isLoading, error } = useGetList<ReporteUrbano>('reportes_urbanos');

    if (isLoading) return <div>Cargando mapa...</div>;
    if (error) return <div>Error al cargar reportes</div>;

    // Filtrar reportes que tengan coordenadas válidas
    const reportesConCoordenadas = reportes?.filter(reporte => 
        reporte.atencion_emergencia?.ubicacion?.coordenadas &&
        Array.isArray(reporte.atencion_emergencia.ubicacion.coordenadas) &&
        reporte.atencion_emergencia.ubicacion.coordenadas.length === 2
    ) || [];

    // Centro del mapa (puedes usar la primera coordenada o una coordenada fija)
    const centroMapa: [number, number] = reportesConCoordenadas.length > 0 
        ? [reportesConCoordenadas[0].atencion_emergencia.ubicacion.coordenadas[1], 
           reportesConCoordenadas[0].atencion_emergencia.ubicacion.coordenadas[0]]
        : [19.357906131075882, -99.26000418042942]; // Coordenada por defecto

    return (
        <MapContainer center={centroMapa} zoom={12} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>
            {reportesConCoordenadas.map((reporte) => {
                // Las coordenadas en tu JSON están como [longitud, latitud]
                // pero Leaflet usa [latitud, longitud]
                const posicion: [number, number] = [
                    reporte.atencion_emergencia.ubicacion.coordenadas[1], // latitud
                    reporte.atencion_emergencia.ubicacion.coordenadas[0]  // longitud
                ];

                return (
                    
                    <Marker key={reporte.id} position={posicion}>
                        <Popup>
                            <div>
                                <h4><strong>Folio:</strong> {reporte.datos_generales.folio}</h4>
                                <p><strong>Tipo:</strong> {reporte.personal_y_activacion.tipo_servicio}</p>
                                <p><strong>Gravedad:</strong> {reporte.atencion_emergencia.gravedad_emergencia}</p>
                                <p><strong>Fecha:</strong> {new Date(reporte.datos_generales.fecha).toLocaleDateString()}</p>
                                <p><strong>Referencia:</strong> {reporte.atencion_emergencia.ubicacion.referencia}</p>
                                <p><strong>Coordenadas:</strong> {posicion[0].toFixed(6)}, {posicion[1].toFixed(6)}</p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default MapView;