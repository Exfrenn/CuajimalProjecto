import { useState, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import AlcaldiasLayer from "./AlcaldiasLayer";
import MarkerClusterGroup from "./MakeClusterGroup";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export interface ReporteUrbano {
  id: number;
  datos_generales: { folio: string; fecha: string };
  atencion_emergencia: {
    ubicacion: {
      coordenadas: [number, number]; // [long, lat]
      referencia: string;
      alcaldia?: string;
    };
    gravedad_emergencia: string;
  };
  personal_y_activacion: { tipo_servicio: string };
}

interface ClusteredMapProps {
  reportes: ReporteUrbano[];
  alcaldiasGeojson: any;
}

export default function ClusteredMap({ reportes, alcaldiasGeojson }: ClusteredMapProps) {
  const agrupadosPorAlcaldia = useMemo(() => {
    return reportes.reduce((acc, rep) => {
      const alcaldia = rep.atencion_emergencia.ubicacion.alcaldia || "Sin alcaldía";
      if (!acc[alcaldia]) acc[alcaldia] = [];
      acc[alcaldia].push(rep);
      return acc;
    }, {} as Record<string, ReporteUrbano[]>);
  }, [reportes]);

  const [alcaldiaSeleccionada, setAlcaldiaSeleccionada] = useState<string | null>(null);

  const reportesConCoord = useMemo(() => {
    const base = alcaldiaSeleccionada
      ? agrupadosPorAlcaldia[alcaldiaSeleccionada] || []
      : reportes;
    return base.filter(r =>
      r.atencion_emergencia?.ubicacion?.coordenadas?.length === 2
    );
  }, [alcaldiaSeleccionada, agrupadosPorAlcaldia, reportes]);

  const centro: [number, number] = reportesConCoord.length > 0
    ? [
        reportesConCoord[0].atencion_emergencia.ubicacion.coordenadas[1],
        reportesConCoord[0].atencion_emergencia.ubicacion.coordenadas[0],
      ]
    : [19.4326, -99.1332];

  return (
    <div>
      <div style={{ marginBottom: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
        {Object.keys(agrupadosPorAlcaldia).map(alcaldia => (
          <button
            key={alcaldia}
            onClick={() => setAlcaldiaSeleccionada(alcaldia)}
            style={{
              margin: 2,
              background: alcaldiaSeleccionada === alcaldia ? "#3388ff" : "#eee",
              color: alcaldiaSeleccionada === alcaldia ? "#fff" : "#333",
              border: "none",
              borderRadius: 4,
              padding: "4px 10px",
              cursor: "pointer"
            }}
          >
            {alcaldia}
          </button>
        ))}
        <button
          onClick={() => setAlcaldiaSeleccionada(null)}
          style={{
            margin: 2,
            background: alcaldiaSeleccionada === null ? "#3388ff" : "#eee",
            color: alcaldiaSeleccionada === null ? "#fff" : "#333",
            border: "none",
            borderRadius: 4,
            padding: "4px 10px",
            cursor: "pointer"
          }}
        >
          Todas
        </button>
      </div>
      <MapContainer center={centro} zoom={11}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AlcaldiasLayer geojson={alcaldiasGeojson} />
        <MarkerClusterGroup>
          {reportesConCoord.map((reporte) => {
            const [long, lat] = reporte.atencion_emergencia.ubicacion.coordenadas;
            return (
              <Marker key={reporte.id} position={[lat, long]}>
                <Popup>
                  <div>
                    <strong>Folio:</strong> {reporte.datos_generales.folio}<br />
                    <strong>Tipo:</strong> {reporte.personal_y_activacion.tipo_servicio}<br />
                    <strong>Gravedad:</strong> {reporte.atencion_emergencia.gravedad_emergencia}<br />
                    <strong>Referencia:</strong> {reporte.atencion_emergencia.ubicacion.referencia}<br />
                    <strong>Alcaldía:</strong> {reporte.atencion_emergencia.ubicacion.alcaldia || ""}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
