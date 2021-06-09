import { Request, Response} from 'express';
import pool from '../elephantsql'

class IndexController {
    public async login (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)

        const user = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
        console.log(user.rowCount)

        if(user.rowCount != 0){
            if(req.body.password === user.rows[0].password){
                console.log(user.rows[0])
                res.json(user.rows[0])
            }else{
                res.status(400).json({msg: "Credenciales invalidas"})
            }
        }else{
            res.status(404).json({msg: "Usuario no registrado"})
        }
    }

      public async register (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)

        const validacion = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])

        if(validacion.rowCount != 0) {
            res.status(404)
            res.json({msg: "Usuario ya existe"})

        }else{
            const user = await pool.query('INSERT INTO cuenta(correo, password, nombre) VALUES($1, $2, $3)', [req.body.correo, req.body.password, req.body.nombre])
            const datos = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])

            console.log(user)

            if(user.rowCount != 0) {
            console.log(datos.rows[0])
            res.json(datos.rows[0])

            }else{
                res.status(404)
                res.json({msg: "Fallo en registro"})
            }
        }
    }

    public async recuperarPsw (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)

        const datos = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])

        if(datos.rowCount === 0) {
            res.status(404)
            res.json({msg: "Usuario no existe"})

        }else{
            const user = await pool.query('UPDATE cuenta SET password = $1 WHERE correo = $2', [req.body.password, req.body.correo])

            console.log(user)

            if(user.rowCount != 0) {
            console.log(datos.rows[0])
            res.json(datos.rows[0])

            }else{
                res.status(404)
                res.json({msg: "Fallo en recuperar contraseña"})
            }
        }
    }

}

 const indexController = new IndexController();
 export default  indexController;
