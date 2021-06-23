import styles from "../styles/profile.module.css";
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

const Profile=()=>{

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
                    <div className={styles.favorito}>
                        <Link href="../pages/favorite">
                            <a href="/favorite" >
                                <a className={styles.prueba}>
                                    <i className={styles.materialIcons} >favorite</i>
                                </a>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className={styles.foto}>
                    <Row className={styles.container}>
                        {/*TODO ACA VA LA FOTO DE BD*/}
                        <Image src={Perfil} roundedCircle className={styles.circular} />
                    </Row>
                    <p className={styles.insertar}>Inserte una foto de perfil</p>
                </div>

                <div className={styles.datos}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formBasicEmail" className={styles.space}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name={"nombre"} defaultValue={"EL NOMBRE"} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Biografy</Form.Label>
                            <Form.Control type="text" name={"biografia"} defaultValue={"LA BIOGRAFIA"} onChange={handleChange}/>
                        </Form.Group>

                        <div className={styles.botones}>
                            <Button type="submit" className={styles.botonI}>Actualizar</Button>{' '}
                        </div>
                    </Form>
                </div>

                 <div className={styles.productos}>
                     <i className={styles.materialIcons2} >add_to_photos</i>
                     <p>Productos publicados</p>

                     <div className={styles.contenido}>
                         <Table striped bordered hover responsive className={styles.tabla}>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Nombre</th>
                                  <th>Fecha</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>Mark</td>
                                  <td>13/04/2021</td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>Jacob</td>
                                  <td>13/04/2021</td>
                                </tr>
                                <tr>
                                  <td>3</td>
                                  <td>Larry the Bird</td>
                                  <td>13/04/2021</td>
                                </tr>
                              </tbody>
                         </Table>
                     </div>
                 </div>
            </div>
        </>

    )
}

export default Profile;
