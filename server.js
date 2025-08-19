import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints';

import 'dotenv/config'

import UsuariosRoutes from './routes/3_Paso_Usuarios_Routes.js'
import AuthRoutes     from './routes/3_Paso_auth_routes.js'

import { JobsLog } from './middleware/Jobs.middleware.js'




const PORT = process.env.PORT || 3000
const app = express()

console.log(listEndpoints(app));

app.use(express.json())
app.use(cors())

app.use(JobsLog)


app.use(UsuariosRoutes)
app.use(AuthRoutes)


app.listen(PORT, console.log(`🔥 Server On http://localhost:${PORT}`))
