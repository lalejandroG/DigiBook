import styles from "../styles/comments.module.css";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import diamante from "../assets/Group.png";
import React, {useEffect, useState} from "react";
import {Container, Link, Table} from "@material-ui/core";
import Image from "react-bootstrap/Image";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useForm} from "react-hook-form";
import axios from "axios";
import Perfil from "../assets/perfil.png"
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Card from "react-bootstrap/Card";
import libro1 from "../assets/Rectangle 35.png";
import StarIcon from '@material-ui/icons/Star';

const Comments=(props)=>{

     const [dato, setData] = useState({
         comenntarios: [45]
    });

      useEffect(()=>
    {
        async function fetchMyAPI() {
            try {

                console.log(props.match.params.id)
                let newPostObj = {
                    id: props.match.params.id
                };

                console.log(newPostObj)

                //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/comments`, newPostObj)
                const recurso = await axios.post(`http://localhost:5000/comments`, newPostObj)

                console.log(recurso.data.cod)

                if(recurso.data.cod === "00"){
                    setData({
                        ...dato,
                        comenntarios: recurso.data.data.rows
                    })

                }else{
                    console.log(recurso.data.error)
                }

            } catch (error) {
                console.log(error)
            }
          }

          fetchMyAPI()

    }, []);


       const comenntarios = () => (
            dato.comenntarios.map((key) =>(
                <Form className={styles.form}>
                    <Form.Group controlId="formBasicEmail" className={styles.space}>
                        <Form.Label>{key.nombre}</Form.Label>
                        <Form.Control type="text" value={key.contenido} />
                    </Form.Group>
                    {dato.comenntarios && estrellas(key.calificacion)}
                </Form>
          ))
        );

       const estrellas = (calificacion) =>(
           <div className={styles.agrupar}>
               <div className={styles.estrellas}>
                   <i className={styles.materialIcons2} style={{color: calificacion >=1 ? "yellow" : "whitesmoke" }} >star</i>
                   <i className={styles.materialIcons2} style={{color: calificacion >=2 ? "yellow" : "whitesmoke" }}>star</i>
                   <i className={styles.materialIcons2} style={{color: calificacion >=3 ? "yellow" : "whitesmoke" }}>star</i>
                   <i className={styles.materialIcons2} style={{color: calificacion >=4 ? "yellow" : "whitesmoke" }}>star</i>
                   <i className={styles.materialIcons2} style={{color: calificacion >=5 ? "yellow" : "whitesmoke" }}>star</i>
               </div>
           </div>
       )

    return(
        <>
             <div className={styles.suscribe}>

                <div className={styles.resenas}>
                    <p id={styles.titulo}>Reseñas</p>

                    <div className={styles.datos}>
                         <div className=".col-md-*">
                            {dato.comenntarios && comenntarios()}
                             <div className={styles.botones}>
                                <Button type="submit" className={styles.botonI}>Escribir reseña</Button>{' '}
                            </div>
                         </div>
                    </div>


                </div>


            </div>
        </>

    )
}

export default Comments;
