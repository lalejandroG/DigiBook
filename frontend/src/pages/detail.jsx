import styles from "../styles/detail.module.css";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import diamante from "../assets/Group.png";
import React, {useEffect, useState} from "react";
import {Container, Link, Table} from "@material-ui/core";
import Image from "react-bootstrap/Image";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useForm} from "react-hook-form";
import axios from "axios";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Card from "react-bootstrap/Card";
import libro1 from "../assets/Rectangle 35.png";
import StarIcon from '@material-ui/icons/Star';
import ModalComments from "../components/modalComments";

const Detail=(props)=>{

     const [dato, setData] = useState({
         avg: '',
         contenido: '',
         id_cuenta: '',
         imagen: '',
         nombre: '',
         resumen: '',
         titulo: '',
         url: '',
         fav: false,
         premium: false
    });


     const detalle = () =>{

         setData({
              ...dato,
              fav: !dato.fav
          })

         console.log("ACA")
      }

      useEffect(()=>
    {
        async function fetchMyAPI() {
            try {

                console.log(props.match.params.id_r)
                console.log(props.match.params.id)
                let newPostObj = {
                    id: props.match.params.id_r,
                    id_c: props.match.params.id
                };

                console.log(newPostObj)

                //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/detalle`, newPostObj)
                const recurso = await axios.post(`http://localhost:5000/detalle`, newPostObj)

                console.log(recurso.data.cod)
                console.log(recurso.data.fav)
                console.log(recurso.data.premium)
                console.log(recurso.data.data.rows[0].avg)

                if(recurso.data.cod === "00"){
                    setData({
                        ...dato,
                        avg: recurso.data.data.rows[0].avg,
                        contenido: recurso.data.data.rows[0].contenido,
                        id_cuenta: recurso.data.data.rows[0].id_cuenta,
                        imagen: recurso.data.data.rows[0].imagen,
                        nombre: recurso.data.data.rows[0].nombre,
                        resumen: recurso.data.data.rows[0].resumen,
                        titulo: recurso.data.data.rows[0].titulo,
                        url: recurso.data.data.rows[0].url,
                        fav: recurso.data.fav,
                        premium: recurso.data.premium
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

     const cambioStyle = async() =>{

         let newPostObj = {
             id: props.match.params.id,
             id_recurso: props.match.params.id_r
         };

         if(dato.fav){
             try {

                console.log(newPostObj)

                //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/eliminar_fav`, newPostObj)
                const recurso = await axios.post(`http://localhost:5000/eliminar_fav`, newPostObj)

                console.log(recurso.data.cod)

                if(recurso.data.cod === "01"){
                    console.log(recurso.data.error)
                }

            } catch (error) {
                console.log(error)
            }

        }else{
             try {

                //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/agregar_fav`, newPostObj)
                const recurso = await axios.post(`http://localhost:5000/agregar_fav`, newPostObj)

                console.log(recurso.data.cod)

                if(recurso.data.cod === "01"){
                    console.log(recurso.data.error)
                }

            } catch (error) {
                console.log(error)
            }
        }
     }

    return(
        <>
             <div className={styles.suscribe}>
                <div className={styles.elementos}>
                    <div className={styles.resumen}>
                        <p id={styles.parrafo}>
                            {dato.resumen}
                        </p>
                    </div>
                </div>

                    <div className={styles.favorito} onClick={cambioStyle}>
                        <i className={styles.materialIcons} style={{color: dato.fav? "red" : "whitesmoke"}} >favorite</i>
                    </div>


                <div className={styles.recurso}>
                    <Image src={dato.imagen} className={styles.libro} />
                    <div className={styles.estrellas}>
                        <i className={styles.materialIcons2} style={{color: dato.avg >=1 ? "yellow" : "whitesmoke" }}>star</i>
                        <i className={styles.materialIcons2} style={{color: dato.avg >=2 ? "yellow" : "whitesmoke" }}>star</i>
                        <i className={styles.materialIcons2} style={{color: dato.avg >=3 ? "yellow" : "whitesmoke" }}>star</i>
                        <i className={styles.materialIcons2} style={{color: dato.avg >=4 ? "yellow" : "whitesmoke" }}>star</i>
                        <i className={styles.materialIcons2} style={{color: dato.avg >=5 ? "yellow" : "whitesmoke" }}>star</i>

                    </div>
                </div>

                <div className={styles.resenas}>
                    <p id={styles.titulo}>Rese??as</p>

                    <div className={styles.datos}>
                        <Form>
                            <Form.Group controlId="formBasicEmail" className={styles.space}>
                                <Form.Label>{dato.nombre}</Form.Label>
                                <Form.Control type="text" value={dato.contenido} />
                            </Form.Group>

                            {/*<Link href={`https://digibook-ffb1b.web.app/comments/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}/${props.match.params.id_r}`}>*/}
                            <Link href={`http://localhost:3000/comments/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}/${props.match.params.id_r}`}>
                                <a id={styles.mas} href={`http://localhost:3000/comments/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}/${props.match.params.id_r}`}> Ver m??s</a>
                            {/*    <a id={styles.mas} href={`https://digibook-ffb1b.web.app/comments/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}/${props.match.params.id_r}`}> Ver m??s</a>*/}
                            </Link>

                        <div className={styles.botones}>
                            {dato.premium?
                                <Button type="submit" className={styles.botonI}>Descargar</Button>
                             : ''}
                        </div>
                            <ModalComments id={props.match.params.id} id_r={props.match.params.id_r}/>
                        </Form>
                    </div>


                </div>


            </div>
        </>

    )
}

export default Detail;
