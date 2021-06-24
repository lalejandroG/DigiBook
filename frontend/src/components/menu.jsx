import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/menu.module.css";
import {IconButton, Link} from "@material-ui/core";
import React, {Component, useState} from "react";
import LandingPage from "../pages/landingPage";
import {Button} from "react-bootstrap";
import Login from "../pages/login";
import Registro from "../pages/registro";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Loggeado from "./loggeadoDeplegable"
import NoLoggeado from "./noLoggeado"


const MenuDesplegable =(props)=>{


    const definirOpciones=(props)=>{
        console.log(props)

        if(props.includes("/store/") || props.includes("/profile/") ||  props.includes("/detail/") || props.includes("/favorite/") ||  props.includes("/comments/")  ){
            return true
        }else{
            return false
        }
    }

    return(
        <>
            <div className={styles.navbarWrapper}>
                {definirOpciones(props.path) ? <Loggeado/>: ''}
                <div className={styles.botones}>
                    <Button className={styles.boton}>Suscripciones</Button>{' '}
                    <Button className={styles.boton}>Nosotros</Button>{' '}
                    <Button className={styles.boton}>Contáctanos</Button>{' '}
                    {definirOpciones(props.path) ?
                        // <Link href={`https://digibook-ffb1b.web.app${props.path}`}>
                        <Link href={`http://localhost:3000/store${props.path.substring((props.path.length - 2), props.path.length)}`}>
                            <a href={`http://localhost:3000/store${props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >
                            {/*<a href={`https://digibook-ffb1b.web.app${props.path}`} className={styles.botones} >*/}
                                <Button className={styles.boton}>Tienda</Button>{' '}
                            </a>
                        </Link>
                    : ''}
                </div>
                {definirOpciones(props.path) ? '': <NoLoggeado/>}

            </div>
        </>

    )
}
export default MenuDesplegable


