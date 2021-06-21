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
                await pool.end()
                res.json({data: user.rows[0], cod: "00"})
            }else{
                await pool.end()
                res.json({msg: "Credenciales invalidas", cod: "01"})
            }

        } catch (error) {
            await pool.end()
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
                        await pool.end()
                        res.json({data: datos.rows[0], cod: "00"})

                    }else{
                        await pool.end()
                        res.json({msg: "Error al registrar", cod: "01"})
                    }
                }catch (error) {
                    await pool.end()
                    res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
                }
            }

        } catch (error) {
            await pool.end()
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
                        await pool.end()
                        res.json({data: datos.rows[0], cod: "00"})

                    }else{
                        await pool.end()
                        res.json({msg: "Fallo en recuperar contraseña", cod: "01"})
                    }
                }catch (error) {
                    await pool.end()
                    res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
                }
            }

        } catch (error) {
            await pool.end()
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
                await pool.end()
                res.json({data: user.rows[0], cod: "00"})
            }else{
                await pool.end()
                res.json({msg: "Usuario no registrado", cod: "01"})
            }

        } catch (error) {
            await pool.end()
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async detalle_producto (req: Request, res: Response) {
        //TODO ARREGLAR ESTO PORQUE HAY UN SOLO RECURSO CON ESE ID PERO VARIOS COMENTARIO ASI QUE NO SE QUE RETORNA

        console.log(req.body)
        console.log(req.body.correo)
        try {
            const producto = await pool.query('SELECT r.resumen, r.titulo, r.imagen, r.url, c.id_cuenta, c.contenido, avg(c.calificacion), cu.nombre FROM recurso as r, comentario as c, cuenta as cu WHERE r.id_recurso = $1 AND c.id_recurso = $1 AND cu.id_cuenta = c.id_cuenta ', [req.body.id])
            console.log(producto.rowCount)

            if(producto.rowCount === 0){
                console.log(producto.rows[0])
                await pool.end()
                res.json({data: producto.rows[0], cod: "00"})
            }else{
                await pool.end()
                res.json({msg: "Recurso no registrado", cod: "01"})
            }

        } catch (error) {
            await pool.end()
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async favorite (req: Request, res: Response) {
        //TODO ARREGLAR ESTO PORQUE DEBE DEVOLVER UN ARRAY

        console.log(req.body)
        console.log(req.body.correo)
        try {
            const producto = [await pool.query('SELECT f.id_recurso, r.titulo, r.imagen, FROM favoritos as f, recurso as r WHERE f.id_cuenta = $1 AND r.id_recurso = f.id_recurso ', [req.body.id])]
            //console.log(producto.rowCount)

            if(!producto){
                //console.log(producto.rows[0])
                await pool.end()
                res.json({data: producto, cod: "00"})
            }else{
                await pool.end()
                res.json({msg: "Recurso no registrado", cod: "01"})
            }

        } catch (error) {
            await pool.end()
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }


}

 const indexController = new IndexController();
 export default  indexController;
