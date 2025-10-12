import React, { useState, ChangeEvent } from 'react';

const Registrarse: React.FC = () => {
    const [datos, setDatos] = useState({
        usuario: "",
        password: "",
        nombre: "",
        apellido: "",
        email: "",
        rol_id: 3,      // Por ejemplo, 2 = usuario normal
        turno_id: 1  // O algún valor por defecto
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDatos({ ...datos, [event.target.name]: event.target.value });
    };

    const handleSendData = async () => {
        try {
            const res = await fetch("http://127.0.0.1:3000/registrarse", {
                method: "POST",
                body: JSON.stringify(datos),
                headers: { "Content-Type": "application/json" }
            });
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }
            alert("Usuario registrado correctamente");
        } catch {
            alert("No se pudo registrar el usuario");
        }
    };

    return (
        <div>
            <h2>Registro de nuevos usuarios</h2>
            <form>
                <div>
                    <label htmlFor="usuario">Usuario: </label>
                    <input type="text" id="usuario" name="usuario" value={datos.usuario} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Contrasena: </label>
                    <input type="password" id="password" name="password" value={datos.password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre: </label>
                    <input type="text" id="nombre" name="nombre" value={datos.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="apellido">Apellido: </label>
                    <input type="text" id="apellido" name="apellido" value={datos.apellido} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" value={datos.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="rol_id">Rol:</label>
                    <select id="rol_id" name="rol_id" value={datos.rol_id} onChange={handleChange}>
                        <option value={1}>Administrador</option>
                        <option value={2}>Jefe de Turno</option>
                        <option value={3}>Paramedico</option>
                        <option value={4}>Operador</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="turno_id">Turno:</label>
                    <select id="turno_id" name="turno_id" value={datos.turno_id} onChange={handleChange}>
                        <option value={1}>Matutino Semanal</option>
                        <option value={2}>Vespertino Semanal</option>
                        <option value={3}>Nocturno A (L-M-V)</option>
                        <option value={4}>Nocturno B (M-J-D)</option>
                        <option value={5}>Diurno Fin de Semana</option>
                        <option value={6}>Nocturno Fin de Semana</option>
                    </select>
                </div>
                <div>
                    <button type="button" onClick={handleSendData}>
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Registrarse;