import { Request, Response} from 'express';
import pool from '../elephantsql'

class IndexController {
    public async login (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.correo)

        const user = await pool.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo])
        console.log("mierda")
        console.log(user.rowCount)

        if(user.rowCount != 0){
            if(req.body.password === user.rows[0].contraseña){
                console.log(user.rows[0])
                res.json(user.rows[0])
            }else{
                res.status(400).json({msg: "Credenciales invalidas"})
            }
        }else{
            res.status(404).json({msg: "Usuario no registrado"})
        }
    }
}

 const indexController = new IndexController();
 export default  indexController;
