import styles from "../styles/menu.module.css";
import {Link} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from "react";
import {useLocation} from "react-router-dom";

const Loggeado =(props)=> {

    console.log(props.path.length - 4)
    return (
        <>
            <div className={styles.todo}>
                {props.path.includes("/store/") ?
                    // <Link href={`https://digibook-ffb1b.web.app/profile${props.path.substring((props.path.length - 2), props.path.length )}`}>
                    <Link
                        href={`http://localhost:3000/profile${props.path.substring((props.path.length - 2), props.path.length)}`}>
                        <a href={`http://localhost:3000/profile${props.path.substring((props.path.length - 2), props.path.length)}`}>
                            {/*<a href={`https://digibook-ffb1b.web.app/profile${props.path.substring((props.path.length - 2), props.path.length )}`} >*/}
                            <a className={styles.prueba}>
                                <i className={styles.materialIcons}>account_circle</i>
                            </a>
                        </a>
                    </Link> :

                    // <Link href={`https://digibook-ffb1b.web.app/profile${props.path.substring((props.path.length - 4), props.path.length -2 )}`}>
                    <Link
                        href={`http://localhost:3000/profile${props.path.substring((props.path.length - 4), props.path.length - 2)}`}>
                        <a href={`http://localhost:3000/profile${props.path.substring((props.path.length - 4), props.path.length - 2)}`}>
                            {/*<a href={`https://digibook-ffb1b.web.app/profile${props.path.substring((props.path.length - 4), props.path.length -2 )}`} >*/}
                            <a className={styles.prueba}>
                                <i className={styles.materialIcons}>account_circle</i>
                            </a>

                        </a>
                    </Link>
                }
                <Link href="../pages/landingPage">
                    <a href="/">
                        <a className={styles.prueba}>
                            <i className={styles.materialIcons}>exit_to_app</i>
                        </a>
                    </a>
                </Link>
            </div>
        </>

    )
}

export default Loggeado
