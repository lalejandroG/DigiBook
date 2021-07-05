import styles from "../styles/menu.module.css";
import {Link} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import 'firebase/auth';
import {useFirebaseApp, useUser} from "reactfire";
import {Button} from "react-bootstrap";
import axios from "axios";

const Loggeado = (props) => {

    const firebase = useFirebaseApp();
    const {dato, setDato} = useState({
        id: ''
    })

    const salir = async () => {
        console.log("no entiendo")
        // setDato({
        //     ...dato,
        //     id: arrayDeCadenas[2]
        // })

        let obj = {
            id: arrayDeCadenas[2]
        }

        try {
            const loggeado = await axios.post(`https://digibook-backend.herokuapp.com/desloggeado`, obj)
            // const loggeado = await axios.post(`http://localhost:5000/desloggeado`, dato)
            console.log(loggeado.data.cod)

            if (loggeado.data.cod === "00") {
                await firebase.auth().signOut();

                window.location.href = `https://digibook-ffb1b.web.app/`
                // window.location.href = `http://localhost:3000/`

            } else {
                setDato({
                    ...dato,
                    alerta: loggeado.data.msg,
                    error: true
                })
                console.log(loggeado.data.error)
            }
        } catch
            (error) {
            console.log(error)
        }

    }
    const arrayDeCadenas = props.path.split("/");
    console.log(arrayDeCadenas)

    return (
        <>
            <div className={styles.todo}>
                <Link href={`https://digibook-ffb1b.web.app/profile/${arrayDeCadenas[2]}`}>
                    {/*<Link href={`http://localhost:3000/profile/${arrayDeCadenas[2]}`}>*/}
                    {/*<a href={`http://localhost:3000/profile/${arrayDeCadenas[2]}`}>*/}
                    <a href={`https://digibook-ffb1b.web.app/profile/${arrayDeCadenas[2]}`}>
                        <a className={styles.prueba}>
                            <i className={styles.materialIcons}>account_circle</i>
                        </a>
                    </a>
                </Link>

                <div>
                    <i className={styles.materialIcons} onClick={salir}>exit_to_app</i>
                </div>

            </div>
        </>

    )
}

export default Loggeado
