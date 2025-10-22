// Script para limpiar datos envueltos en objeto "0"
const { MongoClient } = require("mongodb");

async function fixWrappedData() {
    const client = new MongoClient(process.env.DB || "mongodb://127.0.0.1:27017/ProyectoCPP");
    
    try {
        await client.connect();
        const db = client.db();
        
        console.log("🔧 Iniciando limpieza de datos envueltos...\n");
        
        // Fix reportes urbanos
        console.log("📋 Procesando reportes_urbanos...");
        const reportesUrbanos = await db.collection("reportes_urbanos").find({}).toArray();
        let urbanosFixed = 0;
        let urbanosIDFixed = 0;
        
        // Obtener el último ID válido
        const lastUrbanosWithId = await db.collection("reportes_urbanos")
            .find({ id: { $type: "number", $ne: NaN } })
            .sort({ id: -1 })
            .limit(1)
            .toArray();
        let nextUrbanosId = lastUrbanosWithId.length > 0 ? lastUrbanosWithId[0].id + 1 : 1;
        
        for (const reporte of reportesUrbanos) {
            let needsUpdate = false;
            let datosCorrectos = reporte;
            
            // Si tiene la key "0" y no tiene datos_generales en el nivel raíz
            if (reporte["0"] && !reporte.datos_generales) {
                console.log(`  ⚠️  Encontrado reporte envuelto - _id: ${reporte._id}`);
                datosCorrectos = reporte["0"];
                needsUpdate = true;
                urbanosFixed++;
            }
            
            // Verificar si el ID es inválido (null, undefined, NaN, string vacío)
            if (!datosCorrectos.id || datosCorrectos.id === null || isNaN(Number(datosCorrectos.id))) {
                console.log(`  ⚠️  ID inválido encontrado - _id: ${reporte._id}, id: ${datosCorrectos.id}`);
                datosCorrectos.id = nextUrbanosId;
                nextUrbanosId++;
                needsUpdate = true;
                urbanosIDFixed++;
                console.log(`  ✅ Asignado nuevo ID: ${datosCorrectos.id}`);
            }
            
            // Actualizar si es necesario
            if (needsUpdate) {
                await db.collection("reportes_urbanos").deleteOne({ _id: reporte._id });
                await db.collection("reportes_urbanos").insertOne({
                    _id: reporte._id,
                    ...datosCorrectos,
                    id: Number(datosCorrectos.id) // Asegurar que es número
                });
                console.log(`  ✅ Reporte actualizado - ID: ${datosCorrectos.id}`);
            }
        }
        
        console.log(`\n✅ Reportes urbanos con estructura corregida: ${urbanosFixed}/${reportesUrbanos.length}`);
        console.log(`✅ Reportes urbanos con ID asignado: ${urbanosIDFixed}/${reportesUrbanos.length}\n`);
        
        // Fix reportes prehospitalarios
        console.log("📋 Procesando reportes_prehospitalarios...");
        const reportesPrehospitalarios = await db.collection("reportes_prehospitalarios").find({}).toArray();
        let prehospitalariosFixed = 0;
        let prehospitalariosIDFixed = 0;
        
        // Obtener el último ID válido
        const lastPrehospitalariosWithId = await db.collection("reportes_prehospitalarios")
            .find({ id: { $type: "number", $ne: NaN } })
            .sort({ id: -1 })
            .limit(1)
            .toArray();
        let nextPrehospitalariosId = lastPrehospitalariosWithId.length > 0 ? lastPrehospitalariosWithId[0].id + 1 : 1;
        
        for (const reporte of reportesPrehospitalarios) {
            let needsUpdate = false;
            let datosCorrectos = reporte;
            
            // Si tiene la key "0" y no tiene control en el nivel raíz
            if (reporte["0"] && !reporte.control) {
                console.log(`  ⚠️  Encontrado reporte envuelto - _id: ${reporte._id}`);
                datosCorrectos = reporte["0"];
                needsUpdate = true;
                prehospitalariosFixed++;
            }
            
            // Verificar si el ID es inválido (null, undefined, NaN, string vacío)
            if (!datosCorrectos.id || datosCorrectos.id === null || isNaN(Number(datosCorrectos.id))) {
                console.log(`  ⚠️  ID inválido encontrado - _id: ${reporte._id}, id: ${datosCorrectos.id}`);
                datosCorrectos.id = nextPrehospitalariosId;
                nextPrehospitalariosId++;
                needsUpdate = true;
                prehospitalariosIDFixed++;
                console.log(`  ✅ Asignado nuevo ID: ${datosCorrectos.id}`);
            }
            
            // Actualizar si es necesario
            if (needsUpdate) {
                await db.collection("reportes_prehospitalarios").deleteOne({ _id: reporte._id });
                await db.collection("reportes_prehospitalarios").insertOne({
                    _id: reporte._id,
                    ...datosCorrectos,
                    id: Number(datosCorrectos.id) // Asegurar que es número
                });
                console.log(`  ✅ Reporte actualizado - ID: ${datosCorrectos.id}`);
            }
        }
        
        console.log(`\n✅ Reportes prehospitalarios con estructura corregida: ${prehospitalariosFixed}/${reportesPrehospitalarios.length}`);
        console.log(`✅ Reportes prehospitalarios con ID asignado: ${prehospitalariosIDFixed}/${reportesPrehospitalarios.length}\n`);
        
        console.log("🎉 Limpieza completada!");
        console.log(`📊 Total de documentos con estructura corregida: ${urbanosFixed + prehospitalariosFixed}`);
        console.log(`📊 Total de documentos con ID asignado: ${urbanosIDFixed + prehospitalariosIDFixed}`);
        
    } catch (error) {
        console.error("❌ Error durante la limpieza:", error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

// Ejecutar el script
fixWrappedData();
