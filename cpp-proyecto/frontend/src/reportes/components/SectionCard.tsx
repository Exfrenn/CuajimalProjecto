import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import { ReactNode } from "react";

interface SectionCardProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
}

export const SectionCard = ({ title, icon, children }: SectionCardProps) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    {icon} {title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box>{children}</Box>
            </CardContent>
        </Card>
    );
};
