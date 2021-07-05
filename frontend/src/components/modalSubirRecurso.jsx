import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from "../styles/subirModal.module.css";
import styles2 from "../styles/profile.module.css";
import styles3 from "../styles/revision.module.css";
import {useForm} from "react-hook-form";
import {Box, TextField} from "@material-ui/core";
import {Button} from "react-bootstrap";
import axios from "axios";
import {Rating} from '@material-ui/lab';
import Card from "react-bootstrap/Card";
import {storage} from "../pages/base";

const ModalSubirRecurso = (props) => {

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
            overflowX: 'hidden',
            width: '97%',
            height: '90%'

        },
    }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const {handleSubmit} = useForm({
        reValidateMode: 'onSubmit'
    });


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };


    const [dato, setData] = useState({
        recursos: [],
        titulo: '',
        resumen: '',
        autor: '',
        categoria:'',
        url: '',
        url2: ''

    })
    const [image, setImage] = useState(null);


    useEffect(() => {
        let newPostObj = {
            id: props.id
        };

        async function fetchMyAPI() {
            try {
                const recurso = await axios.post(`https://digibook-backend.herokuapp.com/publicados`, newPostObj)
                // const recurso = await axios.post(`http://localhost:5000/publicados`, newPostObj)


                if (recurso.data.cod === "00") {
                    setData({
                        ...dato,
                        recursos: recurso.data.data.rows,
                    })
                    console.log(recurso.data.data.rows)


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
            const recurso = await axios.post(`https://digibook-backend.herokuapp.com/eliminar_recurso`, newPostObj)
            // const recurso = await axios.post(`http://localhost:5000/eliminar_recurso`, newPostObj)

            if (recurso.data.cod === "00") {
                window.location.href = window.location.href

            } else {
                console.log(recurso.data.error)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const libros = () => (
        dato.recursos.map((key) => (
            dato.recursos.length > 0 ?
                <div className=".col-md-*">
                    <div className={styles.revision}>
                        <Card key={key.id_recurso} className={styles.libro}>
                            <Card.Img className={styles.img} variant="top" src={key.imagen}/>
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
                : ''
        ))
    );

    const onSubmit = async () => {

        let newPostObj = {
            imagen: dato.url,
            url: dato.url2,
            titulo: dato.titulo,
            resumen: dato.resumen,
            id: props.id,
            autor: dato.autor,
            categoria: dato.categoria
        };

        console.log(dato.url)
        console.log(dato.url2)

        try {
            const login = await axios.post(`https://digibook-backend.herokuapp.com/cargar`, newPostObj)
            // const login = await axios.post(`http://localhost:5000/cargar`, newPostObj)
            console.log(login.data.cod)

            if (login.data.cod === "00") {
                alert("Recurso cargado con exito  ");
                window.location.href = window.location.href

            } else {
                alert("El recurso no pudo ser cargado  ");
            }

        } catch (error) {
            console.log(error)
        }

        handleClose2()
        handleClose()

    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            },
            () => {
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    setData({
                        ...dato,
                        url: url
                    })
                });
            }
        );
    };

    const handleUploadFile = () => {
        const uploadTask = storage.ref(`files/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            },
            () => {
                storage.ref("files").child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    setData({
                        ...dato,
                        url2: url
                    })
                });
            }
        );
    };

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleChange2 = e => {
        setData({
            ...dato,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div>
            <div onClick={handleOpen}>
                {props.path.includes("/store/") ?
                    <div className={styles.botones}>
                        <Button className={styles.botonI2}>Cargar recurso</Button>

                    </div>
                    : <i className={styles2.materialIcons2}>add_to_photos</i>
                }
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
                        <div className={styles.botones2}>
                            <Button className={styles.botonI2} onClick={handleOpen2}>Cargar recurso</Button>
                        </div>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open2}
                            onClose={handleClose2}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open2}>
                                <div className={classes.paper}>
                                    <h2 id="transition-modal-title">Cargar recurso</h2>

                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        id="transition-modal-description"
                                        className={`${classes.root} ${styles.form}`}
                                    >
                                        <div>
                                            <TextField
                                                label="Titulo:"
                                                className={"col s12"}
                                                name="titulo"
                                                onChange={handleChange2}
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                label="Resumen:"
                                                className={"col s12"}
                                                name="resumen"
                                                onChange={handleChange2}
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                label="Autor:"
                                                className={"col s12"}
                                                name="autor"
                                                onChange={handleChange2}
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                label="Categoria:"
                                                className={"col s12"}
                                                name="categoria"
                                                onChange={handleChange2}
                                            />
                                        </div>

                                        <div className={styles.subir}>
                                            <h5 id="transition-modal-title">Imagen</h5>
                                            <br/>
                                            <input type="file" onChange={handleChange}/>
                                            <button onClick={handleUpload}
                                                    disabled={dato.url.length > 0}
                                                    type="button"
                                            >Upload
                                            </button>
                                            <br/>
                                            <embed src={dato.url} width={window.innerWidth} height="100px"/>
                                        </div>

                                        <div className={styles.subir}>
                                            <h5 id="transition-modal-title">Recurso</h5>
                                            <br/>
                                            <input type="file" onChange={handleChange}/>
                                            <button onClick={handleUploadFile}
                                                    disabled={dato.url2.length > 0}
                                                    type="button"
                                            >Upload
                                            </button>
                                            <br/>
                                            <embed src={dato.url2} width={window.innerWidth} height="100px"/>
                                        </div>

                                        <div className={styles.botones}>
                                            <button
                                                className={styles.botonI}
                                                type="submit"
                                            >
                                                Publicar
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </Fade>
                        </Modal>

                    </div>

                </Fade>
            </Modal>
        </div>

    );
}
export default ModalSubirRecurso
