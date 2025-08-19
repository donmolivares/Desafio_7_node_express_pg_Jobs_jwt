
import {Usuarios_Models} from '../models/1_Paso_Usuarios_Models.js'
import { getDatabaseError } from "../../lib/errors/database.error.js";
import HATEOAS from '../helpers/hateoas.js'


/************** aca hice un select simple ***************************
export const Select_all_joyas_controller = async (req, res) => {
  try {
    const v_post = await Select_all_joyas_Model(5, "ASC", 1) 
    res.status(200).json( v_post )
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
    console.error('Error =>', error)
  }
}*/

export const Seleccionar_todos_los_usuarios_Controller = async (req, res) => {

  try {
    const todos = await Usuarios_Models.Seleccionar_todos_usuarios_Model();
    return res.json(todos);
  } catch (error) {
    console.log(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
   }

export const Crea_usuarios_controller = async (req, res) => {
  try {
    const {email, password, rol, lenguage} = req.body
    console.log('Datos pasados en Controlers '+email, password, rol, lenguage);
    const newPost = await Usuarios_Models.Crea_usuarios_Model({email, password, rol, lenguage})
    res.status(201).json({ posts: newPost })
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
    console.error('Error =>', error)
  }
}


export const Busca_usuarios_controller = async (req, res) => {
  try {
    const { email } = req.params
    console.log('consulto por '+email)

    if (!id) {
      return res.status(400).json({ error: 'el Usuario Ingresada no esta' })
    }
    const posts = await Usuarios_Models.Busca_usuarios_Model(email)

    posts.id !== "" && (
      console.log('USUARIO YA INGRESADO '+email)
    )

    res
      .status(!posts ? 404 : 200)// si posts viene vacio esta en blanco le pone 404 si trae algo 200
      .json(!posts ? { error: 'este usuario ('+id+') No fue encontrado' } : {posts }) // si es undefined arroja este error
     
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const Modifica_usuarios_controller = async (req, res) => {
  try {
    const { id } = req.params
    const posts = await Usuarios_Models.Modifica_usuarios_Model(id)
    if (posts === 0) {
      return res.status(404).json({ error: 'La Joya no fue encontrado' })
    }
    res.status(201).json({ message: 'Usuario fue Actualizada con Exito' })
  } catch (error) {
    res
    .status(500)
    .json({ error })
    console.error('Error =>', error)
  }
}

/*  LO HICE POR MI PARTE PARA MODIFICAR TODOS LOS CAMPOS DE UN ATABLA NO SOLO LIKES     MARCELO OLIVARES
export const Modifica_joyas_controller = async (req, res) => {
  try {
    const { id } = req.params
    console.log(req.body)
    const { titulo, img, descripcion} = req.body
    console.log(req.body)
    const campos= { titulo, img, descripcion } ;
    const posts = await Modifica_joyas_Model(id, campos)
    res.status(201).json({ posts })
    if (posts === 0) {
      return res.status(404).json({ error: 'Posts no fue encontrado' })
    }
    res.status(201).json({ message: 'Posts fue Actulizado con Exito' })
  } catch (error) {
    res.status(500).json({ error })
    console.error('Error =>', error)
  }
}
*/

export const Elimina_usuarios_controller = async (req, res) => {
  try {
    const  {id} = req.params
    const posts = await Usuarios_Models.Elimina_usuarios_Model(id)
    if (posts === 0) {
      return res.status(404).json({ error: 'Usuario no fue encontrado' })
    }
    res.status(200).json({ message: 'Se elimino exitosamente el Usuario' })
  } catch (error) {
    res.status(500).json({ error })
    console.error('Error =>', error)
  }
}

//HATEOAS
export const Usuarios_Hateoas_controller = async (req, res) => {
  try {
    const alljoyas = await Usuarios_Models.Usuarios_Hateoas_Model()
    console.log(alljoyas)
    const hateoasData = await HATEOAS('joyas', alljoyas)
     console.log(hateoasData)
    res.status(200).json({ joyas: hateoasData })
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
    console.error('Error =>', error)
  }
}

export const Usuarios_Controls = {
  Seleccionar_todos_los_usuarios_Controller,
  Busca_usuarios_controller,
  Crea_usuarios_controller,
  Elimina_usuarios_controller,
  Modifica_usuarios_controller,
  Usuarios_Hateoas_controller,
};