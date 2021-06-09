import styles from "../styles/login.module.css";
import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Login=function (){

    let history = useHistory()

    const {handleSubmit,} = useForm({
        reValidateMode:'onSubmit'
    });

     const [dato, setData] = useState({
        correo:'',
        password:'',
        loggeado: false,
        id:'',
        admin:0,
        biografia:'',
        imagen:''
    });

    const onSubmit=async()=> {

        let newPostObj = {
        correo: dato.correo,
        password: dato.password
        };

        console.log(newPostObj)


        const login = await axios.post(`http://localhost:5000/login`, newPostObj)
        console.log("HOLAAA" + login.status)

        if(login.status === 200){
            history.push({
                  pathname: '/store',
                  state: {  // location state
                      loggeado: true,
                      id: login.data.id_cuenta,
                      admin: login.data.admin,
                      biografia: login.data.biografia,
                      imagen: login.data.imagen_perfil
                  },
                });
        }else{
            console.log(login.status)
        }

    }

     const handleChange = e =>{
          setData({
              ...dato,
              [e.target.name] : e.target.value
          })
         console.log(dato.password)
         console.log(dato.correo)

      }


    return(
        <>
            <div className={styles.suscribe}>
                <div className={styles.form}>
                    <div>
                        <p className={styles.titulo}>Iniciar sessión</p>
                    </div>
                    <div className={styles.content}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                              <Form.Group controlId="formBasicEmail" className={styles.space}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name={"correo"} placeholder="Enter email" onChange={handleChange}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name={"password"} placeholder="Password" onChange={handleChange}/>
                              </Form.Group>
                              <div className={styles.botones}>
                                  <Button type="submit" className={styles.botonI}>Iniciar Sessión</Button>{' '}
                              </div>

                            </Form>
                        {}
                    </div>
                    <div className={styles.olvido}>
                        <Link href="../pages/recuperarPsw">
                        <a href="/Recuperar" className={styles.botonO}>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </Link>
                    </div>
                </div>

            </div>


        </>

    )
}

export default Login;
