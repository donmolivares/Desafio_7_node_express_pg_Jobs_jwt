import pool from '../../db/config.js'
import format from "pg-format";
import "dotenv/config";
import bcrypt from 'bcryptjs'


// aca se ponen todos los modelos de SQL select INSERT SELECT UPDATE DELETE 

/* TODO BIEN SOLO QUE ABAJO LA HAREMOS CON PAGINACION
export const Select_all_joyas_Model = async () => {
  const sqlQuery = 'SELECT * FROM INVENTARIO ORDER BY ID'
  const response = await pool.query(sqlQuery)
  return response.rows
}*/


export const Seleccionar_todos_usuarios_Model = async (req,res) => {
  // Consulta para contar el número total de filas en la tabla 'todos'
  const consultaSql = "SELECT * FROM USUARIOS";
  const Lista_usuarios  = await pool.query(consultaSql);
  return Lista_usuarios.rows
};

export const Crea_usuarios_Model = async ({email, password, rol, lenguage }) => {
  console.log('Datos pasados al models '+email, password, rol, lenguage )
  const hashedPassword = bcrypt.hashSync(password)
  const consultaSql = 'INSERT INTO USUARIOS (email, password, rol, lenguage) values ($1, $2, $3, $4) RETURNING *'
  const values = [email, hashedPassword, rol, lenguage]
  const result = await pool.query(consultaSql, values)
  return result.rows
}

export const Busca_usuarios_Model = async (email) => {
console.log('en model '+email)

  const consultaSql = {
    text: 'SELECT * FROM USUARIOS WHERE email = $1',
    values: [email]
  }

  console.log(consultaSql)
  const response = await pool.query(consultaSql)
  //************** */
  console.log('login encontrado ') 
  
  console.log(response.rows[0]) 
  return response.rows[0]
}

export const Modifica_usuarios_Model = async (id) => {
    const consultaSql = {
    text: 'UPDATE USUARIOS SET USUARIOS es+1 WHERE id = $1 RETURNING *',
    values: [id]
  }
  const response = await pool.query(consultaSql)
  return response.rows[0]
}

export const Elimina_usuarios_Model = async (id) => {
  const consultaSql = {
    text: 'DELETE FROM USUARIOS WHERE id = $1',
    values: [id]
  }
  const result = await pool.query(consultaSql)
  return result.rowCount
}

//HATEOAS
export const Usuarios_Hateoas_Model = async () => {
  const allUsuarios = await pool.query('SELECT * FROM USUARIOS')
  return allUsuarios.rows
}

export const Usuarios_Models = {
  Seleccionar_todos_usuarios_Model,
  Busca_usuarios_Model,
  Crea_usuarios_Model,
  Elimina_usuarios_Model,
  Modifica_usuarios_Model,
  Usuarios_Hateoas_Model,
};
































/*

/*  LO HICE POR MI PARTE PARA MODIFICAR TODOS LOS CAMPOS DE UN ATABLA NO SOLO LIKES     MARCELO OLIVARES

export const Modifica_joyas_Model = async ({ id, titulo, img, descripcion }) => {
  const sqlQuery = {
    text: 'UPDATE POSTS SET likes = likes+1, titulo =$2, img=$3, descripcion=$4  WHERE id = $1 RETURNING *',
    values: [id,titulo, img, descripcion]
  }
  const response = await pool.query(sqlQuery)
  return response.rows[0]
}*/



