import styles from "../styles/menu.module.css";
import {Link} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";

export default function Loggeado (){
    return(
        <>
            <div className={styles.todo}>
                <Link href="../pages/profile">
                    <a href="/profile" >
                        <a className={styles.prueba}>
                         <i className={styles.materialIcons} >account_circle</i>
                        </a>

                    </a>
                </Link>
            </div>
        </>

    )
}
