import styles from "../styles/login.module.css";
import {Button, Form} from "react-bootstrap";
import diamante from "../assets/Group.png";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

const Login=()=>{

    const {handleSubmit,} = useForm({
        reValidateMode:'onSubmit'
    });

     const [dato, setData] = useState({
        correo:'',
        password:'',
        loggeado: false
    });

    const onSubmit=()=> {

        let newPostObj = {
        correo: dato.correo,
        password: dato.password
        };

        console.log(newPostObj)


        axios.post(`http://localhost:5000/login`, { newPostObj })
        .then(res => {
        console.log(res);
        // console.log(res.data);
      })

        // fetch("http://localhost:5000/login", {
        //     method: "POST",
        //     body: JSON.stringify(newPostObj),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        // })
        //     .then(response => {
        //         if(response.status === 400){
        //         response.json()
        //         console.log(response.json())
        //         }
        //     })



    }

     const handleChange = e =>{
          setData({
              ...dato,
              [e.target.name] : e.target.value
          })
         console.log(dato.password)
         console.log(dato.correo)

      }


    return(
        <>
            <div className={styles.suscribe}>
                <div className={styles.form}>
                    <div>
                        <p className={styles.titulo}>Iniciar sessión</p>
                    </div>
                    <div className={styles.content}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                              <Form.Group controlId="formBasicEmail" className={styles.space}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name={"correo"} placeholder="Enter email" onChange={handleChange}/>
                              </Form.Group>

                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name={"password"} placeholder="Password" onChange={handleChange}/>
                              </Form.Group>
                              <div className={styles.botones}>
                                  {/*<Link href="../pages/store">*/}
                                      <Button type="submit" className={styles.botonI}>Iniciar Sessión</Button>{' '}
                                  {/*</Link>*/}
                              </div>

                            </Form>
                    </div>
                    <div className={styles.olvido}>
                        <Link href="../pages/recuperarPsw">
                        <a href="/Recuperar" className={styles.botonO}>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </Link>
                    </div>
                </div>

            </div>


        </>

    )
}

export default Login;
