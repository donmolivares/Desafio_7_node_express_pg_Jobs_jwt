import pg from 'pg'
import 'dotenv/config'

const {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE} = process.env;

const pool = new pg.Pool({
 host: DB_HOST,
 user : DB_USER,
 password : DB_PASSWORD,
 database : DB_DATABASE,
 allowExitOnIdle : true
})

pool.query('SELECT NOW()', (err,res)=>{
    if (err){
        console.log('error conecting to BD ',err)

    }else{
        console.log('se ha conectado a BD ',res.rows[0])
    }
})


export default pool;


/*
const pool = new pg.Pool({
    host: 'localhost',
    user : 'postgres',
    password : 'Postgres@1234',
    database : 'milike',
    port : '5432',
    allowExitOnIdle : true //permite que la base de datos se abra y cierra al terminar una accion
})*/