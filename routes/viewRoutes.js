import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth/index.html'));
})
router.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth/login.html'))
})
router.get('/registro.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth/registro.html'))
});
router.get('/create.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/crud/create.html'));
});
router.get('/delete.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/crud/delete.html'));
});
router.get('/update.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/crud/update.html'));
});
router.get('/read.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/crud/read.html'));
});

export default router;