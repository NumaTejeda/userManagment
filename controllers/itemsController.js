import connection from "../config/db.js";
import bcript from "bcryptjs";

export const createItem = async (req, res) => {
    try {
        let { name, pass } = await req.body;
        if (typeof name === 'undefined' || name === null || name.trim().length === 0) {
            res.status(400).json({ error: 'Verifica el nombre por favor' });
            return;
        }
        let passHashed = await bcript.hash(pass, 10);
        let query = 'INSERT INTO users (user_name, user_pass) VALUES (?, ?)';
        const [result] = await connection.execute(query, [name, passHashed]);
        res.status(200).json({ message: 'Usuario creado', id: result.insertId, name });
    } catch (e) {
        res.status(500).json({ error: 'Error al crear el usuario, vuelve a intentarlo mas tarde' });
        console.log(e);
    }
}
export const getItems = async (req, res) => {
    let [result] = await connection.execute('SELECT * FROM users'); //traes contraseñas y todo (!!!!!)
    res.json(result)
}
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        let idNumber = parseInt(id)
        let select = 'SELECT * FROM users WHERE id_user = (?)'
        let [resSelect] = await connection.execute(select, [idNumber])
        if (resSelect.length > 0) {
            let query = 'DELETE FROM users WHERE id_user = (?)'
            let [result] = await connection.execute(query, [idNumber]);
            res.status(200).json({ eliminado: result.affectedRows, message: `ELIMINADO! Usuario: ${resSelect[0].user_name}` })
        } else {
            res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor' })
        console.log(err);
    }
}
export const updateItem = async (req, res) => {
    const { id, name } = req.body
    let query = 'UPDATE users SET user_name = ? WHERE id_user = ?'
    let [result] = await connection.execute(query, [name, id])
    res.status(200).json({ message: `Usuario con id: ${id} actualizado a: ${name}` })
}