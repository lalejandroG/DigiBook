import styles from "../styles/store.module.css";
import {Button, Form} from "react-bootstrap";
import filtroSimbolo from "../assets/filtroSimbolo.png";
import libro1 from "../assets/Rectangle 35.png";
import libro2 from "../assets/Rectangle 38.png";
import React from "react";
import {Link} from "@material-ui/core";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';


const Store=(props)=>{

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
                        <Card className={styles.libro}>
                            <Card.Img variant="top" src={libro1} />
                            <Card.Body className={styles.nombreLibro}>
                                <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className={styles.libro}>
                            <Card.Img variant="top" src={libro2} />
                            <Card.Body className={styles.nombreLibro}>
                                <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className={styles.libro}>
                            <Card.Img variant="top" src={libro2} />
                            <Card.Body className={styles.nombreLibro}>
                                <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className={styles.libro}>
                            <Card.Img variant="top" src={libro1} />
                            <Card.Body className={styles.nombreLibro}>
                                <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className={styles.libro}>
                            <Card.Img variant="top" src={libro1} />
                            <Card.Body className={styles.nombreLibro}>
                                <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className={styles.libro}>
                            <Card.Img variant="top" src={libro2} />
                            <Card.Body className={styles.nombreLibro}>
                                <Card.Title className={styles.tituloLibro}>Libro1</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </div>


        </>

    )
}

export default Store;

