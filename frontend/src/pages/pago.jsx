import styles from "../styles/pago.module.css";
import {Alert, Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "@material-ui/core";
import axios from "axios";
import Store from "./store"
import {Route} from "react-router-dom";
import CreditCard from "../components/modalCreditCard";

const Pago=function (){


    const {handleSubmit,} = useForm({
        reValidateMode:'onSubmit'
    });

     const [dato, setData] = useState({
        correo:'',
        password:'',
        loggeado: false,
        id:'',
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
            // const login = await axios.post(`https://digibook-backend.herokuapp.com/login`, newPostObj)
            const login = await axios.post(`http://localhost:5000/login`, newPostObj)
            console.log(login.data)
            console.log(login.data.cod)

            if(login.data.cod === "00"){
                setData({
                    ...dato,
                    loggeado: true,
                    id: login.data.data.id_cuenta,
                })

                // window.location.href= `https://digibook-ffb1b.web.app/store/${login.data.data.id_cuenta}`
                window.location.href= `http://localhost:3000/store/${login.data.data.id_cuenta}`

            }else{
                 setData({
                    ...dato,
                    alerta: login.data.msg,
                    error: true
                })
                console.log(login.data.error)
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
                        <p className={styles.titulo}>Pago Premium</p>
                    </div>
                    <div className={styles.content}>
                            <Form className={styles.datos}>
                              <Form.Group controlId="formBasicEmail" className={styles.space}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name={"correo"} placeholder="Enter email" onChange={handleChange}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name={"password"} placeholder="Password" onChange={handleChange}/>
                              </Form.Group>
                            </Form>
                           <div className={styles.tarjeta}>
                              <CreditCard correo={dato.correo} password={dato.password}/>
                           </div>
                    </div>
                    <div className={styles.olvido}>
                        <Link href="../pages/registro">
                        <a href="/registro" className={styles.botonO}>
                            ¿No tienes cuenta?
                        </a>
                    </Link>
                    </div>
                </div>

            </div>


        </>

    )
}

export default Pago;
