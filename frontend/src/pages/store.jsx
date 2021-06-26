import styles from "../styles/store.module.css";
import styles2 from "../styles/filtro.module.css";
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
import { useParams } from 'react-router-dom'
import {useForm} from "react-hook-form";
import Navbar from "react-bootstrap/Navbar";
import {Nav, NavDropdown} from "react-bootstrap";
import MenuDeplegable from "../components/menu";
import { useLocation } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';


const Store=(props)=>{

    const {handleSubmit} = useForm({
        reValidateMode:'onSubmit'
    });

    const [dato, setData] = useState({
        recursos: [45],
        categorias: [45],
        estrellas: [0,0,0,0,0,0], 
        checksCategorias: [0],
        idsCategorias: [0],
        barraBusqueda: ""
    });

    const detalles = (id)=>{
        //window.location.href= `http://localhost:3000/detail/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}/${id}`
        window.location.href= `https://digibook-ffb1b.web.app/detail/${props.match.params.id.substring((props.match.params.id.length - 2), props.match.params.id.length)}/${id}`
    }

    const onSubmit=async()=> {
        let newPostObj = {
            busqueda: dato.barraBusqueda,
            idsCategorias: dato.idsCategorias,
            checksCategorias: dato.checksCategorias,
            estrellas: dato.estrellas
            };
        console.log(newPostObj)
        try {
            const busqueda = await axios.post(`https://digibook-backend.herokuapp.com/busqueda`, newPostObj)
            //const busqueda = await axios.post(`http://localhost:5000/busqueda`, newPostObj)
            console.log(busqueda.data)
            console.log(busqueda.data.cod)

            if(busqueda.data.cod === "00"){
                setData({
                    ...dato,
                    recursos: busqueda.data.data.rows
                })
            }else{
                console.log(busqueda.data.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = e =>{

        if(e.target.id.charAt(1) == "e"){
            let est = dato.estrellas;
            est[e.target.id.charAt(0)] = e.target.checked ? 1 : 0
            setData({
                ...dato,
                estrellas: est
            })
            console.log(dato.estrellas)
        }
        else if(e.target.id.charAt(0) != ""){
            let est = dato.checksCategorias;
            est[e.target.id.charAt(0)] = e.target.checked ? 1 : 0
            setData({
                ...dato,
                checksCategorias: est
            })
            console.log(dato.checksCategorias)
        }
        setData({
            ...dato,
            [e.target.name] : e.target.value
        })
       console.log(dato.barraBusqueda)
    }


    useEffect(()=>
    {
        console.log("POR FIS "+ props.match.params.id)
        async function fetchMyAPI() {
            try {
                const recurso = await axios.get(`https://digibook-backend.herokuapp.com/store`)
                //const recurso = await axios.get(`http://localhost:5000/store`)
                const categoria = await axios.get(`https://digibook-backend.herokuapp.com/categoria`)
                //const categoria = await axios.get(`http://localhost:5000/categoria`)
                console.log(recurso.data.data.rows)
                console.log(recurso.data.data.rows[0].imagen)
                const checkCategoria = [0];
                const id = [0]
                for (const key in categoria.data.data.rows) {
                    checkCategoria[key] = 0
                    id[key]=categoria.data.data.rows[key].id_categoria
                }
                console.log(checkCategoria)

                if(recurso.data.cod === "00"){
                    setData({
                        ...dato,
                        recursos: recurso.data.data.rows,
                        categorias: categoria.data.data.rows,
                        checksCategorias: checkCategoria,
                        idsCategorias: id
                    })
                    console.log(dato.idsCategorias)

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
            <div className=".col-md-*" onClick={(e) => detalles(key.id_recurso, e)}>
                <Card key={key.id_recurso} className={styles.libro} >
                    <Card.Img className={styles.img} variant="top" src={key.imagen}/>
                    <Card.Body className={styles.nombreLibro}>
                        <Card.Title className={styles.tituloLibro}>{key.titulo}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
          ))
        );
    
    const categorias = () => (
        dato.categorias.map((key) =>(
                <div>
                    <input className={styles2.marcador}  type="checkbox" value="" id={key.id_categoria} onChange={handleChange}/>
                    <label className={styles2.etiqueta}  for="defaultCheck1">
                    {key.nombre}
                    </label>
                </div>
              ))
            );

    const filtros = () => (
            <div className={styles2.content}>
                <span className={styles2.titulo} style={{color: "#FA9AA8" }}>Materia</span>
                <div className={styles2.hola}>
                    {dato.categorias && categorias()}
                </div>
                <span className={styles2.titulo} style={{color: "#9AC0F3" }}>Calificacion</span>
                <div className={styles2.hola} >
                    <input className={styles2.marcador} type="checkbox" value="" id="0estrella" onChange={handleChange}/>
                    <label className={styles2.etiqueta} for="0estrella" >
                        <div className={styles2.estrellas}>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }} >star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                        </div>
                    </label>
                </div>
                <div className={styles2.hola} >
                    <input className={styles2.marcador} type="checkbox" value="" id="1estrella" onChange={handleChange}/>
                    <label className={styles2.etiqueta} for="1estrella" >
                        <div className={styles2.estrellas}>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }} >star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                        </div>
                    </label>
                </div>
                <div className={styles2.hola}>
                    <input className={styles2.marcador} type="checkbox" value="" id="2estrella" onChange={handleChange}/>
                    <label className={styles2.etiqueta} for="2estrella">
                        <div className={styles2.estrellas}>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }} >star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                        </div>
                    </label>
                </div>
                <div className={styles2.hola}>
                    <input className={styles2.marcador} type="checkbox" value="" id="3estrella" onChange={handleChange}/>
                    <label className={styles2.etiqueta} for="3estrella">
                        <div className={styles2.estrellas}>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }} >star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                        </div>
                    </label>
                </div>
                <div className={styles2.hola}>
                    <input className={styles2.marcador} type="checkbox" value="" id="4estrella" onChange={handleChange}/>
                    <label className={styles2.etiqueta} for="4estrella">
                        <div className={styles2.estrellas}>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }} >star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"         }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "whitesmoke" }}>star</i>
                        </div>
                    </label>
                </div>
                <div className={styles2.hola} >
                    <input className={styles2.marcador} type="checkbox" value="" id="5estrella" onChange={handleChange}/>
                    <label className={styles2.etiqueta} for="5estrella">
                        <div className={styles2.estrellas}>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }} >star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                           <i className={styles2.materialIcons2} style={{color: "yellow"     }}>star</i>
                        </div>
                    </label>
                </div>
            </div>
    
        )

    return(
        <>
                <div className={styles.fondo}>
                    <Accordion>
                    <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                      <Card className={styles.carta}>
                        <Card.Header  className={styles.content}>
                          <Accordion.Toggle className={styles.imagen} as={Button} variant="link" eventKey="0">
                                <Image src={filtroSimbolo} alt={"filtroSimbolo"} className={styles.imagen} rounded/>
                          </Accordion.Toggle>
                        <Form.Control name={"barraBusqueda"} className={styles.barraBusqueda} onChange={handleChange} />
                        <Button type="submit" className={styles.botones} >Buscar</Button>{' '}
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>{filtros()}</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Form>
                    </Accordion>
                    <div className={styles.libros}>
                        {dato.recursos && libros()}
                    </div>
                </div>

        </>

    )
}

export default Store;

