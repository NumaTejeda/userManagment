import express from 'express';
import routes from './routes/index.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cookieParser from 'cookie-parser'; // Para manejar cookies


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 3100;


const app = express();



//Middleware para parsear el cuerpo de la solicitud
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar cookies
app.use(cookieParser());

// Middleware para servir archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes)

app.listen(port, () => {
    console.log(`Abrime => http://localhost:${port}`);
})