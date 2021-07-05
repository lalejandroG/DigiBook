import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/navBar";
import NavbarInicio from "./components/navBarInicio";
import LandingPage from "./pages/landingPage";
import styles from "./styles/navbar.module.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './pages/login'
import Registro from './pages/registro'
import Recuperar from './pages/recuperarPsw'
import Store from './pages/store'
import Revision from './pages/revision'
import Profile from './pages/profile'
import Favorite from './pages/favorite'
import Detail from './pages/detail'
import Comments from './pages/comments'
import Pago from './pages/pago'
import Usuarios from './pages/usuarios'
import {useFirebaseApp, useUser} from "reactfire";


function App() {
    const firebase = useFirebaseApp();
    const user = useUser();
    console.log(firebase)
    console.log(user)

    return (
        <>
            {!user.hasEmitted &&
            <>
                <div className={styles.navbarWrapper}>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Navbar}/>
                            <Route exact path="/login" component={NavbarInicio}/>
                            <Route exact path="/registro" component={NavbarInicio}/>
                            <Route exact path="/recuperar" component={NavbarInicio}/>
                            <Route exact path='/pago' component={NavbarInicio}/>

                        </Switch>
                    </Router>
                </div>
                <section className={styles.mainSection}>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={LandingPage}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/registro" component={Registro}/>
                            <Route exact path="/recuperar" component={Recuperar}/>
                            <Route exact path='/pago' component={Pago}/>

                        </Switch>
                    </Router>
                </section>
            </>
            }

            {user.hasEmitted &&
            <>
                <div className={styles.navbarWrapper}>
                    <Router>
                        <Switch>
                            <Route exact path="/store/:id" component={Navbar}/>
                            <Route exact path="/revision/:id" component={Navbar}/>
                            <Route exact path="/usuarios/:id" component={Navbar}/>
                            <Route exact path="/profile/:id" component={Navbar}/>
                            <Route exact path="/favorite/:id" component={Navbar}/>
                            <Route exact path="/detail/:id/:id_r" component={Navbar}/>
                            <Route exact path="/comments/:id/:id_r" component={Navbar}/>
                        </Switch>
                    </Router>
                </div>
                <section className={styles.mainSection}>
                    <Router>
                        <Switch>
                            <Route exact path="/store/:id" component={Store}/>
                            <Route exact path="/revision/:id" component={Revision}/>
                            <Route exact path="/usuarios/:id" component={Usuarios}/>
                            <Route exact path="/profile/:id" component={Profile}/>
                            <Route exact path="/favorite/:id" component={Favorite}/>
                            <Route exact path="/detail/:id/:id_r" component={Detail}/>
                            <Route exact path="/comments/:id/:id_r" component={Comments}/>
                        </Switch>
                    </Router>
                </section>
            </>
            }

        </>
    );
}

export default App;
