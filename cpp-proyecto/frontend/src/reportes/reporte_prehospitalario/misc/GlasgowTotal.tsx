import { useWatch, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export const GlasgowTotal = () => {
    const { setValue } = useFormContext();
    const ocular = useWatch({ name: "evaluacion_secundaria.glasgow_ocular" }) || 0;
    const motora = useWatch({ name: "evaluacion_secundaria.glasgow_motora" }) || 0;
    const verbal = useWatch({ name: "evaluacion_secundaria.glasgow_verbal" }) || 0;
    const total = Number(ocular) + Number(motora) + Number(verbal);

    useEffect(() => {
        setValue("evaluacion_secundaria.glasgow", total);
    }, [ocular, motora, verbal, setValue, total]);

    return (
        <Box mt={2}>
            <Typography variant="subtitle1">
                GLASGOW TOTAL: <b>{total}</b>
            </Typography>
        </Box>
    );
};