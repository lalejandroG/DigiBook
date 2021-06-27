import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/landingPage.module.css";
import React from "react";
import {Button} from "react-bootstrap";
import diamante from "../assets/Group.png";
import {Padding} from "@material-ui/core/TableCell/TableCell";
import {Link} from "@material-ui/core";


const LandigPage=()=>{

    return(
        <>
            <div className={styles.suscribe}>
                <p className={styles.titulo}>SUBSCRIPTIONS</p>
            </div>
            <div className={styles.content}>
                <div className={styles.option}>
                <div className={styles.value}>
                    <span className={styles.free}>FREE</span>
                    <span>$0.0</span>
                </div>
                <div>
                    <ul>
                        <li>VER RESEÑAS</li>
                        <li>REALIZAR BÚSQUEDAS</li>
                        <li>DEJAR RESEÑAS</li>

                    </ul>
                </div>
                    <Link href="../pages/login">
                    <a href="/login">
                        <a className={styles.prueba}>
                            <Button className={styles.boton}>GET FREE</Button>{' '}
                        </a>
                    </a>
                </Link>
            </div>
            <div>
                <div className={styles.value}>
                    <span className={styles.titleImage}>
                        <img src={diamante} alt={"diamante"} />
                        PREMIUM
                    </span>
                    <span>$9.99</span>
                </div>
                <div>
                    <ul>
                        <li>DESCARGAR CONTENIDO</li>
                        <li>ELIMINAR CONTENIDO</li>
                        <li>AÑADIR RECURSOS</li>

                    </ul>
                </div>
                <Link href="../pages/pago">
                    <a href="/pago">
                        <a className={styles.prueba}>
                            <Button className={styles.boton}>GET PREMIUM</Button>{' '}
                        </a>
                    </a>
                </Link>

            </div>
            </div>

        </>

    )
}

export default LandigPage;
