import { useEffect, useState } from "react";
import { dataProvider } from "../dataProvider";
import ClusteredMap, { ReporteUrbano } from "./ClusteredMap";

export default function ClusteredMapWrapper() {
    const [reportes, setReportes] = useState<ReporteUrbano[]>([]);
    const [alcaldiasGeojson, setAlcaldiasGeojson] = useState<any>(null);

    useEffect(() => {
        dataProvider.getList("reportes_urbanos", {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: "id", order: "ASC" },
            filter: {},
        }).then(({ data }) => setReportes(data));

        fetch("/alcaldiasCDMX.geojson")
            .then(res => res.json())
            .then(setAlcaldiasGeojson);
    }, []);

    if (!alcaldiasGeojson) return <div>Cargando mapa...</div>;

    return <ClusteredMap reportes={reportes} alcaldiasGeojson={alcaldiasGeojson} />;
}