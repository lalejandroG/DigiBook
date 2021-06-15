import { Request, Response} from 'express';
import pool from '../elephantsql'

class IndexController {
    public async login (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)

        try {
            const user = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
            console.log(user.rowCount)

            if(req.body.password === user.rows[0].password){
                console.log(user.rows[0])
                res.json({data: user.rows[0], cod: "00"})
            }else{
                res.json({msg: "Credenciales invalidas", cod: "01"})
            }

        } catch (error) {
            res.json({msg: "Usuario no registrado", cod: "01"})
        }
    }

      public async register (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)

        try {
            const validacion = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
            console.log(validacion.rowCount)


            if(validacion.rowCount != 0) {
                res.json({msg: "Usuario ya existe", cod: "01"})

            }else{
                try{
                    const user = await pool.query('INSERT INTO cuenta(correo, password, nombre) VALUES($1, $2, $3)', [req.body.correo, req.body.password, req.body.nombre])
                    const datos = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])

                    console.log(user)

                    if(user.rowCount != 0) {
                        console.log(datos.rows[0])
                        res.json({data: datos.rows[0], cod: "00"})

                    }else{
                        res.json({msg: "Error al registrar", cod: "01"})
                    }
                }catch (error) {
                    res.json({msg: "Usuario ya existe", cod: "01"})
                }
            }

        } catch (error) {
            res.json({msg: "Usuario no existe"})
        }

    }

    public async recuperarPsw (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)


        try {
            const datos = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
            console.log(datos.rowCount)

            if(datos.rowCount === 0) {
                res.json({msg: "Usuario no existe", cod: "01"})

            }else{
                try{
                    const user = await pool.query('UPDATE cuenta SET password = $1 WHERE correo = $2', [req.body.password, req.body.correo])

                    console.log(user)

                    if(user.rowCount != 0) {
                    console.log(datos.rows[0])
                    res.json({data: datos.rows[0], cod: "00"})

                    }else{
                        res.json({msg: "Fallo en recuperar contraseña", cod: "01"})
                    }
                }catch (error) {
                    res.json({msg: "Usuario no existe", cod: "01"})
                }
            }

        } catch (error) {
            res.json({msg: "Usuario no existe"})
        }

    }

}

 const indexController = new IndexController();
 export default  indexController;
