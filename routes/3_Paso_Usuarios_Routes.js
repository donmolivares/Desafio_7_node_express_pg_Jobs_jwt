


import { Usuarios_Controls } from '../src/controllers/2_Paso_Usuarios_Controllers.js';

import { verifyToken } from '../middleware/verifyToken.middleware.js'



import { Router } from 'express'

const router = Router()

//Consultar informacion
console.log(router)
router.get('/usuarios', Usuarios_Controls.Seleccionar_todos_los_usuarios_Controller)
//Agregar un Registro

//Buscar uno 
router.get('/usuarios/perfil', Usuarios_Controls.Busca_usuarios_controller)


router.post('/usuarios', Usuarios_Controls.Crea_usuarios_controller)


//Modificar
router.put('/usuarios/:id', Usuarios_Controls.Modifica_usuarios_controller)
//Eliminar
router.delete('/usuarios/:id', verifyToken, Usuarios_Controls.Elimina_usuarios_controller)
// HATEOAS
router.get('/Usuarioswithhateoas', Usuarios_Controls.Usuarios_Hateoas_controller)

router.post('/register', Usuarios_Controls.Crea_usuarios_controller)


export default router