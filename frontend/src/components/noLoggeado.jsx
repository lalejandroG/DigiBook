import styles from "../styles/menu.module.css";
import {Link} from "@material-ui/core";
import {Button} from "react-bootstrap";
import React from "react";

const NoLoggeado =()=>{
    return(
        <>
            <div className={styles.login}>
                <Link href="../pages/login">
                    <a href="/login" >
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
        </>

    )
}
export default NoLoggeado;
