import styles from "../styles/detail.module.css";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import diamante from "../assets/Group.png";
import React, {useState} from "react";
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

const Detail=()=>{

     const [dato, setData] = useState({
        correo:'',
        biografia:'',
        nombre:'',
        imagen:'',
        fav: false
    });


     const detalle = () =>{

         setData({
              ...dato,
              fav: !dato.fav
          })
      }


    return(
        <>
            <div className={styles.suscribe}>
                <div className={styles.elementos}>
                    <div className={styles.resumen}>
                        <p id={styles.parrafo}>
                            Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>

                    <div className={styles.favorito} onClick={detalle()}>
                        <i className={styles.materialIcons} style={{color: dato.fav? "red" : "whitesmoke"}}>favorite</i>
                    </div>


                <div className={styles.recurso}>
                    <Image src={libro1}  className={styles.libro} />
                    <div className={styles.estrellas}>
                        <i className={styles.materialIcons2} >star</i>
                        <i className={styles.materialIcons2} >star</i>
                        <i className={styles.materialIcons2} >star</i>
                        <i className={styles.materialIcons2} >star</i>
                        <i className={styles.materialIcons2} >star</i>

                    </div>
                </div>

                <div className={styles.resenas}>
                    <p id={styles.titulo}>Reseñas</p>

                    <div className={styles.datos}>
                        <Form>
                            <Form.Group controlId="formBasicEmail" className={styles.space}>
                                <Form.Label>Carla Rodríguez</Form.Label>
                                <Form.Control type="text" value={"LA RESEÑA"} />
                            </Form.Group>

                            <Link href="../pages/comments">
                                <a id={styles.mas} href="/comments"> Ver más</a>
                            </Link>

                        <div className={styles.botones}>
                            <Button type="submit" className={styles.botonS}>Descargar</Button>{' '}
                            <Button type="submit" className={styles.botonI}>Escribir reseña</Button>{' '}
                        </div>
                        </Form>
                    </div>


                </div>


            </div>
        </>

    )
}

export default Detail;
