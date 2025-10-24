import { GeoJSON, GeoJSONProps } from "react-leaflet";

interface AlcaldiasLayerProps {
  geojson: any;
  onFeatureClick?: (alcaldia: string) => void;
}

export default function AlcaldiasLayer({ geojson, onFeatureClick }: AlcaldiasLayerProps) {
  const style: GeoJSONProps["style"] = () => ({
    color: "#3388ff",
    weight: 1,
    fillOpacity: 0.1,
  });

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const {
        mun_code,
        mun_name,
        col_name,
        NOM_ALC
      } = feature.properties;

 
      const popupContent = `
        <br/><b>Código Municipio:</b> ${mun_code ? mun_code[0] : ""}
        <br/><b>Alcaldía:</b> ${mun_name ? mun_name[0] : NOM_ALC || ""}
        <br/><b>Colonia:</b> ${col_name ? col_name[0] : ""}
      `;

      layer.bindPopup(popupContent);

      if (onFeatureClick) {
        layer.on({ click: () => onFeatureClick(mun_name ? mun_name[0] : NOM_ALC || "") });
      }
    }
  };

  return <GeoJSON data={geojson} style={style} onEachFeature={onEachFeature} />;
}