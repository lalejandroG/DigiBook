import styles from "../styles/revision.module.css";
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
import styles2 from "../styles/filtro.module.css";

const Revision=(props)=>{

    const {handleSubmit} = useForm({
        reValidateMode:'onSubmit'
    });

    const [dato, setData] = useState({
        recursos: [45],
        aprobados: []
    });

    const detalles = (id)=>{
        window.location.href= `http://localhost:3000/detail/${id}`
        //window.location.href= `https://digibook-ffb1b.web.app/detail/${id}`
    }

    const onSubmit=async()=> {
        let newPostObj = {
            busqueda: dato.barraBusqueda
            };
        console.log(newPostObj)
        try {
            //const busqueda = await axios.post(`https://digibook-backend.herokuapp.com/busqueda`, newPostObj)
            const busqueda = await axios.post(`http://localhost:5000/busqueda`, newPostObj)
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
        if(e.target.checked){
            dato.aprobados.push(e.target.id)
            console.log(dato.aprobados)
            let idx = dato.aprobados.indexOf(e.target.id);
            console.log(idx)
        }else{
            let idx = dato.aprobados.indexOf(e.target.id);
            console.log(idx)
            dato.aprobados.splice(idx, 1);
            console.log(dato.aprobados)
        }

    }

    useEffect(()=>
    {
        console.log("POR FIS "+ props.match.params.id)
        async function fetchMyAPI() {
            try {
                //const recurso = await axios.get(`https://digibook-backend.herokuapp.com/revision`)
                const recurso = await axios.get(`http://localhost:5000/revision`)
                console.log(recurso.data.data.rows)
                console.log(recurso.data.data.rows[0].imagen)

                if(recurso.data.cod === "00"){
                    setData({
                        ...dato,
                        recursos: recurso.data.data.rows
                    })
                    console.log(dato.recursos)

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
            <div className=".col-md-*">
                <div className={styles.revision}>
                    <Card key={key.id_recurso} className={styles.libro} >
                        <Card.Img className={styles.img} variant="top" src={key.imagen}/>
                        <Card.Body className={styles.nombreLibro}>
                            <Card.Title className={styles.tituloLibro}>{key.titulo}</Card.Title>
                        </Card.Body>
                    </Card>
                    <div>
                        <input className={styles.marcador} type="checkbox" value="" id={key.id_recurso}
                               onChange={handleChange}/>
                    </div>
                </div>

        </div>

          ))
        );

    const aprobar =async()=>{
         try {
             for(let i = (dato.aprobados.length -1); i >= 0 ; i--){

                 let newPostObj = {
                    id: dato.aprobados[i]
                 };
                 //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/aprobar`, newPostObj)
                 const recurso = await axios.post(`http://localhost:5000/aprobar`, newPostObj)

                 if(recurso.data.cod === "00"){
                    dato.aprobados.pop()
                    console.log(dato.aprobados)

                 }else{
                     console.log(recurso.data.error)
                 }
             }

         } catch (error) {
             console.log(error)
         }
    }

        return(
            <>
                    <div className={styles.fondo}>
                        <div className={styles.libros}>
                            {dato.recursos && libros()}
                        </div>
                        <div className={styles.botones2} >
                            <Button className={styles.botonI2} onClick={(e) => aprobar()}>Aprobar</Button>
                        </div>
                    </div>

            </>

        )
}

export default Revision;

