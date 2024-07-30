import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../config/development.env') });


const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateToken = async (req, res, next) => {
    const token = await req.cookies.jwt;
    if (!token) {
        res.redirect('/login.html')
        return;
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.redirect('/login.html');
        }
        req.user = user;
        console.log(user)
        next();
    });
};
