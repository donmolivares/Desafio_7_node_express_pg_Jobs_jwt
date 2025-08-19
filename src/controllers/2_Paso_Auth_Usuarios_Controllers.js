import { Usuarios_Models } from '../models/1_Paso_Usuarios_Models.js'
import bcrypt from 'bcryptjs'


import jwt from 'jsonwebtoken'

import 'dotenv/config'


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('entro login cn email '+email, password )
    const user = await Usuarios_Models.Busca_usuarios_Model(email) // SELECT * FROM usuarios WHERE email = ag@gmail.com
    if (!user) {
      return res.status(401)
        .json({ message: 'Usuario no encontrado o No autorizado' })
    }                                           //1234  ==? $2534536hfhfgdg3653527253g   
    
    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const token = jwt.sign({ email }, process.env.JWTSECRET, {
      expiresIn: '2h'
    })

    return res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { loginUser }