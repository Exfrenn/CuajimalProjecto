const express = require ("express");
const MongoClient = require ("mongodb").MongoClient;
var cors = require ("cors");
const bodyParser = require ("body-parser");

const app = express();
app.use(cors());
const PORT = 3000;
let db;
app.use(bodyParser.json());

app.get("/usuarios", async (req,res)=>{
    let data = await db.collection("usuarios").find({}).project({_id:0}).toArray();
    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", data.length);
    res.json(data);
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

