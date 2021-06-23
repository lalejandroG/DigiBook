import styles from "../styles/store.module.css";
import {Button, Form} from "react-bootstrap";
import filtroSimbolo from "../assets/filtroSimbolo.png";
import libro1 from "../assets/Rectangle 35.png";
import libro2 from "../assets/Rectangle 38.png";
import React, { Component, useEffect }  from "react";
import { useState }  from "react";
import {Link} from "@material-ui/core";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from "axios";


const Store=(props)=>{

    const [dato, setData] = useState({
        recursos: [45]
    });

    const detalles = ()=>{
        window.location.href= '/detail'
    }

    useEffect(()=> 
    {
        async function fetchMyAPI() {
            try {
                const recurso = await axios.post(`https://digibook-backend.herokuapp.com/store`)
                //const recurso = await axios.get(`http://localhost:5000/store`)
                console.log(recurso.data.data.rows)
                console.log(recurso.data.data.rows[0].imagen)
    
                if(recurso.data.cod === "00"){
                    console.log("Entra al set Data")
                    setData({
                        ...dato,
                        recursos: recurso.data.data.rows
                    })
                    console.log(dato.recursos)

                }else{
                    console.log("Flipo en colores")
                }

            } catch (error) {
                console.log(error)
            }
          }
          
          fetchMyAPI()
          console.log(dato.recursos)
          console.log("hola")
    
    }, []);

    const libros = () => (
    dato.recursos.map((key) =>(
            <div className=".col-md-*" onClick={detalles}>
                <Card key={key.id_recurso} className={styles.libro} >
                    <Card.Img className={styles.img} variant="top" src={key.imagen}/>
                    <Card.Body className={styles.nombreLibro}>
                        <Card.Title className={styles.tituloLibro}>{key.titulo}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
          ))
        );

    return(
        <>
                <div className={styles.fondo}>
                    <div className={styles.content}>
                            <Image src={filtroSimbolo} alt={"filtroSimbolo"} className={styles.imagen} rounded/>
                            <Form>
                              <Form.Group>
                                <Form.Control className={styles.barraBusqueda} />
                              </Form.Group>
                            </Form>
                            <div>
                                  <Button className={styles.botones} >Buscar</Button>{' '}
                            </div>

                    </div>
                    <div className={styles.libros}>
                        {dato.recursos && libros()}
                    </div>
                </div>

        </>

    )
}

export default Store;

