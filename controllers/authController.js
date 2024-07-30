import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import conection from '../config/db.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../config/development.env') });

const SECRET_KEY = process.env.SECRET_KEY;

function getRandomSalt(min, max) {
    min = Math.ceil(min);   // Redondear el mínimo hacia arriba para incluirlo en el rango
    max = Math.floor(max);  // Redondear el máximo hacia abajo para incluirlo en el rango
    return Math.floor(Math.random() * (max - min + 1) + min); // Generar el número aleatorio
}

export const registerUser = async (req, res) => {
    try {
        let { name, pass } = await req.body;
        const [rows] = await conection.execute('SELECT 1 FROM users WHERE user_name = ?', [name]);
        if (rows.length > 0) {
            return res.status(409).json({ error: `El usuario ${name} ya existe.` });
        }
        let randomSalt = getRandomSalt(8, 12)
        let passHashed = await bcrypt.hash(pass, randomSalt);
        let query = 'INSERT INTO users (user_name, user_pass) VALUES (?, ?)';
        await conection.execute(query, [name, passHashed]);
        res.status(200).json({ message: `Usuario ${name} registrado con exito.`, redirect: '/login.html' });
    } catch (e) {
        res.status(500).json({ error: 'Error al crear el usuario, vuelve a intentarlo mas tarde' });
    }
}

export const loginUser = async (req, res) => {

    const { user_name, user_pass } = req.body;
    const searchUserName = 'SELECT * FROM users WHERE user_name = (?)'
    const [rows] = await conection.execute(searchUserName, [user_name]);
    if (rows.length == 0) return res.status(404).json({ error: `Usuario: ${user_name} no encontrado`, user: user_name })
    try {
        const compararContraseñas = await bcrypt.compare(user_pass, rows[0].user_pass);
        if (compararContraseñas) {
            const token = jwt.sign({ user_name }, SECRET_KEY, { expiresIn: '5m' });
            res.cookie('jwt', token, {
                httpOnly: true, // No accesible por JavaScript en el navegador
                secure: false,   // Solo se envía a través de HTTPS
                sameSite: 'strict' // Previene CSRF
            });
            res.json({ success: 'success' });
        } else {
            res.status(404).send({ error: "Error, verifica tu contraseña" });
        }
    } catch (error) {
        console.log(error);
    }
}
export const logOut = async (req, res) => {
    // Eliminar la cookie llamada 'jwt'
    res.clearCookie('jwt');
    res.status(200).send('Sesión cerrada correctamente'); //responder con un json
}