import express from "express";
import authRoutes from "./authRoutes.js"
import viewRoutes from "./viewRoutes.js"
import itemsRoutes from "./itemsRoutes.js"

const router = express.Router();

router.use('/', viewRoutes)
router.use('/api', authRoutes)
router.use('/api/items', itemsRoutes)


export default router