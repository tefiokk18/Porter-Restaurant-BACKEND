import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import usuariosRoutes from './src/routes/usuarios.routes.js';
import reservasRoutes from './src/routes/reservas.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', usuariosRoutes);
app.use('/api', reservasRoutes);


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('✅ ¡Conexión exitosa a MongoDB Atlas!'))
    .catch((error) => console.error('❌ Error al conectar a la base de datos:', error));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});