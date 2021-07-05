import {query, Request, Response} from 'express';
import pool from '../elephantsql'
import {Md5} from 'ts-md5/dist/md5'

class IndexController {
    public async login(req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)
        try {
            const user = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
            console.log(user.rowCount)

            if (Md5.hashStr(req.body.password) === user.rows[0].password) {
                console.log(Md5.hashStr(req.body.password) + " EN BD: " + user.rows[0].password)
                console.log(user.rows[0])
                const pago = await pool.query('UPDATE cuenta SET premium = premium WHERE id_cuenta = $1', [user.rows[0].id_cuenta])
                res.json({data: user.rows[0], cod: "00"})
            } else {

                res.json({msg: "Credenciales invalidas", cod: "01"})
            }

        } catch (error) {

            res.json({msg: "Credenciales invalidas", cod: "01", error: error})
        }
    }

    public async getRecurso(req: Request, res: Response) {

        try {
            const recurso = await pool.query('SELECT * FROM recurso WHERE aprobado = True AND eliminado = false')
            console.log(recurso.rows)
            res.send({data: recurso, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async getCategoria(req: Request, res: Response) {

        try {
            const categoria = await pool.query('SELECT * FROM categoria')
            console.log(categoria.rows)
            res.send({data: categoria, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async getBusqueda(req: Request, res: Response) {

        try {
            var queryText = "SELECT recurso.*, ROUND(avg(comentario.calificacion), 0) AS promedio FROM recurso INNER JOIN comentario ON recurso.id_recurso = comentario.id_recurso WHERE aprobado = True AND (titulo LIKE '%" + req.body.busqueda + "%' OR resumen LIKE '%" + req.body.busqueda + "%')"
            var textCategoria = []
            var textEstrellas = []
            var num: number = 0
            var bool = false
            for (num = 0; num < req.body.idsCategorias.length; num++) {
                if (req.body.checksCategorias[num] == 1) {
                    textCategoria[textCategoria.length] = req.body.idsCategorias[num];
                }
            }
            if (textCategoria.length > 0) {
                queryText = queryText + " AND recurso.id_recurso IN (SELECT id_recurso FROM recurso_categoria WHERE id_categoria IN (" + textCategoria.toString() + ") GROUP BY id_recurso)"
            }
            for (num = 0; num < req.body.estrellas.length; num++) {
                if (req.body.estrellas[num] == 1) {
                    textEstrellas[textEstrellas.length] = num;
                }
            }
            queryText = queryText + " GROUP BY recurso.id_recurso"
            if (textEstrellas.length > 0) {

            }
            for (let i of textEstrellas) {
                if (bool) {
                    queryText = queryText + " OR "
                } else {
                    queryText = queryText + " HAVING "
                }
                bool = true
                queryText = queryText + "(ROUND(avg(comentario.calificacion), 0)=" + (i) + ")"
            }

            console.log(queryText)
            const recurso = await pool.query(queryText)
            console.log(recurso.rows)
            res.send({data: recurso, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async getRevisiones(req: Request, res: Response) {

        try {
            const recurso = await pool.query('SELECT * FROM recurso WHERE aprobado = False AND eliminado = false')
            console.log(recurso.rows)
            res.send({data: recurso, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async register(req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)
        try {
            const validacion = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
            console.log(validacion.rowCount)


            if (validacion.rowCount != 0) {
                res.json({msg: "Usuario ya existe", cod: "01"})

            } else {
                try {
                    const user = await pool.query('INSERT INTO cuenta(correo, password, nombre) VALUES($1, md5($2), $3)', [req.body.correo, req.body.password, req.body.nombre])
                    const datos = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])

                    console.log(user)

                    if (user.rowCount != 0) {
                        console.log(datos.rows[0])

                        res.json({data: datos.rows[0], cod: "00"})

                    } else {

                        res.json({msg: "Error al registrar", cod: "01"})
                    }
                } catch (error) {

                    res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
                }
            }

        } catch (error) {

            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }

    }

    public async recuperarPsw(req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)

        try {
            const datos = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
            console.log(datos.rowCount)

            if (datos.rowCount === 0) {
                res.json({msg: "Usuario no existe", cod: "01"})

            } else {
                try {
                    const user = await pool.query('UPDATE cuenta SET password = md5($1) WHERE correo = $2', [req.body.password, req.body.correo])

                    console.log(user)

                    if (user.rowCount != 0) {
                        console.log(datos.rows[0])

                        res.json({data: datos.rows[0], cod: "00"})

                    } else {

                        res.json({msg: "Fallo en recuperar contraseña", cod: "01"})
                    }
                } catch (error) {

                    res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
                }
            }

        } catch (error) {

            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }

    }

    public async perfil(req: Request, res: Response) {
        console.log(req.body)
        try {
            const user = await pool.query('SELECT * FROM cuenta WHERE id_cuenta = $1', [req.body.id])
            console.log(user.rows)

            res.json({data: user, cod: "00"})

        } catch (error) {

            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async publicados(req: Request, res: Response) {
        console.log(req.body)
        try {
            const publicados = await pool.query('SELECT * FROM recurso WHERE id_cuenta_publicador = $1', [req.body.id])
            console.log(publicados.rows)

            res.json({data: publicados, cod: "00"})

        } catch (error) {

            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async detalle_producto(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            const recurso = await pool.query('SELECT r.resumen, r.titulo, r.imagen, r.url, co.id_cuenta, co.contenido, avg(co.calificacion), cu.nombre FROM recurso as r LEFT JOIN comentario as co ON r.id_recurso = co.id_recurso LEFT JOIN cuenta as cu ON cu.id_cuenta = co.id_cuenta WHERE r.id_recurso = $1 GROUP BY co.calificacion, r.resumen, r.titulo, r.imagen, r.url, co.id_cuenta, co.contenido, cu.nombre  ORDER BY co.contenido LIMIT 1', [req.body.id_r])
            const fav = await pool.query('SELECT * FROM favoritos WHERE id_recurso = $1 AND id_cuenta = $2 ', [req.body.id_r, req.body.id])
            const premium = await pool.query('SELECT premium FROM cuenta WHERE id_cuenta = $1 ', [req.body.id])
            console.log(recurso.rows)
            console.log(premium.rows)

            if (fav.rows.length > 0) {
                res.json({data: recurso, fav: true, premium: premium.rows[0].premium, cod: "00"})
            } else {
                res.json({data: recurso, fav: false, premium: premium.rows[0].premium, cod: "00"})
            }

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async favorite(req: Request, res: Response) {

        try {
            const fav = await pool.query('SELECT f.id_recurso, r.titulo, r.imagen FROM favoritos as f, recurso as r WHERE f.id_cuenta = $1 AND r.id_recurso = f.id_recurso ', [req.body.id])
            console.log(fav.rows)

            res.send({data: fav, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async insertarFactura(req: Request, res: Response) {

        try {
            const factura = await pool.query('INSERT INTO factura (id_cuenta, nombre, numero_tarjeta, expiry_month, expiry_year, cvv, fecha) VALUES ($1, $2, $3, $4, $5, $6, NOW())', [req.body.id, req.body.name, req.body.number, req.body.expiryMonth, req.body.expiryYear, req.body.cvv])

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async comments(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id_r)
        try {
            const comments = await pool.query('SELECT co.id_cuenta, co.contenido, cu.nombre, co.calificacion FROM comentario as co, cuenta as cu WHERE co.id_recurso = $1 AND cu.id_cuenta = co.id_cuenta ', [req.body.id_r])
            console.log(comments.rows)

            res.json({data: comments, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async edit_profile(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            await pool.query('UPDATE cuenta SET nombre = $1, biografia = $2 WHERE id_cuenta = $3 ', [req.body.nombre, req.body.biografia, req.body.id])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async loggeado(req: Request, res: Response) {

        console.log(req.body.id_cuenta)
        try {
            await pool.query('UPDATE cuenta SET loggeado = true WHERE id_cuenta = $1 ', [parseInt(req.body.id_cuenta)])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async desloggeado(req: Request, res: Response) {

        console.log(req.body.id)
        try {
            await pool.query('UPDATE cuenta SET loggeado = false WHERE id_cuenta = $1 ', [parseInt(req.body.id)])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async eliminar_favs(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            await pool.query('DELETE FROM favoritos WHERE id_cuenta = $1 AND id_recurso = $2 ', [req.body.id, req.body.id_recurso])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async agregar_favs(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            await pool.query('INSERT INTO favoritos (id_cuenta, id_recurso)  VALUES ($1, $2) ', [req.body.id, req.body.id_recurso])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async comentar(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            await pool.query('INSERT INTO comentario (id_cuenta, id_recurso, contenido, calificacion)  VALUES ($1, $2, $3, $4) ', [req.body.id, req.body.id_r, req.body.comentario, req.body.calificacion])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async aprobar(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            await pool.query('UPDATE recurso SET aprobado = true WHERE id_recurso = $1 ', [req.body.id])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async usuarios(req: Request, res: Response) {

        try {
            const premium = await pool.query('SELECT * FROM cuenta WHERE premium = true')
            const free = await pool.query('SELECT * FROM cuenta WHERE premium = false')
            console.log(premium.rows)
            console.log(free.rows)

            res.send({premium: premium, free: free, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async eliminar(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            await pool.query('UPDATE recurso SET eliminado = true WHERE id_recurso = $1 ', [req.body.id])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async descargar(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            const url = await pool.query('SELECT url FROM recurso WHERE id_recurso = $1 ', [req.body.id])

            res.json({data: url, cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async cargar(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            await pool.query('INSERT INTO recurso (id_cuenta_publicador, titulo, url, imagen, resumen)  VALUES ($1, $2, $3, $4, $5) ', [req.body.id, req.body.titulo, req.body.url, req.body.imagen, req.body.resumen])

            const existeAutor = await pool.query('SELECT id_autor FROM autor WHERE nombre = $1 ', [req.body.autor])

            if (existeAutor.rows.length <= 0) {
                await pool.query('INSERT INTO autor (nombre)  VALUES ($1) ', [req.body.autor])
            }

            const existeCategoria = await pool.query('SELECT id_categoria FROM categoria WHERE nombre = $1 ', [req.body.categoria])

            if (existeCategoria.rows.length <= 0) {
                await pool.query('INSERT INTO categoria (nombre)  VALUES ($1) ', [req.body.autor])
            }

            await pool.query('INSERT INTO recurso_autor (id_recurso, id_autor)  VALUES (SELECT id_recurso FROM recurso ORDER BY id_recurso DESC, SELECT id_autor FROM autor WHERE nombre = $1) ', [req.body.autor])
            await pool.query('INSERT INTO recurso_categoria (id_recurso, id_categoria)  VALUES (SELECT id_recurso FROM recurso ORDER BY id_recurso DESC, SELECT id_categoria FROM categoria WHERE nombre = $1) ', [req.body.categoria])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

    public async cargar_perfil(req: Request, res: Response) {

        console.log(req.body)
        console.log(req.body.id)
        try {
            await pool.query('UPDATE cuenta SET imagen_perfil = $2 WHERE id_cuenta = $1 ', [req.body.id, req.body.imagen])

            res.json({cod: "00"})

        } catch (error) {

            console.log(error)
            res.json({msg: "No se pudo completar su petición", cod: "01", error: error})
        }
    }

}

const indexController = new IndexController();
export default indexController;
