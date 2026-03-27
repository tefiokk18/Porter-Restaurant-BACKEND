import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// 1. Configuración
dotenv.config();
const app = express();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Conexión a MongoDB (Usando la variable de tu .env)
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('✅ ¡Conexión exitosa a MongoDB Atlas!'))
    .catch((error) => console.error('❌ Error al conectar a la base de datos:', error));

// 4. Puerto y escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});