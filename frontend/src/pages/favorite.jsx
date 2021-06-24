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
        recursos: []
    });

    const detalles = (id)=>{
        window.location.href= `http://localhost:3000/detail/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}/${id}`
       // window.location.href= `https://digibook-ffb1b.web.app/detail/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}/${id}`

    }

    const eliminar = async(id)=>{

        let newPostObj = {
                id: props.match.params.id,
                id_recurso: id
            };

            console.log(newPostObj)

            try {
                //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/eliminar_fav`, newPostObj)
                const recurso = await axios.post(`http://localhost:5000/eliminar_fav`, newPostObj)

                if(recurso.data.cod === "01"){
                    console.log(recurso.data.error)
                }

            } catch (error) {
                console.log(error)
            }
    }

    useEffect(()=>
    {
        async function fetchMyAPI() {
            let newPostObj = {
                id: props.match.params.id,
            };

            console.log(newPostObj)

            try {
                //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/favorite`, newPostObj)
                const recurso = await axios.post(`http://localhost:5000/favorite`, newPostObj)
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
            <div className=".col-md-*">
                <div className={styles.favs}>
                    <div onClick={(e) => detalles(key.id_recurso, e)}>
                        <Card key={key.id_recurso} className={styles.libro} >
                        <Card.Img className={styles.img} variant="top" src={key.imagen}/>
                        <Card.Body className={styles.nombreLibro}>
                            <Card.Title className={styles.tituloLibro}>{key.titulo}</Card.Title>
                        </Card.Body>
                    </Card>
                    </div>

                    <div className={styles.icono} >
                        <i className={styles.materialIcons} onClick={(e) => eliminar(key.id_recurso, e)} >remove</i>
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
                        {console.log(dato.recursos.length)}
                        {dato.recursos.length ===0 ? '' :
                            dato.recursos && libros()
                        }
                    </div>
                </div>

        </>

    )
}

export default Favorite;

