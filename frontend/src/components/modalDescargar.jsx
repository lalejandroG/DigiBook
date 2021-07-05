import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from "../styles/store.module.css";
import styles2 from "../styles/profile.module.css";
import styles3 from "../styles/revision.module.css";
import {useForm} from "react-hook-form";
import {Box, TextField} from "@material-ui/core";
import {Button, ResponsiveEmbed} from "react-bootstrap";
import axios from "axios";
import {Rating} from '@material-ui/lab';
import Card from "react-bootstrap/Card";

const ModalDescargarRecurso = (props) => {

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
        url: ''
    })

    useEffect(() => {
        async function fetchMyAPI() {
            try {

                console.log(props.id_r)
                let newPostObj = {
                    id: props.id_r
                };

                console.log(newPostObj)

                const recurso = await axios.post(`https://digibook-backend.herokuapp.com/descargar`, newPostObj)
                // const recurso = await axios.post(`http://localhost:5000/descargar`, newPostObj)

                console.log(recurso.data.data.rows[0].url)

                if (recurso.data.cod === "00") {
                    setData({
                        ...dato,
                        url: recurso.data.data.rows[0].url
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

    return (
        <div>
            <div onClick={handleOpen}>
                <Button className={styles.botonI2}>Descargar recurso</Button>
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
                        <h3 id="transition-modal-title" className={styles.title}>Descargar recurso</h3>
                        <ResponsiveEmbed width="100%" height="50%">
                            <embed type="image/svg+xml" src={dato.url} width="100%" height="50%"/>
                        </ResponsiveEmbed>
                        <div className={styles.botones2}>
                            <Button href={dato.url} className={styles.botonI2} style={{marginTop: "16px"}}>Descargar
                                recurso</Button>
                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>

    );
}
export default ModalDescargarRecurso
