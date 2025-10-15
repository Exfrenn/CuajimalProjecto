import { Button } from "@mui/material";
import GpsFixed from "@mui/icons-material/GpsFixed";
import { useFormContext } from "react-hook-form";
import { useNotify } from "react-admin";

const BotonSoloCoordenadas = () => {
    const { setValue } = useFormContext();
    const notify = useNotify();

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            notify("La geolocalización no está soportada por tu navegador", { type: "warning" });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setValue("atencion_emergencia.ubicacion.coordenadas.0", longitude, { shouldDirty: true });
                setValue("atencion_emergencia.ubicacion.coordenadas.1", latitude, { shouldDirty: true });
                notify("Coordenadas obtenidas correctamente", { type: "info" });
            },
            (_) => {
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
            Obtener Solo Coordenadas
        </Button>
    );
};

export default BotonSoloCoordenadas;