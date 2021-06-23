import styles from "../styles/detail.module.css";
import {Button, Col, Form, Row} from "react-bootstrap";
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

     const {handleSubmit,} = useForm({
        reValidateMode:'onSubmit'
     });

     const [loggeado, setLoggeado] = useState(false)

     useEffect(() => {
         window.addEventListener('message', (e) => {
             setLoggeado(e.data)
         })
     }, [])
 
     if(loggeado == false) {
         window.location.href= '/login'
     }

     const [dato, setData] = useState({
        correo:'',
        biografia:'',
        nombre:'',
        imagen:'',
        alerta:'',
        error: false
    });

     const handleChange = e =>{
          setData({
              ...dato,
              [e.target.name] : e.target.value
          })
         console.log(dato.password)
         console.log(dato.correo)

      }

      const onSubmit=async()=> {

        let newPostObj = {
            correo: dato.correo,
            biografia: dato.biografia,
            imagen: dato.imagen,
            nombre: dato.nombre
        };

        console.log(newPostObj)

        try {
            const perfil = await axios.post(`https://digibook-apis.herokuapp.com/edit_perfil`, newPostObj)
            console.log(perfil.data.data)
            console.log(perfil.data.cod)

            if(perfil.data.cod === "00"){
                setData({
                    ...dato,
                      biografia: perfil.data.data.biografia,
                      imagen: perfil.data.data.imagen_perfil,
                      name: perfil.data.data.nombre,
                      correo: perfil.data.data.correo
                })
            }else{
                 setData({
                    ...dato,
                    alerta: perfil.data.msg,
                    error: true
                })
            }

        } catch (error) {
            console.log(error)
        }

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

                    <div className={styles.favorito}>
                        <Link href="../pages/favorite">
                            <a href="/favorite" >
                                <a className={styles.prueba}>
                                    <i className={styles.materialIcons} >favorite</i>
                                </a>
                            </a>
                        </Link>
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
                        <Form onSubmit={handleSubmit(onSubmit)}>
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
