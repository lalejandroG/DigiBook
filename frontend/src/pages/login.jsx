import styles from "../styles/login.module.css";
import {Button, Form} from "react-bootstrap";
import diamante from "../assets/Group.png";
import React from "react";
import {Link} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Login=()=>{
    //
    // const handleSubmit=()=> {
    //     return(
    //
    //         )
    // }

    return(
        <>
            <div className={styles.suscribe}>
                <div className={styles.form}>
                    <div>
                        <p className={styles.titulo}>Iniciar sessión</p>
                    </div>
                    <div className={styles.content}>
                            <Form>
                              <Form.Group controlId="formBasicEmail" className={styles.space}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                              </Form.Group>
                              <div className={styles.botones}>
                                  <Link href="../pages/store">
                                      <Button href='/store' className={styles.botonI}>Iniciar Sessión</Button>{' '}
                                  </Link>
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
