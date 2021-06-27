import styles from "../styles/profile.module.css";
import {Button, Col, Form, Row} from "react-bootstrap";
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

const Profile=(props)=> {

    const {handleSubmit,} = useForm({
        reValidateMode: 'onSubmit'
    });

    const [dato, setData] = useState({
        biografia: '',
        nombre: '',
        imagen: '',
        alerta: '',
        premium: false,
        error: false,
        recursos: []
    });

    useEffect(() => {
        async function fetchMyAPI() {
            try {

                console.log(props.match.params.id)
                let newPostObj = {
                    id: props.match.params.id
                };

                console.log(newPostObj)

                //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/profile`, newPostObj)
                const recurso = await axios.post(`http://localhost:5000/profile`, newPostObj)

                // //const datos = await axios.post(`https://digibook-backend.herokuapp.com/published`, newPostObj)
                // const datos = await axios.post(`http://localhost:5000/published`, newPostObj)

                console.log(recurso.data.cod)

                if (recurso.data.cod === "00") {
                    setData({
                        ...dato,
                        imagen: recurso.data.data.rows[0].imagen_perfil,
                        nombre: recurso.data.data.rows[0].nombre,
                        biografia: recurso.data.data.rows[0].biografia,
                        premium: recurso.data.data.rows[0].premium,
                        recursos: recurso.data.data.rows
                    })


                } else {
                    console.log(recurso.data.error)
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchMyAPI()

    }, []);

    const handleChange = e => {
        setData({
            ...dato,
            [e.target.name]: e.target.value
        })
        console.log(dato.password)
        console.log(dato.correo)

    }

    const onSubmit = async () => {

        let newPostObj = {
            nombre: dato.nombre,
            biografia: dato.biografia,
            id: props.match.params.id
            // imagen: dato.imagen,
        };

        console.log(newPostObj)

        try {
            // const perfil = await axios.post(`https://digibook-apis.herokuapp.com/edit_profile`, newPostObj)
            const perfil = await axios.post(`http://localhost:5000/edit_profile`, newPostObj)

            console.log(perfil.data.cod)

            if (perfil.data.cod === "01") {
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

     const libros = () => (
        dato.recursos.map((key) =>(
            <tr key={key.id_recurso}>
                <td>{key.titulo}</td>
                <td>{key.fecha.split('T')[0]}</td>
                <td>{key.aprobado ? "SI" : "NO"}</td>
            </tr>
          ))
     );


    return (
        <>
            <div className={styles.suscribe}>
                <div className={styles.elementos}>
                    <div className={styles.favorito}>
                        {/*<Link href={`https://digibook-ffb1b.web.app/favorite/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}`}>*/}
                        <Link href={`http://localhost:3000/favorite/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}`}>
                            <a id={styles.mas} href={`http://localhost:3000/favorite/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}`}>
                            {/*<a id={styles.mas} href={`https://digibook-ffb1b.web.app/favorite/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}`}>*/}
                                <a className={styles.prueba}>
                                    <i className={styles.materialIcons}>favorite</i>
                                </a>
                            </a>


                        </Link>
                    </div>
                </div>

                <div className={styles.foto}>
                    <Row className={styles.container}>
                        <Image src={dato.imagen} roundedCircle className={styles.circular}/>
                    </Row>
                    <p className={styles.insertar}>Inserte una foto de perfil</p>
                </div>

                <div className={styles.datos}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formBasicEmail" className={styles.space}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name={"nombre"} defaultValue={dato.nombre}
                                          onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Biografy</Form.Label>
                            <Form.Control type="text" name={"biografia"} defaultValue={dato.biografia}
                                          onChange={handleChange}/>
                        </Form.Group>

                        <div className={styles.botones}>
                            <Button type="submit" className={styles.botonI}>Actualizar</Button>{' '}
                        </div>
                    </Form>
                </div>

                {dato.premium ?
                    <div className={styles.productos}>
                        <i className={styles.materialIcons2}>add_to_photos</i>
                        <p>Productos publicados</p>

                        <div className={styles.contenido}>
                            <Table striped bordered hover responsive className={styles.tabla}>
                                <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fecha</th>
                                    <th>Aprobado</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {dato.recursos && libros()}
                                </tbody>
                            </Table>
                        </div>
                    </div> : ''}
            </div>
        </>

    )
}

export default Profile;
