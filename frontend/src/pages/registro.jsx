import styles from "../styles/login.module.css";
import style from "../styles/registro.module.css";
import {Alert, Button, Form} from "react-bootstrap";
import {Link} from "@material-ui/core";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

const Registro=()=>{

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
        nombre:'',
        alerta:'',
        error: false
    });

    const onSubmit=async()=> {

        let newPostObj = {
        correo: dato.correo,
        password: dato.password,
        nombre: dato.nombre
        };

        console.log(newPostObj)

        console.log("Hola")

        try {
            //const login = await axios.post(`http://localhost:5000/registro`, newPostObj)
            const login = await axios.post(`https://digibook-backend.herokuapp.com/registro`, newPostObj)
            console.log(login.data)
            console.log(login.data.cod)

            if(login.data.cod === "00"){
                setData({
                    ...dato,
                    loggeado: true
                })
            // history.push({
            //       pathname: '/store',
            //       state: {  // location state
            //           loggeado: true,
            //           id: login.data.data.id_cuenta,
            //           admin: login.data.data.admin,
            //           biografia: login.data.data.biografia,
            //           imagen: login.data.data.imagen_perfil,
            //           name: login.data.data.nombre
            //       },
            //     });
                setData({
                    ...dato,
                    loggeado: true,
                      id: login.data.data.id_cuenta,
                      admin: login.data.data.admin,
                      biografia: login.data.data.biografia,
                      imagen: login.data.data.imagen_perfil,
                      name: login.data.data.nombre
                })
                window.location.href= '/store'
            }else{
                 setData({
                    ...dato,
                    alerta: login.data.msg,
                    error: true
                })
                console.log(login.data.error)
                console.log(login.data.query)
                console.log("Hola")
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
                        <p className={styles.titulo}>Regístrate</p>
                    </div>
                    <div className={styles.content}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formBasicName" className={style.space}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="name" name={"nombre"} placeholder="Enter name" onChange={handleChange} />
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail" className={style.space}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name={"correo"} placeholder="Enter email" onChange={handleChange} />
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name={"password"} placeholder="Password"  onChange={handleChange}/>
                              </Form.Group>
                              <div className={styles.botones}>
                                  <Button type="submit" className={styles.botonI}>Regístrate</Button>{' '}
                              </div>

                            </Form>
                    </div>
                    <div className={style.olvido}>
                        <Link href="../pages/login">
                            <a href="/login" className={styles.botonO}>
                                ¿Ya tienes cuenta?
                            </a>
                    </Link>
                    </div>
                </div>

            </div>


        </>

    )
}

export default Registro;
