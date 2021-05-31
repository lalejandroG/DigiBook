import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/navBar";
import NavbarInicio from "./components/navBarInicio";
import LandingPage from "./pages/landingPage";
import styles from "./styles/navbar.module.css";
import {Figure, Image} from "react-bootstrap";
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import Login from './pages/login'
import Registro from './pages/registro'
import Recuperar from './pages/recuperarPsw'
import Store from './pages/store'
import Profile from './pages/profile'


function App() {
  return (
      <>
          <div className={styles.navbarWrapper}>
              <Router>
                  <Switch>
                      <Route exact path='/' component={Navbar}/>
                      <Route exact path="/login" component={NavbarInicio} />
                      <Route exact path="/registro" component={NavbarInicio} />
                      <Route exact path="/recuperar" component={NavbarInicio} />
                      <Route exact path="/store" component={Navbar}/>
                      <Route exact path="/profile" component={Navbar}/>


                    </Switch>
              </Router>
          </div>
          <section className={styles.mainSection}>
              <Router>
                  <Switch>
                      <Route exact path='/' component={LandingPage} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/registro" component={Registro} />
                      <Route exact path="/recuperar" component={Recuperar} />
                      <Route exact path="/store" component={Store} />
                      <Route exact path="/profile" component={Profile} />
                    </Switch>
              </Router>
          </section>

      </>
  );
}

export default App;
