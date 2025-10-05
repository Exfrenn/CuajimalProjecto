const express = require ("express");
const MongoClient = require ("mongodb").MongoClient;
var cors = require ("cors");
const bodyParser = require ("body-parser");

const app = express();
app.use(cors());
const PORT = 3000;
let db;
app.use(bodyParser.json());

//Turnos------------------------------------------------------------------------
app.get("/turnos", async (req,res)=>{
    let data = await db.collection("turnos").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

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

//Usuarios----------------------------------------------------------------------
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
app.post("/usuarios", async (req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data=await db.collection("usuarios").insertOne(valores);
	res.json(data)
});

//deleteOne
app.delete("/usuarios/:id", async(req,res)=>{
	let data=await db.collection("usuarios").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/usuarios/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("usuarios").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("usuarios").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})

//Reportes----------------------------------------------------------------------
app.get("/reportes", async (req,res)=>{
    let data = await db.collection("reportes").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
})

//getOne
app.get("/reportes/:id", async (req,res)=>{
	let data=await db.collection("reportes").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

//createOne
app.post("/reportes", async (req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data=await db.collection("reportes").insertOne(valores);
	res.json(data)
});

//deleteOne
app.delete("/reportes/:id", async(req,res)=>{
	let data=await db.collection("reportes").deleteOne({"id": Number(req.params.id)});
	res.json(data)
})

//updateOne
app.put("/reportes/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("reportes").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("reportes").find({"id":valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);
})


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

