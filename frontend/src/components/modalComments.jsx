import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from "../styles/comments.module.css";
import { useForm } from "react-hook-form";
import {Box, TextField} from "@material-ui/core";
import {Button} from "react-bootstrap";
import axios from "axios";
import { Rating } from '@material-ui/lab';

const ModalComments=(props) =>  {

    const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'whitesmoke',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 500
    },
}));

    const labels = {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {handleSubmit} = useForm({
        reValidateMode:'onSubmit'
    });


    const [dato, setData] = useState({
        comment:'',
        calificacion:''
    })

    const onSubmit = async() =>{

        try {

            console.log(props.id_r)
            let newPostObj = {
                id: props.id,
                id_r: props.id_r,
                comentario: dato.comment,
                calificacion: value
            };

            console.log(newPostObj)

            //const recurso = await axios.post(`https://digibook-backend.herokuapp.com/comentar`, newPostObj)
            const recurso = await axios.post(`http://localhost:5000/comentar`, newPostObj)

            console.log(recurso.data.cod)

            if(recurso.data.cod === "01"){
                console.log(recurso.data.error)
            }
            handleClose()

        } catch (error) {
            console.log(error)
        }

    }

    const handleChange = e =>{
        setData({
            ...dato,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
             <div className={styles.botones} onClick={handleOpen}>
                 <Button className={styles.botonI}>Escribir reseña</Button>{' '}
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
                        <h2 id="transition-modal-title">Comentar</h2>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            id="transition-modal-description"
                            className={`${classes.root} ${styles.form}`}
                        >
                            <div>
                                <TextField
                                    label="Comentario:"
                                    className={"col s12"}
                                    name="comment"
                                    onChange={handleChange}
                                />
                            </div>
                             <div className={styles.agrupar}>
                                <div className={styles.estrellas}>
                                    <Rating
                                      name="hover-feedback"
                                      value={value}
                                      precision={1}
                                      onChange={(event, newValue) => {
                                        setValue(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                      }}
                                    />
                                </div>
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

    );
}
export default ModalComments
