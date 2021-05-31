import styles from "../styles/login.module.css";
import style from "../styles/registro.module.css";
import {Button, Form} from "react-bootstrap";
import {Link} from "@material-ui/core";
import React from "react";

const RecuperarPsw=()=>{

    return(
        <>
            <div className={styles.suscribe}>
                <div className={styles.form}>
                    <div>
                        <p className={styles.titulo}>Recuperar contraseña</p>
                    </div>
                    <div className={styles.content}>
                            <Form>
                                <Form.Group controlId="formBasicEmail" className={style.space}>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>New password</Form.Label>
                                <Form.Control type="password" placeholder=" New password" />
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword" className={style.space}>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control type="password" placeholder="Repeat password" />
                              </Form.Group>

                              <div className={styles.botones}>
                                  <Button className={styles.botonI}>Recuperar</Button>{' '}
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