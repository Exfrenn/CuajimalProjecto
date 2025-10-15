const express = require ("express");
const MongoClient = require ("mongodb").MongoClient;
var cors = require ("cors");
const bodyParser = require ("body-parser");
const argon2=require("argon2")
const jwt=require("jsonwebtoken")
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
const PORT = 3000;
let db;
app.use(bodyParser.json());

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
app.get("/turnos", async (req,res)=>{
    try{
        let token=req.get("Authentication");
        let verifiedToken=await jwt.verify(token, "secretKey");
        let user=verifiedToken.email; // Cambiado de .usuario a .email según tu login
        
        if("_sort" in req.query){
            let sortBy=req.query._sort;
            let sortOrder=req.query._order=="ASC"?1:-1;
            let inicio=Number(req.query._start);
            let fin=Number(req.query._end);
            let sorter={}
            sorter[sortBy]=sortOrder;
            let data= await db.collection("turnos").find({}).sort(sorter).project({_id:0}).toArray();
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            data=data.slice(inicio,fin)
            await log(user, "turnos", "leer");
            res.json(data)
        }else if("id" in req.query){
            let data=[];
            for(let index=0; index<req.query.id.length; index++){
                let dataParcial=await db.collection("turnos").find({id: Number(req.query.id[index])}).project({_id:0}).toArray();
                data= await data.concat(dataParcial);
            }
            res.json(data);
        }else{
            let data=await db.collection("turnos").find(req.query).project({_id:0}).toArray();
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.json(data);
        }
    }catch{
        res.sendStatus(401);
    }
});

//getOne
app.get("/turnos/:id", async (req,res)=>{
	let data=await db.collection("turnos").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/turnos", async (req,res)=>{
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
app.delete("/turnos/:id", async(req,res)=>{
	let data=await db.collection("turnos").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/turnos/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("turnos").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("turnos").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Roles-------------------------------------------------------------------------
app.get("/roles", async (req,res)=>{
    let data = await db.collection("roles").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/roles/:id", async (req,res)=>{
	let data=await db.collection("roles").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/roles", async (req,res)=>{
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
app.delete("/roles/:id", async(req,res)=>{
	let data=await db.collection("roles").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/roles/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("roles").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("roles").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Usuarios-------------------------------------------------------------------------
app.get("/usuarios", async (req,res)=>{
    let data = await db.collection("usuarios").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/usuarios/:id", async (req,res)=>{
	let data=await db.collection("usuarios").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/usuarios", async (req, res) => {
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
app.delete("/usuarios/:id", async(req,res)=>{
	let data=await db.collection("usuarios").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/usuarios/:id", async (req, res) => {
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
app.get("/reportes_urbanos", async (req,res)=>{
    let data = await db.collection("reportes_urbanos").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/reportes_urbanos/:id", async (req,res)=>{
	let data=await db.collection("reportes_urbanos").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/reportes_urbanos", async (req,res)=>{
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
app.delete("/reportes_urbanos/:id", async(req,res)=>{
	let data=await db.collection("reportes_urbanos").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/reportes_urbanos/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("reportes_urbanos").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("reportes_urbanos").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Reporte Prehospitalarios------------------------------------------------------
app.get("/reportes_prehospitalarios", async (req,res)=>{
    let data = await db.collection("reportes_prehospitalarios").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/reportes_prehospitalarios/:id", async (req,res)=>{
	let data=await db.collection("reportes_prehospitalarios").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/reportes_prehospitalarios", async (req,res)=>{
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
app.delete("/reportes_prehospitalarios/:id", async(req,res)=>{
	let data=await db.collection("reportes_prehospitalarios").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/reportes_prehospitalarios/:id", async(req,res)=>{
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
        let token = jwt.sign({ "email": data.email, "rol_id": data.rol_id }, "secretKey", { expiresIn: 900 });
        res.json({ 
            "token": token, 
            "id": data.id,
			"email": data.email, 
            "nombre": data.nombre,
            "rol_id": data.rol_id,
			"turno_id": data.turno_id
        });
    } else {
        res.sendStatus(401);
    }
});


async function connectToDB(){
    let client = new MongoClient("mongodb://127.0.0.1:27017/ProyectoCPP");
    await client.connect();
    db = client.db();
    console.log("conectado a la base de datos")
}

app.listen(PORT, ()=>{
    connectToDB();
    console.log("aplicacion corriendo en puerto 3000");
})

