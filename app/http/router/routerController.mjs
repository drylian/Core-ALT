import applicationRouter from './api/application.mjs'
import express from 'express'
const router = express.Router()

router.use('/api', applicationRouter);

export default router