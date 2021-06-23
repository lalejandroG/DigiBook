import { Request, Response} from 'express';
import pool from '../elephantsql'
import {Md5} from 'ts-md5/dist/md5'

class IndexController {
    public async login (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)
        try {
            const user = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
            console.log(user.rowCount)

            if(Md5.hashStr(req.body.password) === user.rows[0].password){
                console.log(Md5.hashStr(req.body.password) + " EN BD: " +user.rows[0].password)
                console.log(user.rows[0])

                res.json({data: user.rows[0], cod: "00"})
            }else{

                res.json({msg: "Credenciales invalidas", cod: "01"})
            }

        } catch (error) {

            res.json({msg: "Credenciales invalidas", cod: "01", error: error})
        }
    }

    public async getRecurso (req: Request, res: Response) {

        try {
            const recurso = await pool.query('SELECT * FROM recurso')
            console.log(recurso.rows)
            res.send({data: recurso, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
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
                    const user = await pool.query('INSERT INTO cuenta(correo, password, nombre) VALUES($1, md5($2), $3)', [req.body.correo, req.body.password, req.body.nombre])
                    const datos = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])

                    console.log(user)

                    if(user.rowCount != 0) {
                        console.log(datos.rows[0])

                        res.json({data: datos.rows[0], cod: "00"})

                    }else{

                        res.json({msg: "Error al registrar", cod: "01"})
                    }
                }catch (error) {

                    res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
                }
            }

        } catch (error) {

            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
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
                    const user = await pool.query('UPDATE cuenta SET password = md5($1) WHERE correo = $2', [req.body.password, req.body.correo])

                    console.log(user)

                    if(user.rowCount != 0) {
                        console.log(datos.rows[0])

                        res.json({data: datos.rows[0], cod: "00"})

                    }else{

                        res.json({msg: "Fallo en recuperar contraseña", cod: "01"})
                    }
                }catch (error) {

                    res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
                }
            }

        } catch (error) {

            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }

    }

    public async perfil (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)
        try {
            const user = await pool.query('SELECT * FROM cuenta as c WHERE c.id_cuenta = $1', [req.body.id])
            console.log(user.rowCount)

            if(user.rowCount === 0){
                console.log(user.rows[0])

                res.json({data: user.rows[0], cod: "00"})
            }else{

                res.json({msg: "Usuario no registrado", cod: "01"})
            }

        } catch (error) {

            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async detalle_producto (req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
           const recurso = await pool.query('SELECT r.resumen, r.titulo, r.imagen, r.url, co.id_cuenta, co.contenido, avg(co.calificacion), cu.nombre FROM recurso as r, comentario as co, cuenta as cu WHERE r.id_recurso = $1 AND co.id_recurso = $1 AND cu.id_cuenta = co.id_cuenta GROUP BY co.calificacion, r.resumen, r.titulo, r.imagen, r.url, co.id_cuenta, co.contenido, cu.nombre ORDER BY co.contenido LIMIT 1 ', [req.body.id])
            console.log(recurso.rows)

            res.json({data: recurso, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async favorite (req: Request, res: Response) {

        try {
            const fav = await pool.query('SELECT * FROM favoritos WHERE id_cuenta = $1', [req.body.id])

            if(fav.rowCount != 0){
                const recurso = await pool.query('SELECT * FROM recurso')
                console.log(recurso.rows)
                res.send({data: recurso, cod: "00"})

            }else{
                res.json({msg: "No posee favoritos", cod: "01", error: "No posee favoritos"})
            }

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }


}

 const indexController = new IndexController();
 export default  indexController;
