import jsonServerProvider from 'ra-data-json-server';
import { DataProvider, fetchUtils } from 'react-admin';

// Función personalizada para fetch con autenticación
export const fetchJsonUtil = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    options.headers.set("Authentication", sessionStorage.getItem("auth"));
    return fetchUtils.fetchJson(url, options);
};

// Usa fetchJsonUtil en el dataProvider
const baseDataProvider = jsonServerProvider(
    import.meta.env.VITE_JSON_SERVER_URL,
    fetchJsonUtil
);

// Función para subir archivos al servidor
const uploadFile = async (file: File): Promise<{ src: string, title: string }> => {
    const formData = new FormData();
    formData.append('images', file);

    const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir archivo');
    }

    const result = await response.json();
    return result[0]; // Devuelve el primer archivo subido
};

// Función para subir PDFs al servidor
const uploadPDF = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch('http://localhost:3000/api/upload-pdf', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir PDF');
    }

    const result = await response.json();
    return result.path; // Devuelve la ruta del PDF
};

// Función para procesar archivos
const addUploadFeature = (requestHandler: DataProvider): DataProvider => {
    return {
        ...requestHandler,
        update: async (resource: string, params: any) => {
            // Procesar PDF si existe
            if (params.data.documento_pdf?.rawFile instanceof File) {
                try {
                    const pdfPath = await uploadPDF(params.data.documento_pdf.rawFile);
                    params.data = {
                        ...params.data,
                        documento_pdf: pdfPath,
                    };
                } catch (error) {
                    console.error('Error al subir PDF:', error);
                }
            }

            // Procesar archivos en observaciones antes de enviar
            if (params.data.acciones_realizadas?.observaciones) {
                const observaciones = await Promise.all(
                    params.data.acciones_realizadas.observaciones.map(async (observacion: any) => {
                        if (observacion.fotos && Array.isArray(observacion.fotos)) {
                            const fotosProcessed = await Promise.all(
                                observacion.fotos.map(async (foto: any) => {
                                    // Si es un archivo nuevo (tiene rawFile)
                                    if (foto.rawFile instanceof File) {
                                        try {
                                            const uploadedFile = await uploadFile(foto.rawFile);
                                            return uploadedFile;
                                        } catch (error) {
                                            console.error('Error al subir archivo:', error);
                                            // En caso de error, mantener la imagen como base64
                                            return {
                                                src: foto.src,
                                                title: foto.title,
                                            };
                                        }
                                    }
                                    // Si ya es una URL existente, mantenerla
                                    return {
                                        src: foto.src,
                                        title: foto.title,
                                    };
                                })
                            );
                            return {
                                ...observacion,
                                fotos: fotosProcessed,
                            };
                        }
                        return observacion;
                    })
                );

                params.data = {
                    ...params.data,
                    acciones_realizadas: {
                        ...params.data.acciones_realizadas,
                        observaciones,
                    },
                };
            }

            return requestHandler.update(resource, params);
        },
        create: async (resource: string, params: any) => {
            // Procesar PDF si existe
            if (params.data.documento_pdf?.rawFile instanceof File) {
                try {
                    const pdfPath = await uploadPDF(params.data.documento_pdf.rawFile);
                    params.data = {
                        ...params.data,
                        documento_pdf: pdfPath,
                    };
                } catch (error) {
                    console.error('Error al subir PDF:', error);
                }
            }

            // Procesar archivos en observaciones antes de enviar
            if (params.data.acciones_realizadas?.observaciones) {
                const observaciones = await Promise.all(
                    params.data.acciones_realizadas.observaciones.map(async (observacion: any) => {
                        if (observacion.fotos && Array.isArray(observacion.fotos)) {
                            const fotosProcessed = await Promise.all(
                                observacion.fotos.map(async (foto: any) => {
                                    // Si es un archivo nuevo (tiene rawFile)
                                    if (foto.rawFile instanceof File) {
                                        try {
                                            const uploadedFile = await uploadFile(foto.rawFile);
                                            return uploadedFile;
                                        } catch (error) {
                                            console.error('Error al subir archivo:', error);
                                            return {
                                                src: foto.src,
                                                title: foto.title,
                                            };
                                        }
                                    }
                                    return {
                                        src: foto.src,
                                        title: foto.title,
                                    };
                                })
                            );
                            return {
                                ...observacion,
                                fotos: fotosProcessed,
                            };
                        }
                        return observacion;
                    })
                );

                params.data = {
                    ...params.data,
                    acciones_realizadas: {
                        ...params.data.acciones_realizadas,
                        observaciones,
                    },
                };
            }

            return requestHandler.create(resource, params);
        },
    };
};

export const dataProvider = addUploadFeature(baseDataProvider);