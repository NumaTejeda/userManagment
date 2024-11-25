    import express from "express";
    import path from "path";
    import { dirname } from "path";
    import { fileURLToPath } from "url";
    import { authenticateToken } from "../middlewares/authMiddleware.js";

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    const router = express.Router();

    const sendHtml = (res, relativePath) => {
        res.sendFile(path.join(__dirname, relativePath));
    };

    router.get('/', authenticateToken, (req, res) => {
        sendHtml(res, '../views/auth/index.html');
    })

    router.get('/login.html', (req, res) => {
        sendHtml(res, '../views/auth/login.html')
    });
    router.get('/registro.html', (req, res) => {
        sendHtml(res, '../views/auth/registro.html')
    });

    // Rutas para operaciones CRUD
    const crudPaths = ['create', 'delete', 'update', 'read'];
    crudPaths.forEach(page => {
        router.get(`/${page}.html`, (req, res) => sendHtml(res, `../views/crud/${page}.html`));
    });

    export default router;