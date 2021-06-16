import styles from "../styles/login.module.css";
import style from "../styles/registro.module.css";
import {Alert, Button, Form} from "react-bootstrap";
import {Link} from "@material-ui/core";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

const RecuperarPsw=()=>{

    let history = useHistory()

     const {handleSubmit} = useForm({
        reValidateMode:'onSubmit'
    });

     const [dato, setData] = useState({
        correo:'',
        password:'',
        passwordValidate:'',
        loggeado: false,
        id:'',
        admin:0,
        biografia:'',
        imagen:'',
        nombre:'',
        validado: true,
        alerta:'',
        error: false
    });

    const onSubmit=async()=> {

        let newPostObj = {
        correo: dato.correo,
        password: dato.password,
        passwordValidate: dato.passwordValidate
        };

        console.log(newPostObj)

        if(dato.password === dato.passwordValidate){

            setData({
                ...dato,
                validado: true
            })

            console.log("mierda")
            try {
                const login = await axios.post(`https://digibook-apis.herokuapp.com/recuperar`, newPostObj)
                console.log(login.data.data)
                console.log(login.data.cod)

                if(login.data.cod === "00"){
                    setData({
                        ...dato,
                        loggeado: true
                    })
                    history.push( '/login');

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

        }else{
            setData({
                ...dato,
                validado: false
            })
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
                {!dato.validado ?
                    <Alert variant="danger" className={styles.alertas}>Las contraseñas deben ser iguales</Alert>
                :''
                }
                {dato.error ?
                    <Alert variant="danger" className={styles.alertas}>{dato.alerta}</Alert>
                :''
                }
                <div className={styles.form}>
                    <div>
                        <p className={styles.titulo}>Recuperar contraseña</p>
                    </div>
                    <div className={styles.content}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formBasicEmail" className={style.space}>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name={"correo"} placeholder="Enter email" onChange={handleChange} />
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>New password</Form.Label>
                                <Form.Control type="password" name={"password"} placeholder=" New password" onChange={handleChange}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword" className={style.space}>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name={"passwordValidate"}
                                    placeholder="Repeat password"
                                    onChange={handleChange}
                                />
                              </Form.Group>

                              <div className={styles.botones}>
                                  <Button type="submit" className={styles.botonI}>Recuperar</Button>{' '}
                              </div>

                            </Form>
                    </div>
                    <div className={style.olvido}>
                        <Link href="../pages/landingPage">
                            <a href="/" className={styles.botonO}>
                                Cancelar
                            </a>
                    </Link>
                    </div>
                </div>

            </div>


        </>

    )
}

export default RecuperarPsw;
