import { Button } from "@mui/material";
import GpsFixed from "@mui/icons-material/GpsFixed";
import { useFormContext } from "react-hook-form";
import { useNotify } from "react-admin";

const alcaldiasCDMX = [
    "Álvaro Obregón", "Azcapotzalco", "Benito Juárez", "Coyoacán",
    "Cuajimalpa de Morelos", "Cuauhtémoc", "Gustavo A. Madero", "Iztacalco",
    "Iztapalapa", "La Magdalena Contreras", "Miguel Hidalgo", "Milpa Alta",
    "Tláhuac", "Tlalpan", "Venustiano Carranza", "Xochimilco"
];

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;

async function obtenerDireccionGoogle(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}&language=es`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.results || !data.results[0]) return {};

    const components = data.results[0].address_components;
    const get = (types: string[]) =>
        components.find((c: any) => types.every(t => c.types.includes(t)))?.long_name || "";

    return {
        calle: get(["route"]),
        colonia: get(["sublocality", "political"]) ||
                 get(["neighborhood", "political"]) ||
                 get(["sublocality_level_1", "sublocality", "political"]) ||
                 get(["sublocality_level_2", "sublocality", "political"]) ||
                 get(["sublocality_level_3", "sublocality", "political"]),
        alcaldia: get(["locality", "political"]) ||
                  get(["administrative_area_level_2", "political"]) ||
                  get(["sublocality", "political"]),
        estado: get(["administrative_area_level_1", "political"]),
        municipio: get(["administrative_area_level_2", "political"]),
        pais: get(["country", "political"]),
        cp: get(["postal_code"])
    };
}

const BotonGeolocalizacion = () => {
    const { setValue } = useFormContext();
    const notify = useNotify();

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            notify("La geolocalización no está soportada por tu navegador", { type: "warning" });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setValue("atencion_emergencia.ubicacion.coordenadas.0", longitude, { shouldDirty: true });
                setValue("atencion_emergencia.ubicacion.coordenadas.1", latitude, { shouldDirty: true });

                try {
                    const direccion = await obtenerDireccionGoogle(latitude, longitude);
                    setValue("atencion_emergencia.ubicacion.calle", direccion.calle, { shouldDirty: true });
                    setValue("atencion_emergencia.ubicacion.colonia", direccion.colonia, { shouldDirty: true });
                    setValue("atencion_emergencia.ubicacion.estado", direccion.estado, { shouldDirty: true });
                    setValue("atencion_emergencia.ubicacion.municipio", direccion.municipio, { shouldDirty: true });

                    const alcaldiaValida = alcaldiasCDMX.find(
                        a => a.toLowerCase() === (direccion.alcaldia || "").toLowerCase()
                    );
                    setValue(
                        "atencion_emergencia.ubicacion.alcaldia",
                        alcaldiaValida || "",
                        { shouldDirty: true }
                    );
                    if (!alcaldiaValida) {
                        notify("La alcaldía detectada no está en la lista de CDMX. Selecciona manualmente.", { type: "warning" });
                    } else {
                        notify("Ubicación y dirección obtenidas correctamente", { type: "info" });
                    }
                } catch (e) {
                    notify("No se pudo obtener la dirección automáticamente", { type: "warning" });
                }
            },
            (error) => {
                notify("No se pudo obtener la ubicación", { type: "warning" });
            }
        );
    };

    return (
        <Button
            variant="contained"
            onClick={handleGetLocation}
            startIcon={<GpsFixed />}
            sx={{ marginBottom: 2 }}
        >
            Obtener Ubicación Actual
        </Button>
    );
};

export default BotonGeolocalizacion;
