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

        if(props === "/store"){
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
                </div>
                {definirOpciones(props.path) ? '': <NoLoggeado/>}

            </div>
        </>

    )
}
export default MenuDesplegable


