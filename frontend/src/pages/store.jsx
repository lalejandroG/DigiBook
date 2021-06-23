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


const Store=(props)=>{
    let history = useHistory()

    const detalles = ()=>{
        window.location.href= '/detail'
    }

    const [loggeado, setLoggeado] = useState(false)

    useEffect(() => {
        window.addEventListener('message', (e) => {
            setLoggeado(e.data)
        })
    }, [])

    if(loggeado == false) {
        window.location.href= '/'
    }

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
                        <div className=".col-md-*" onClick={detalles}>
                                <Card className={styles.libro} >
                                    <Card.Img variant="top" src={libro1}/>
                                    <Card.Body className={styles.nombreLibro}>
                                        <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                                    </Card.Body>
                                </Card>
                        </div>
                            <div className=".col-md-*" onClick={detalles}>
                                <Card className={styles.libro} >
                                    <Card.Img variant="top" src={libro1}/>
                                    <Card.Body className={styles.nombreLibro}>
                                        <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                                    </Card.Body>
                                </Card>
                        </div>

                            <div className=".col-md-*" onClick={detalles}>
                                <Card className={styles.libro}>
                                    <Card.Img variant="top" src={libro1}/>
                                    <Card.Body className={styles.nombreLibro}>
                                        <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className=".col-md-*" onClick={detalles}>
                                <Card className={styles.libro}>
                                    <Card.Img variant="top" src={libro1}/>
                                    <Card.Body className={styles.nombreLibro}>
                                        <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className=".col-md-*" onClick={detalles}>
                                <Card className={styles.libro}>
                                    <Card.Img variant="top" src={libro1}/>
                                    <Card.Body className={styles.nombreLibro}>
                                        <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className=".col-md-*" onClick={detalles}>
                                <Card className={styles.libro}>
                                    <Card.Img variant="top" src={libro1}/>
                                    <Card.Body className={styles.nombreLibro}>
                                        <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                </div>

        </>

    )
}

export default Store;

