import { Router } from 'express'
import { loginUser } from '../src/controllers/2_Paso_Auth_Usuarios_Controllers.js'

const router = Router()

router.post('/login', loginUser)

export default router
