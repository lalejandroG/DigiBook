import { Request, Response} from 'express';
import pool from '../elephantsql'

class IndexController {
    public async login (req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.newPostObj)
        console.log(req.body.newPostObj.correo)

        const user = []
        user[0] = [await pool.query('SELECT * FROM cuenta as c WHERE c.correo = ?', req.body.newPostObj.correo)]
        console.log("mierda")
        const userjson = JSON.parse(JSON.stringify(user))[0]

        if(userjson){
            if(req.body.newPostObj.password === userjson.contraseña){
                res.json(user)
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
