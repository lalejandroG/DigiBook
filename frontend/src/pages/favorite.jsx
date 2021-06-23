import styles from "../styles/favorite.module.css";
import {Button, Form} from "react-bootstrap";
import filtroSimbolo from "../assets/filtroSimbolo.png";
import React, { Component, useEffect }  from "react";
import { useState }  from "react";
import {Link} from "@material-ui/core";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from "axios";
import RemoveIcon from '@material-ui/icons/Remove';

const Favorite=(props)=>{

    const [dato, setData] = useState({
        recursos: [45]
    });

    const detalles = ()=>{
        window.location.href= '/detail'
    }

    useEffect(()=>
    {
        async function fetchMyAPI() {
            let newPostObj = {
                id: dato.correo,
                password: dato.password
            };

            console.log(newPostObj)

            try {
                const recurso = await axios.post(`https://digibook-backend.herokuapp.com/favorite`, newPostObj)
                //const recurso = await axios.get(`http://localhost:5000/favorite`, newPostObj)
                console.log(recurso.data.data.rows)
                console.log(recurso.data.data.rows[0].imagen)

                if(recurso.data.cod === "00"){
                    setData({
                        ...dato,
                        recursos: recurso.data.data.rows
                    })
                    console.log(dato.recursos)

                }else{
                    console.log(recurso.data.error)
                }

            } catch (error) {
                console.log(error)
            }
          }

          fetchMyAPI()

    }, []);

    const libros = () => (
    dato.recursos.map((key) =>(
            <div className=".col-md-*" onClick={detalles}>
                <div className={styles.favs}>
                    <div>
                        <Card key={key.id_recurso} className={styles.libro} >
                        <Card.Img className={styles.img} variant="top" src={key.imagen}/>
                        <Card.Body className={styles.nombreLibro}>
                            <Card.Title className={styles.tituloLibro}>{key.titulo}</Card.Title>
                        </Card.Body>
                    </Card>
                    </div>

                    <div>
                        <i className={styles.materialIcons} >remove</i>
                    </div>

                </div>


            </div>
          ))
        );

    return(
        <>
                <div className={styles.fondo}>
                    <div className={styles.suscribe}>
                        <p className={styles.titulo}>FAVORITES</p>
                    </div>

                    <div className={styles.libros}>
                        {dato.recursos && libros()}
                    </div>
                </div>

        </>

    )
}

export default Favorite;

