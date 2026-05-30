import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Usuario from './src/models/Usuario.js';

const crearAdmin = async () => {
    const email = process.argv[2];
    const password = process.argv[3];
    if (!email || !password) {
        console.error("Uso: node crearAdmin.js <email> <password>");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoAdmin = new Usuario({
            nombre: "Administrador",
            email,
            password: hashedPassword,
            rol: 'admin'
        });

        await nuevoAdmin.save();
        console.log("✅ Administrador creado exitosamente.");
    } catch (error) {
        console.error("❌ Error al crear admin:", error.message);
    } finally {
        process.exit();
    }
};

crearAdmin();