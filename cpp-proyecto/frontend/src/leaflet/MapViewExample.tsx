import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "./MakeClusterGroup";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import "./styles.css";

interface MarkerData {
    geocode: [number, number]; // Tupla de latitud y longitud
    popup: string;
}

const MapView = () => {

    const markers: MarkerData[] = [
        {
            geocode: [19.357906131075882, -99.26000418042942],
            popup: "Reporte 1"
        },
        {
            geocode: [19.35, -99.26],
            popup: "Reporte 2"
        }
    ];

    return(
        <MapContainer center={[19.357906131075882, -99.26000418042942]} zoom={17} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.geocode}>
                        <Popup>{marker.popup}</Popup>
                    </Marker>
                ))
                }
            </MarkerClusterGroup>
        </MapContainer>
    )
};

export default MapView;