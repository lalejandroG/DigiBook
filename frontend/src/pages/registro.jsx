import styles from "../styles/login.module.css";
import style from "../styles/registro.module.css";
import {Button, Form} from "react-bootstrap";
import {Link} from "@material-ui/core";
import React from "react";

const Registro=()=>{

    return(
        <>
            <div className={styles.suscribe}>
                <div className={styles.form}>
                    <div>
                        <p className={styles.titulo}>Regístrate</p>
                    </div>
                    <div className={styles.content}>
                            <Form>
                                <Form.Group controlId="formBasicName" className={style.space}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter name" />
                              </Form.Group>

                              <Form.Group controlId="formBasicEmail" className={style.space}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                              </Form.Group>
                              <div className={styles.botones}>
                                  <Button className={styles.botonI}>Regístrate</Button>{' '}
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