const express = require ("express");
const MongoClient = require ("mongodb").MongoClient;
var cors = require ("cors");
const bodyParser = require ("body-parser");
const argon2=require("argon2")
const jwt=require("jsonwebtoken")
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const https = require('https');


const app = express();
app.use(cors());
const PORT = 3000;
let db;
app.use(bodyParser.json());

// Middleware de autenticación JWT
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, await process.env.JWTKEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Guarda la info del usuario en req.user
        next();
    });
}

// Middleware de permisos - Compatible con nueva estructura {action, resource}
function checkPermissions(resource, action) {
    return async (req, res, next) => {
        try {
            const userEmail = req.user.email;
            const usuario = await db.collection("usuarios").findOne({ "email": userEmail });
            
            if (!usuario) {
                return res.sendStatus(401);
            }

            const rol = await db.collection("roles").findOne({ "id": usuario.rol_id });
            
            if (!rol || !rol.permisos) {
                return res.sendStatus(403);
            }

            // Soporte para ambos formatos de permisos:
            // Nuevo formato: [{action: "list", resource: "usuarios"}, ...]
            // Formato antiguo: ["usuarios", "list", ...]
            let tienePermiso = false;

            if (rol.permisos.length > 0 && typeof rol.permisos[0] === 'object') {
                // Nuevo formato: verifica que exista el objeto con action y resource exactos
                tienePermiso = rol.permisos.some(p => 
                    p.resource === resource && p.action === action
                );
            } else {
                // Formato antiguo (compatibilidad): verifica que existan ambos strings
                tienePermiso = rol.permisos.includes(resource) && rol.permisos.includes(action);
            }

            if (tienePermiso) {
                next();
            } else {
                res.status(403).json({ 
                    error: "No tienes permisos para realizar esta acción",
                    required: { resource, action }
                });
            }
        } catch (error) {
            console.error("Error verificando permisos:", error);
            res.sendStatus(500);
        }
    };
}

async function crearUsuario({ nombre, apellido, usuario, email, password, rol_id, turno_id }) {
    const hash = await argon2.hash(password, { type: argon2.argon2id, memoryCost: 19*1024, timeCost:2, parallelism:1, saltLength:16 });
    // Calcula el siguiente id
    const last = await db.collection("usuarios").find().sort({ id: -1 }).limit(1).toArray();
    const id = last.length > 0 ? last[0].id + 1 : 1;
    const usuarioAgregar = { id, nombre, apellido, usuario, email, password: hash, rol_id, turno_id };
    await db.collection("usuarios").insertOne(usuarioAgregar);
    return usuarioAgregar;
}

async function log(sujeto, objeto, accion){
	toLog={};
	toLog["timestamp"]=new Date();
	toLog["sujeto"]=sujeto;
	toLog["objeto"]=objeto;
	toLog["accion"]=accion;
	await db.collection("logs").insertOne(toLog);
}

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5000000 // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen'));
        }
    }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/upload', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No se subieron archivos' });
        }

        const files = req.files.map(file => ({
            src: `http://localhost:3000/uploads/${file.filename}`,
            title: file.originalname
        }));
        
        res.json(files);
    } catch (error) {
        console.error('Error al subir archivos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Configuración de multer para PDFs
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'pdf-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadPDF = multer({ 
    storage: pdfStorage,
    limits: {
        fileSize: 5000000 // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PDF'));
        }
    }
});

app.post('/api/upload-pdf', uploadPDF.single('pdf'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ningún archivo PDF' });
        }

        const fileInfo = {
            src: `http://localhost:3000/uploads/${req.file.filename}`,
            title: req.file.originalname
        };
        
        res.json(fileInfo);
    } catch (error) {
        console.error('Error al subir PDF:', error);
        res.status(500).json({ error: error.message });
    }
});

//Turnos------------------------------------------------------------------------
//getList
app.get("/turnos", authenticateToken, checkPermissions("turnos", "list"), async (req,res)=>{
    try {
        const userEmail = req.user.email;
        const usuario = await db.collection("usuarios").findOne({ "email": userEmail });
        
        let filter = {};
        
        // Si no es admin, solo puede ver su propio turno
        if (usuario.rol_id !== 1) {
            filter = { id: usuario.turno_id };
        }
        
        let data = await db.collection("turnos").find(filter).project({_id:0}).toArray();
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);
        res.json(data);
    } catch (error) {
        console.error("Error en GET /turnos:", error);
        res.status(500).json({ error: error.message });
    }
})

//getOne
app.get("/turnos/:id", authenticateToken, checkPermissions("turnos", "show"), async (req,res)=>{
	let data=await db.collection("turnos").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/turnos", authenticateToken, checkPermissions("turnos", "create"), async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("turnos").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("turnos").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
});

//deleteOne
app.delete("/turnos/:id", authenticateToken, checkPermissions("turnos", "delete"), async(req,res)=>{
	let data=await db.collection("turnos").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/turnos/:id", authenticateToken, checkPermissions("turnos", "edit"), async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("turnos").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("turnos").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Roles-------------------------------------------------------------------------
app.get("/roles", authenticateToken, checkPermissions("roles", "list"), async (req,res)=>{
    try {
        const userEmail = req.user.email;
        const usuario = await db.collection("usuarios").findOne({ "email": userEmail });
        
        let filter = {};
        
        // Si no es admin, solo puede ver su propio rol
        if (usuario.rol_id !== 1) {
            filter = { id: usuario.rol_id };
        }
        
        let data = await db.collection("roles").find(filter).project({_id:0}).toArray();
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);
        res.json(data);
    } catch (error) {
        console.error("Error en GET /roles:", error);
        res.status(500).json({ error: error.message });
    }
})

//getOne
app.get("/roles/:id", authenticateToken, checkPermissions("roles", "show"), async (req,res)=>{
	let data=await db.collection("roles").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/roles", authenticateToken, checkPermissions("roles", "create"), async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("roles").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("roles").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
});

//deleteOne
app.delete("/roles/:id", authenticateToken, checkPermissions("roles", "delete"), async(req,res)=>{
	let data=await db.collection("roles").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/roles/:id", authenticateToken, checkPermissions("roles", "edit"), async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("roles").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("roles").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Usuarios-------------------------------------------------------------------------
app.get("/usuarios", authenticateToken, checkPermissions("usuarios", "list"), async (req,res)=>{
    try {
        // Obtener usuario actual
        const userEmail = req.user.email;
        const usuario = await db.collection("usuarios").findOne({ "email": userEmail });
        
        let filtro = {};
        
        if (usuario.rol_id === 3 || usuario.rol_id === 4) {
            // Paramédico u Operador: solo pueden verse a sí mismos
            filtro = { "id": usuario.id };
        } else if (usuario.rol_id === 2) {
            // Jefe de turno: ve a sus operadores asignados
            if (usuario.operadores_id && usuario.operadores_id.length > 0) {
                filtro = { "id": { $in: usuario.operadores_id } };
            } else {
                // Si no tiene operadores asignados, no ve a nadie
                filtro = { "id": -1 }; // ID que no existe
            }
        }
        // Admin (rol_id === 1): sin filtro, ve todos
        
        let data = await db.collection("usuarios").find(filtro).project({_id:0}).toArray();
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);
        res.json(data);
    } catch (error) {
        console.error("Error en GET /usuarios:", error);
        res.status(500).json({ error: error.message });
    }
})

//getOne
app.get("/usuarios/:id", authenticateToken, checkPermissions("usuarios", "show"), async (req,res)=>{
	let data=await db.collection("usuarios").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/usuarios", authenticateToken, checkPermissions("usuarios", "create"), async (req, res) => {
    const { nombre, apellido, usuario, email, password, rol_id, turno_id } = req.body;
    let data = await db.collection("usuarios").findOne({ "usuario": usuario });
    if(data == null){
        const usuarioCreado = await crearUsuario({ nombre, apellido, usuario, email, password, rol_id, turno_id });
        res.json(usuarioCreado);
    } else {
        res.status(409).json({ error: "Usuario ya existe" });
    }
});

//deleteOne
app.delete("/usuarios/:id", authenticateToken, checkPermissions("usuarios", "delete"), async(req,res)=>{
	let data=await db.collection("usuarios").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/usuarios/:id", authenticateToken, checkPermissions("usuarios", "edit"), async (req, res) => {
    let valores = req.body;
    valores["id"] = Number(valores["id"]);

    if (typeof valores.password === "string" && valores.password.trim() !== "") {
        valores.password = await argon2.hash(valores.password, {
            type: argon2.argon2id,
            memoryCost: 19 * 1024,
            timeCost: 2,
            parallelism: 1,
            saltLength: 16
        });
    } else {
        delete valores.password;
    }

    await db.collection("usuarios").updateOne({ "id": valores["id"] }, { "$set": valores });
    const data = await db.collection("usuarios").find({ "id": valores["id"] }).project({ _id: 0 }).toArray();
    res.json(data[0]);
});

//Reporte Urbanoss--------------------------------------------------------------
app.get("/reportes_urbanos", authenticateToken, checkPermissions("reportes_urbanos", "list"), async (req,res)=>{
    // Obtener usuario actual
    const userEmail = req.user.email;
    const usuario = await db.collection("usuarios").findOne({ "email": userEmail });
    
    // Filtro base
    let filtro = {};
    
    // Si es Jefe de turno (rol_id = 2), filtrar por operadores asignados
    if (usuario.rol_id === 2) {
        // Verificar tipo de servicio
        if (usuario.tipo_servicio === 'urbano' && usuario.operadores_id && usuario.operadores_id.length > 0) {
            // Solo mostrar reportes donde algún personal_a_cargo esté en operadores_id
            filtro = {
                "personal_y_activacion.personal_a_cargo": { 
                    $in: usuario.operadores_id 
                }
            };
        } else {
            // Si no es urbano o no tiene operadores asignados, no muestra nada
            filtro = { "_id": null };
        }
    }
    // Si es Operador (rol_id = 4), solo sus propios reportes
    else if (usuario.rol_id === 4) {
        filtro = {
            "personal_y_activacion.personal_a_cargo": usuario.id
        };
    }
    
    let data = await db.collection("reportes_urbanos").find(filtro).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/reportes_urbanos/:id", authenticateToken, checkPermissions("reportes_urbanos", "show"), async (req,res)=>{
	let data=await db.collection("reportes_urbanos").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/reportes_urbanos", authenticateToken, checkPermissions("reportes_urbanos", "create"), async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("reportes_urbanos").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("reportes_urbanos").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
});

//deleteOne
app.delete("/reportes_urbanos/:id", authenticateToken, checkPermissions("reportes_urbanos", "delete"), async(req,res)=>{
	let data=await db.collection("reportes_urbanos").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/reportes_urbanos/:id", authenticateToken, checkPermissions("reportes_urbanos", "edit"), async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("reportes_urbanos").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("reportes_urbanos").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Reporte Prehospitalarios------------------------------------------------------
app.get("/reportes_prehospitalarios", authenticateToken, checkPermissions("reportes_prehospitalarios", "list"), async (req,res)=>{
    // Obtener usuario actual
    const userEmail = req.user.email;
    const usuario = await db.collection("usuarios").findOne({ "email": userEmail });
    
    // Filtro base
    let filtro = {};
    
    // Si es Jefe de turno (rol_id = 2), filtrar por operadores asignados
    if (usuario.rol_id === 2) {
        // Verificar tipo de servicio
        if (usuario.tipo_servicio === 'prehospitalario' && usuario.operadores_id && usuario.operadores_id.length > 0) {
            // Solo mostrar reportes donde algún operador esté en operadores_id
            filtro = {
                "control.operador": { 
                    $in: usuario.operadores_id 
                }
            };
        } else {
            // Si no es prehospitalario o no tiene operadores asignados, no muestra nada
            filtro = { "_id": null };
        }
    }
    // Si es Paramédico (rol_id = 3), solo sus propios reportes
    else if (usuario.rol_id === 3) {
        filtro = {
            "control.operador": usuario.id
        };
    }
    
    let data = await db.collection("reportes_prehospitalarios").find(filtro).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/reportes_prehospitalarios/:id", authenticateToken, checkPermissions("reportes_prehospitalarios", "show"), async (req,res)=>{
	let data=await db.collection("reportes_prehospitalarios").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/reportes_prehospitalarios", authenticateToken, checkPermissions("reportes_prehospitalarios", "create"), async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("reportes_prehospitalarios").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("reportes_prehospitalarios").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
});

//deleteOne
app.delete("/reportes_prehospitalarios/:id", authenticateToken, checkPermissions("reportes_prehospitalarios", "delete"), async(req,res)=>{
	let data=await db.collection("reportes_prehospitalarios").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/reportes_prehospitalarios/:id", authenticateToken, checkPermissions("reportes_prehospitalarios", "edit"), async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("reportes_prehospitalarios").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("reportes_prehospitalarios").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Lugares de ocurrencia---------------------------------------------------------
app.get("/lugares_ocurrencia", async (req,res)=>{
    let data = await db.collection("lugares_ocurrencia").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/lugares_ocurrencia/:id", async (req,res)=>{
	let data=await db.collection("lugares_ocurrencia").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/lugares_ocurrencia", async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("lugares_ocurrencia").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("lugares_ocurrencia").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
});

//deleteOne
app.delete("/lugares_ocurrencia/:id", async(req,res)=>{
	let data=await db.collection("lugares_ocurrencia").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/lugares_ocurrencia/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("lugares_ocurrencia").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("lugares_ocurrencia").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Instituciones-----------------------------------------------------------------
app.get("/instituciones", async (req,res)=>{
    let data = await db.collection("instituciones").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/instituciones/:id", async (req,res)=>{
	let data=await db.collection("instituciones").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/instituciones", async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("instituciones").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("instituciones").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
});

//deleteOne
app.delete("/instituciones/:id", async(req,res)=>{
	let data=await db.collection("instituciones").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/instituciones/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("instituciones").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("instituciones").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Agentes causal--------------------------------------------------------------------------------------------------------
app.get("/agentes_causal", async (req,res)=>{
    let data = await db.collection("agentes_causal").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/agentes_causal/:id", async (req,res)=>{
	let data=await db.collection("agentes_causal").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/agentes_causal", async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("agentes_causal").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("agentes_causal").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
});

//deleteOne
app.delete("/agentes_causal/:id", async(req,res)=>{
	let data=await db.collection("agentes_causal").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/agentes_causal/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("agentes_causal").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("agentes_causal").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Origen probable-------------------------------------------------------------------------------------------------------
app.get("/origen_probable", async (req,res)=>{
    let data = await db.collection("origen_probable").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/origen_probable/:id", async (req,res)=>{
	let data=await db.collection("origen_probable").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/origen_probable", async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("origen_probable").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("origen_probable").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
});

//deleteOne
app.delete("/origen_probable/:id", async(req,res)=>{
	let data=await db.collection("origen_probable").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/origen_probable/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("origen_probable").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("origen_probable").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Registrarse-----------------------------------------------------------------------------------------------------------
app.post("/registrarse", async(req, res)=>{
    const { nombre, apellido, usuario, email, password, rol_id, turno_id } = req.body;
    let data = await db.collection("usuarios").findOne({ "usuario": usuario });
    if(data == null){
        await crearUsuario({ nombre, apellido, usuario, email, password, rol_id, turno_id });
        res.sendStatus(201);
    } else {
        res.sendStatus(403);
    }
});

//Login-----------------------------------------------------------------------------------------------------------
app.post("/login", async (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    let data = await db.collection("usuarios").findOne({ "email": email });
    
    if (data == null) {
        res.sendStatus(401);
    } else if (await argon2.verify(data.password, pass)) {
        // Obtener los permisos del rol
        const rol = await db.collection("roles").findOne({ "id": data.rol_id });
        const permisos = rol ? rol.permisos : [];
        
        let token = jwt.sign({ "email": data.email, "rol_id": data.rol_id }, await process.env.JWTKEY, { expiresIn: 900 });
        res.json({ 
            "token": token, 
            "id": data.id,
            "email": data.email, 
            "nombre": data.nombre,
            "apellido": data.apellido,
            "rol_id": data.rol_id,
            "turno_id": data.turno_id,
            "tipo_servicio": data.tipo_servicio,
            "permisos": permisos
        });
    } else {
        res.sendStatus(401);
    }
});

const options = {
      key: fs.readFileSync('backend.key'),
      cert: fs.readFileSync('backend.crt')
    };

async function connectToDB(){
    let client = new MongoClient(await process.env.DB);
    await client.connect();
    db = client.db();
    console.log("conectado a la base de datos")
}


https.createServer(options, app).listen(PORT, async () => {
		await process.loadEnvFile(".env");
		connectToDB();
      	console.log('HTTPS Server running on port 3000');
});


/*app.listen(PORT, async ()=>{
	await process.loadEnvFile(".env");
	connectToDB();
	console.log("aplicacion corriendo en puerto 3000");
});*/
