import styles from "../styles/login.module.css";
import {Alert, Button, Form} from "react-bootstrap";
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
        imagen:'',
        alerta:'',
        error: false
    });

    const onSubmit=async()=> {

        let newPostObj = {
        correo: dato.correo,
        password: dato.password
        };

        console.log(newPostObj)

        try {
            const login = await axios.post(`http://localhost:5000/login`, newPostObj)
            console.log(login.data.data)
            console.log(login.data.cod)

            if(login.data.cod === "00"){
                setData({
                    ...dato,
                    loggeado: true
                })
            history.push({
                  pathname: '/store',
                  state: {  // location state
                      loggeado: true,
                      id: login.data.data.id_cuenta,
                      admin: login.data.data.admin,
                      biografia: login.data.data.biografia,
                      imagen: login.data.data.imagen_perfil,
                      name: login.data.data.nombre
                  },
                });
            }else{
                 setData({
                    ...dato,
                    alerta: login.data.msg,
                    error: true
                })
            }

        } catch (error) {
            console.log(error)
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
                {dato.error ?
                    <Alert variant="danger" className={styles.alertas}>{dato.alerta}</Alert>
                :''
                }
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
