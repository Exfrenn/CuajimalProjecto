import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";

interface SingleMarkerMapProps {
  lat: number;
  lng: number;
  popupContent?: string;
  zoom?: number;
}

export default function SingleMarkerMap({ lat, lng, popupContent, zoom = 15 }: SingleMarkerMapProps) {
  return (
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]}>
        {popupContent && <Popup>{popupContent}</Popup>}
      </Marker>
    </MapContainer>
  );
}
