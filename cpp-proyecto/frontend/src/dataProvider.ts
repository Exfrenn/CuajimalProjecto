import jsonServerProvider from 'ra-data-json-server';
import { DataProvider, fetchUtils } from 'react-admin';

export const fetchJsonUtil = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    
    const token = sessionStorage.getItem("auth");
    if (token && options.headers instanceof Headers) {
        options.headers.set("Authorization", `Bearer ${token}`);
    }
    
    return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = jsonServerProvider(
    import.meta.env.VITE_BACKEND,
    fetchJsonUtil
);

const uploadFile = async (file: File): Promise<{ src: string, title: string }> => {
    const formData = new FormData();
    formData.append('images', file);

    const response = await fetch(import.meta.env.VITE_BACKEND+'/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir archivo');
    }

    const result = await response.json();
    return result[0]; 
};

const uploadPDF = async (file: File): Promise<{ src: string, title: string }> => {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch( import.meta.env.VITE_BACKEND+'/api/upload-pdf', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir PDF');
    }

    const result = await response.json();
    return result;
};

const addUploadFeature = (requestHandler: DataProvider): DataProvider => {
    return {
        ...requestHandler,
        update: async (resource: string, params: any) => {
            if (params.data.documento_pdf?.rawFile instanceof File) {
                try {
                    const pdfInfo = await uploadPDF(params.data.documento_pdf.rawFile);
                    params.data = {
                        ...params.data,
                        documento_pdf: pdfInfo,
                    };
                } catch (error) {
                    console.error('Error al subir PDF:', error);
                }
            } else if (params.data.documento_pdf && typeof params.data.documento_pdf === 'object' && params.data.documento_pdf.src) {
                params.data.documento_pdf = {
                    src: params.data.documento_pdf.src,
                    title: params.data.documento_pdf.title
                };
            }

            if (params.data.acciones_realizadas?.observaciones) {
                const observaciones = await Promise.all(
                    params.data.acciones_realizadas.observaciones.map(async (observacion: any) => {
                        if (observacion.fotos && Array.isArray(observacion.fotos)) {
                            const fotosProcessed = await Promise.all(
                                observacion.fotos.map(async (foto: any) => {
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

            return requestHandler.update(resource, params);
        },
        create: async (resource: string, params: any) => {
            if (params.data.documento_pdf?.rawFile instanceof File) {
                try {
                    const pdfInfo = await uploadPDF(params.data.documento_pdf.rawFile);
                    params.data = {
                        ...params.data,
                        documento_pdf: pdfInfo,
                    };
                } catch (error) {
                    console.error('Error al subir PDF:', error);
                }
            }

            if (params.data.acciones_realizadas?.observaciones) {
                const observaciones = await Promise.all(
                    params.data.acciones_realizadas.observaciones.map(async (observacion: any) => {
                        if (observacion.fotos && Array.isArray(observacion.fotos)) {
                            const fotosProcessed = await Promise.all(
                                observacion.fotos.map(async (foto: any) => {
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
