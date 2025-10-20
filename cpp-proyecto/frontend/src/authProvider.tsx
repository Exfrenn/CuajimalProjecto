import {AuthProvider} from "react-admin";

const authProvider:AuthProvider={
    login: async({email, password})=>{
        try{
            const request=new Request("http://127.0.0.1:3000/login",{
                method:"POST",
                body: JSON.stringify({"email":email, "password":password}),
                headers: new Headers({"Content-Type":"application/json"})
            });
            
            const res=await fetch(request);
            if(res.status<200 || res.status>=300){
                throw new Error(res.statusText);
            }
            
            const auth=await res.json();
            sessionStorage.setItem("auth", auth.token);
            sessionStorage.setItem("permisos", JSON.stringify(auth.permisos));
            sessionStorage.setItem("identity", JSON.stringify({
                "id":auth.id, 
                "email":auth.email, 
                "name":auth.nombre,
                "apellido": auth.apellido,
                "rol_id": auth.rol_id, 
                "turno_id": auth.turno_id,
                "tipo_servicio": auth.tipo_servicio
            }))
            return Promise.resolve();
        }catch(error: unknown){
            // Fix para TypeScript
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if(errorMessage.includes('401')){
                throw new Error("Email o contraseña incorrectos");
            }
            throw new Error("Error de conexión. Inténtalo de nuevo.");
        }
    },
    logout: ()=>{
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("identity");
        sessionStorage.removeItem("permisos");
        return Promise.resolve();
    },
    checkAuth: ()=>{return sessionStorage.getItem("auth")?Promise.resolve():Promise.reject()},
    checkError: (error)=>{
        const status=error.status;
        if(status==401 || status==403){
            sessionStorage.removeItem("auth");
            sessionStorage.removeItem("identity");
            sessionStorage.removeItem("permisos");
            Promise.reject();
        }
        return Promise.resolve();
    },
    getIdentity: async () => {
        try {
            const identity = sessionStorage.getItem("identity");
            if (identity) {
                const user = JSON.parse(identity);
                return Promise.resolve({
                    id: user.id,
                    fullName: user.name,  // ✅ React-Admin espera "fullName" no "name"
                    nombre: user.name,    // Para usar en componentes personalizados
                    apellido: user.apellido || '',
                    rol_id: user.rol_id,  // ✅ Importante para auto-asignación
                    turno_id: user.turno_id,
                    tipo_servicio: user.tipo_servicio,
                    avatar: undefined,  // Opcional: puedes agregar avatar después
                });
            }
            return Promise.reject();
        } catch (error) {
            return Promise.reject();
        }
    },
    getPermissions: async () => {
        try {
            const permisosStr = sessionStorage.getItem("permisos");
            if (permisosStr) {
                const permisos = JSON.parse(permisosStr);
                return Promise.resolve(permisos);
            }
            return Promise.reject();
        } catch (error) {
            return Promise.reject();
        }
    },
    canAccess: async ({resource, action}) => {
        try {
            const permisosStr = sessionStorage.getItem("permisos");
            if (!permisosStr) {
                return false;
            }
            
            const permisos = JSON.parse(permisosStr);
            
            // Caso especial para el Dashboard/Tablero
            if (resource === '' || resource === undefined) {
                // Acceso al dashboard requiere permiso para "tablero"
                return permisos.some((p: any) => p.resource === 'tablero');
            }
            
            // Verifica si el usuario tiene el permiso específico {action, resource}
            return permisos.some((p: any) => 
                p.resource === resource && p.action === action
            );
        } catch {
            return false;
        }
    },
};

export default authProvider;