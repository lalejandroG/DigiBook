import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/menu.module.css";
import {IconButton, Link} from "@material-ui/core";
import React, {Component, useEffect, useState} from "react";
import LandingPage from "../pages/landingPage";
import {Button} from "react-bootstrap";
import Login from "../pages/login";
import Registro from "../pages/registro";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Loggeado from "./loggeadoDeplegable"
import NoLoggeado from "./noLoggeado"
import axios from "axios";


const MenuDesplegable =(props)=>{

    const [dato, setData] = useState({
        admin: false
    });

    const definirOpciones=(props)=>{
        console.log(props)

        return !!(props.includes("/store/") || props.includes("/profile/") || props.includes("/detail/") || props.includes("/favorite/") || props.includes("/comments/") || props.includes("/revision/") || props.includes("/usuarios/"));
    }

    useEffect(() => {
        async function fetchMyAPI() {
            console.log(props.path.substring((props.path.length - 1), props.path.length))
            let newPostObj = {
                id: props.path.substring((props.path.length - 1), props.path.length)
            };
            try{
                //const perfil = await axios.post(`https://digibook-backend.herokuapp.com/profile`, newPostObj)
                const perfil = await axios.post(`http://localhost:5000/profile`, newPostObj)

                console.log(perfil.data.data.rows[0].admin)

                if(perfil.data.cod === '00'){
                    setData({
                        ...dato,
                        admin: perfil.data.data.rows[0].admin
                    })
                }else {
                    console.log(perfil.data.error)
                }

            }catch (error) {
                console.log(error)
            }
        }

        fetchMyAPI()

    }, []);

    return(
        <>
            <div className={styles.navbarWrapper}>
                {definirOpciones(props.path) ? <Loggeado path={props.path}/>: ''}
                <div className={styles.botones}>
                    <Button className={styles.boton}>Suscripciones</Button>{' '}
                    <Button className={styles.boton}>Nosotros</Button>{' '}
                    <Button className={styles.boton}>Contáctanos</Button>{' '}
                    {definirOpciones(props.path) && !props.path.includes("/store/") && !props.path.includes("/revision/") && !props.path.includes("/usuarios/") && !props.path.includes("/profile/")?
                        // <Link href={`https://digibook-ffb1b.web.app/store${props.path.substring((props.path.length - 4), props.path.length -2)}`}>
                        <Link href={`http://localhost:3000/store${props.path.substring((props.path.length - 4), props.path.length -2)}`}>
                            <a href={`http://localhost:3000/store${props.path.substring((props.path.length - 4), props.path.length -2)}`} className={styles.botones} >
                            {/*<a href={`https://digibook-ffb1b.web.app/store${props.path.substring((props.path.length - 4), props.path.length -2)}`} className={styles.botones} >*/}
                                <Button className={styles.boton}>Tienda</Button>{' '}
                            </a>
                        </Link>
                    : ''}
                    {definirOpciones(props.path) && props.path.includes("/profile/")?
                        // <Link href={`https://digibook-ffb1b.web.app/store${props.path.substring((props.path.length - 2), props.path.length)}`}>
                        <Link href={`http://localhost:3000/store${props.path.substring((props.path.length - 2), props.path.length )}`}>
                            <a href={`http://localhost:3000/store${props.path.substring((props.path.length - 2), props.path.length )}`} className={styles.botones} >
                            {/*<a href={`https://digibook-ffb1b.web.app/store${props.path.substring((props.path.length - 2), props.path.length )}`} className={styles.botones} >*/}
                                <Button className={styles.boton}>Tienda</Button>{' '}
                            </a>
                        </Link>
                    : ''}
                    {definirOpciones(props.path) && props.path.includes("/revision/")?
                        <div className={styles.urls}>
                             {/*<Link href={`https://digibook-ffb1b.web.app/usuarios{props.path.substring((props.path.length - 2), props.path.length)}`}>*/}
                            <Link href={`http://localhost:3000/usuarios${props.path.substring((props.path.length - 2), props.path.length)}`}>
                                <a href={`http://localhost:3000/usuarios${props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >
                                {/*<a href={`https://digibook-ffb1b.web.app/usuarios{props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >*/}
                                    <Button className={styles.boton}>Usuarios</Button>{' '}
                                </a>
                            </Link>
                             {/*<Link href={`https://digibook-ffb1b.web.app/store${props.path.substring((props.path.length - 2), props.path.length)}`}>*/}
                            <Link href={`http://localhost:3000/store${props.path.substring((props.path.length - 2), props.path.length )}`}>
                                <a href={`http://localhost:3000/store${props.path.substring((props.path.length - 2), props.path.length )}`} className={styles.botones} >
                                {/*<a href={`https://digibook-ffb1b.web.app/store${props.path.substring((props.path.length - 2), props.path.length )}`} className={styles.botones} >*/}
                                    <Button className={styles.boton}>Tienda</Button>{' '}
                                </a>
                            </Link>
                        </div>
                        : ''}
                        {definirOpciones(props.path) && props.path.includes("/usuarios/")?
                            <div className={styles.urls}>
                                 {/*<Link href={`https://digibook-ffb1b.web.app/store${props.path.substring((props.path.length - 2), props.path.length)}`}>*/}
                                <Link href={`http://localhost:3000/store${props.path.substring((props.path.length - 2), props.path.length)}`}>
                                    <a href={`http://localhost:3000/store${props.path.substring((props.path.length - 2), props.path.length )}`} className={styles.botones} >
                                    {/*<a href={`https://digibook-ffb1b.web.app/store${props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >*/}
                                        <Button className={styles.boton}>Tienda</Button>{' '}
                                    </a>
                                </Link>
                                    {/*<Link href={`https://digibook-ffb1b.web.app/revision{props.path.substring((props.path.length - 2), props.path.length)}`}>*/}
                                    <Link href={`http://localhost:3000/revision${props.path.substring((props.path.length - 2), props.path.length)}`}>
                                        <a href={`http://localhost:3000/revision${props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >
                                        {/*<a href={`https://digibook-ffb1b.web.app/revision{props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >*/}
                                            <Button className={styles.boton}>Revision</Button>{' '}
                                        </a>
                                    </Link>
                            </div>
                        : ''}
                    {definirOpciones(props.path) && (props.path.includes("/store/") || props.path.includes("/profile/") ) && dato.admin === true?
                        <div className={styles.urls}>
                             {/*<Link href={`https://digibook-ffb1b.web.app/usuarios{props.path.substring((props.path.length - 2), props.path.length)}`}>*/}
                            <Link href={`http://localhost:3000/usuarios${props.path.substring((props.path.length - 2), props.path.length)}`}>
                                <a href={`http://localhost:3000/usuarios${props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >
                                {/*<a href={`https://digibook-ffb1b.web.app/usuarios{props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >*/}
                                    <Button className={styles.boton}>Usuarios</Button>{' '}
                                </a>
                            </Link>
                             {/*<Link href={`https://digibook-ffb1b.web.app/revision{props.path.substring((props.path.length - 2), props.path.length)}`}>*/}
                            <Link href={`http://localhost:3000/revision${props.path.substring((props.path.length - 2), props.path.length)}`}>
                                <a href={`http://localhost:3000/revision${props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >
                                {/*<a href={`https://digibook-ffb1b.web.app/revision{props.path.substring((props.path.length - 2), props.path.length)}`} className={styles.botones} >*/}
                                    <Button className={styles.boton}>Revision</Button>{' '}
                                </a>
                            </Link>
                        </div>
                        : ''}
                </div>
                {definirOpciones(props.path) ? '': <NoLoggeado/>}

            </div>
        </>

    )
}
export default MenuDesplegable


