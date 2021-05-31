import styles from "../styles/navbar.module.css";
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, makeStyles} from "@material-ui/core";
import {Nav, NavDropdown} from "react-bootstrap";
import MenuDeplegable from "./menu";
import { useLocation } from 'react-router-dom'

const NavB=()=>{

     let location = useLocation();

    return(
        <>
            <Navbar collapseOnSelect expand="lg" className={styles.nav}>
                <Navbar.Brand className={styles.container}>{' '}
                <div className={styles.menu}>
                    <Link href="../pages/landingPage">
                            <a href="/" className={styles.titulo}>
                                <p className={styles.logo}>DigiBook</p>
                            </a>
                    </Link>
                    <div className={styles.icon}>
                        <Navbar.Toggle className="large material-icons" aria-controls="responsive-navbar-nav" id={styles.figura}>menu</Navbar.Toggle>
                    </div>
                </div>
                </Navbar.Brand>
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <MenuDeplegable path={location.pathname}/>
                    </Nav>
                  </Navbar.Collapse>
            </Navbar>
        </>

    )
}

export default NavB;
