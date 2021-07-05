import styles from "../styles/usuarios.module.css";
import {Button, Row} from "react-bootstrap";
import React, {Component, useEffect} from "react";
import {useState} from "react";
import {Link} from "@material-ui/core";
import Image from 'react-bootstrap/Image';
import axios from "axios";
import Perfil from "../assets/perfil.png"
import {useParams} from 'react-router-dom'
import {useForm} from "react-hook-form";

const Usuarios = (props) => {

    const [dato, setData] = useState({
        premium: [],
        free: [],
        loggeado: false
    });

    useEffect(() => {

        let newPostObj = {
            id: props.match.params.id
        };

        async function fetchMyAPI() {
            try {
                const usuarios = await axios.get(`https://digibook-backend.herokuapp.com/usuarios`)
                // const usuarios = await axios.get(`http://localhost:5000/usuarios`)

                const perfil = await axios.post(`https://digibook-backend.herokuapp.com/profile`, newPostObj)
                // const perfil = await axios.post(`http://localhost:5000/profile`, newPostObj)

                console.log(usuarios.data.premium.rows)
                console.log(usuarios.data.free.rows)

                if (usuarios.data.cod === "00" && perfil.data.cod === "00") {
                    setData({
                        ...dato,
                        premium: usuarios.data.premium.rows,
                        free: usuarios.data.free.rows,
                        loggeado: perfil.data.data.rows[0].loggeado
                    })

                } else {
                    console.log(usuarios.data.error)
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchMyAPI()

    }, []);

    const premium = () => (
        dato.premium.map((key) => (
            <div className=".col-md-*">
                <div className={styles.foto} key={key.id_cuenta}>
                    <div className={styles.container}>
                        <label className={styles.nombre}>{key.nombre}</label>
                        {key.imagen_perfil === null ?
                            <Image src={Perfil} roundedCircle className={styles.circular}/>
                            :
                            <Image src={key.imagen_perfil} roundedCircle className={styles.circular}/>
                        }
                    </div>
                </div>

            </div>

        ))
    );

    const free = () => (
        dato.free.map((key) => (
            <div className=".col-md-*">
                <div className={styles.foto} key={key.id_cuenta}>
                    <div className={styles.container}>
                        <label className={styles.nombre}>{key.nombre}</label>
                        {key.imagen_perfil === null ?
                            <Image src={Perfil} roundedCircle className={styles.circular}/>
                            :
                            <Image src={key.imagen_perfil} roundedCircle className={styles.circular}/>
                        }
                    </div>
                </div>

            </div>

        ))
    );


    return (
        <>
            {dato.loggeado &&
            <div className={styles.fondo}>
                <label className={styles.titulo}>
                    Usuarios premium
                </label>
                <div className={styles.libros}>
                    {dato.premium && premium()}
                </div>

                <label className={styles.titulo}>
                    Usuarios free
                </label>
                <div className={styles.libros}>
                    {dato.free && free()}
                </div>

            </div>
            }

        </>

    )
}

export default Usuarios;

