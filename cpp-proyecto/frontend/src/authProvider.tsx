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
            sessionStorage.setItem("identity", JSON.stringify({"id":auth.id, "email":auth.email, "name":auth.nombre, "rol_id": auth.rol_id, "turno_id": auth.turno_id}))
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
        return Promise.resolve();
    },
    checkAuth: ()=>{return sessionStorage.getItem("auth")?Promise.resolve():Promise.reject()},
    checkError: (error)=>{
        const status=error.status;
        if(status==401 || status==403){
            sessionStorage.removeItem("auth");
            sessionStorage.removeItem("identity");
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
                    avatar: undefined  // Opcional: puedes agregar avatar después
                });
            }
            return Promise.reject();
        } catch (error) {
            return Promise.reject();
        }
    },
    canAccess: async ({resource: _resource, action}) => {
        try {
            const identity = sessionStorage.getItem("identity");
            if (identity) {
                const user = JSON.parse(identity);
                if (user.rol_id === 1){
                    return true;
                }
                if(user.rol_id === 2){
                    return action === "list" || action === "show";
                }
            }
            return false;
        } catch {
            return false;
        }
    },
};

export default authProvider;