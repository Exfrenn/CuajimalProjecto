import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useState } from 'react';




const ClickableImage = ({ src, title }: { src: string; title: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <img 
                src={src} 
                alt={title}
                style={{ 
                    maxWidth: '100px', 
                    maxHeight: '100px',
                    cursor: 'pointer',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => setOpen(true)}
            />
            <Dialog 
                open={open} 
                onClose={() => setOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent sx={{ position: 'relative', p: 0 }}>
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                            zIndex: 1,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img 
                        src={src} 
                        alt={title}
                        style={{ 
                            width: '100%', 
                            height: 'auto',
                            display: 'block'
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ClickableImage;
