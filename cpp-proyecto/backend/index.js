const express = require ("express");
const MongoClient = require ("mongodb").MongoClient;
var cors = require ("cors");
const bodyParser = require ("body-parser");
const argon2=require("argon2")

const app = express();
app.use(cors());
const PORT = 3000;
let db;
app.use(bodyParser.json());

//Turnos------------------------------------------------------------------------
//getList
app.get("/turnos", async (req,res)=>{
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
app.post("/usuarios", async (req,res)=>{
	let valores=req.body
	if (valores["id"] === undefined || valores["id"] === null) {
        const last = await db.collection("usuarios").find().sort({ id: -1 }).limit(1).toArray();
        valores["id"] = last.length > 0 ? last[0].id + 1 : 1;
    }
	valores["id"]=Number(valores["id"])
	let data=await db.collection("usuarios").insertOne(valores);
	console.log("MongoDB insert response:", data);
	res.json(valores)
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


//Registrarse-----------------------------------------------------------------------------------------------------------
app.post("/registrarse", async(req, res)=>{
	let user=req.body.username;
	let pass=req.body.password;
	let nombre=req.body.nombre;
	let tipo=req.body.tipo;
	let data=await db.collection("usuarios").findOne({"usuario":user})
	if(data==null){
		const hash=await argon2.hash(pass, {type: argon2.argon2id, memoryCost: 19*1024, timeCost:2, parallelism:1, saltLength:16})
		let usuarioAgregar={"usuario":user, "password":hash, "nombre":nombre, "tipo":tipo}
		data=await db.collection("usuarios").insertOne(usuarioAgregar);
		res.sendStatus(201);
	}else{
		res.sendStatus(403)
	}
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

