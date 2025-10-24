import { useNotify, useRedirect, useRefresh } from 'react-admin';

export const useReporteNotifications = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onEditSuccess = () => {
        notify('Cambios guardados', { undoable: true, autoHideDuration: 5000 });
        redirect('/reportes_prehospitalarios');
        refresh();
    };

    const onCreateSuccess = () => {
        notify('Reporte urbano creado exitosamente', { 
            type: 'success', 
            undoable: true, 
            autoHideDuration: 5000 
        });
        redirect('/reportes_prehospitalarios');
        refresh();
    };

    return { onEditSuccess, onCreateSuccess };
};
