import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from "../styles/store.module.css";
import styles2 from "../styles/profile.module.css";
import styles3 from "../styles/revision.module.css";
import { useForm } from "react-hook-form";
import {Box, TextField} from "@material-ui/core";
import {Button} from "react-bootstrap";
import axios from "axios";
import { Rating } from '@material-ui/lab';
import Card from "react-bootstrap/Card";

const ModalSubirRecurso=(props) =>  {

    const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'scroll',
         height: '100%'
    },
    paper: {
        backgroundColor: 'whitesmoke',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowY: 'scroll',
        width: '97%',
        height: '90%'

    },
}));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [dato, setData] = useState({
        recursos: []
    })

    useEffect(() => {
        let newPostObj = {
            id: props.id
        };

        async function fetchMyAPI() {
            try {
                //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/profile`, newPostObj)
                const recurso = await axios.post(`http://localhost:5000/profile`, newPostObj)

                if (recurso.data.cod === "00") {
                    setData({
                        ...dato,
                        recursos: recurso.data.data.rows,
                    })
                    console.log(dato.idsCategorias)

                } else {
                    console.log(recurso.data.error)
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchMyAPI()

    }, []);

    const eliminar = async (id) => {

        let newPostObj = {
            id: id
        };

        console.log(newPostObj)

        try {
            //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/eliminar_recurso`, newPostObj)
            const recurso = await axios.post(`http://localhost:5000/eliminar_recurso`, newPostObj)

            if (recurso.data.cod === "01") {
                console.log(recurso.data.error)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const libros = () => (
        dato.recursos.map((key) => (
            <div className=".col-md-*">
                <div className={styles.revision}>
                    <Card key={key.id_recurso} className={styles3.libro}>
                        <Card.Img className={styles3.img} variant="top" src={key.imagen}/>
                        <Card.Body className={styles.nombreLibro}>
                            <Card.Title className={styles.tituloLibro}>{key.titulo}</Card.Title>
                        </Card.Body>
                    </Card>
                    <div className={styles.icono}>
                        <i className={styles.materialIcons} onClick={(e) => eliminar(key.id_recurso, e)}>remove</i>
                    </div>
                    <div className={styles.status}>
                        <p> Aprobado: {key.aprobado ? "SI" : "NO"}</p>
                    </div>
                </div>
            </div>
        ))
    );


    return (
        <div>
             <div  onClick={handleOpen}>
                 <i className={styles2.materialIcons2}>add_to_photos</i>
             </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h3 id="transition-modal-title" className={styles.title}>Subir o eliminar recursos</h3>
                        {dato.recursos && libros()}
                        <div className={styles.botones2} >
                            <Button className={styles.botonI2}>Cargar recurso</Button>
                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>

    );
}
export default ModalSubirRecurso
