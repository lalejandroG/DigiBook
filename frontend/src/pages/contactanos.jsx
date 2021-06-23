import styles from "../styles/store.module.css";
import {Button, Form} from "react-bootstrap";
import filtroSimbolo from "../assets/filtroSimbolo.png";
import libro1 from "../assets/Rectangle 35.png";
import libro2 from "../assets/Rectangle 38.png";
import React, { useEffect, useState } from "react";
import {Link} from "@material-ui/core";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import {useHistory} from "react-router-dom";


const Contactanos=(props)=>{

    return(
        <>
                <div className={styles.fondo}>
                    <div className={styles.container}>
                        <p id={styles.titulo}>Contáctanos</p>
                        <div className={styles.elementos}>
                            <div className={styles.resumen}>
                                <p id={styles.parrafo}>
                                    Universidad Metropolitana
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

        </>

    )
}

export default Contactanos;