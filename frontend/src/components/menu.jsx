import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/menu.module.css";
import {IconButton, Link} from "@material-ui/core";
import React, { Component } from "react";
import LandingPage from "../pages/landingPage";
import {Button} from "react-bootstrap";
import Login from "../pages/login";
import Registro from "../pages/registro";

const MenuDesplegable=()=>  {

        return(
        <>
            <div className={styles.navbarWrapper}>
                <div className={styles.botones}>
                    <Button className={styles.boton}>Suscripciones</Button>{' '}
                    <Button className={styles.boton}>Nosotros</Button>{' '}
                    <Button className={styles.boton}>Contáctanos</Button>{' '}
                </div>
                <div className={styles.login}>
                    <Link href="../pages/login">
                        <a href="/Login" >
                            <Button
                            className={styles.botonSecundario}
                            >Iniciar Sesión
                            </Button>{' '}
                        </a>
                    </Link>
                    <Link href="../pages/registro">
                        <a href="/Registro" >
                            <Button
                                type="submit"
                                className={styles.botonSecundario}
                            >Registrarse
                            </Button>{' '}
                        </a>
                    </Link>
                </div>
            </div>
        </>

    )

}

export default MenuDesplegable;