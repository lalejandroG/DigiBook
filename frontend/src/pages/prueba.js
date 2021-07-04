import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {storage} from './base';
import axios from "axios";


const FirebaseFileUpload = (props) => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");


    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        console.log("HOLI " + window.screen.height)
    };

    const db = async (url) => {
        let newPostObj = {
            url: url
        };

        try {
            // const login = await axios.post(`https://digibook-backend.herokuapp.com/cargar`, newPostObj)
            const login = await axios.post(`http://localhost:5000/cargar`, newPostObj)
            console.log(login.data.cod)

            if (login.data.cod === "00") {
                alert("Recurso cargado con exito  ");

            } else {
                alert("El recurso no pudo ser cargado  ");
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleUpload = () => {
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
                    setUrl(url);
                    db(url)
                });
            }
        );
    };


    return (
        <div>
            <br/>
            <input type="file" onChange={handleChange}/>
            <button onClick={handleUpload}>Upload</button>
            <br/>
            <embed src={url} width={window.innerWidth} height={window.innerHeight}/>
        </div>
    );
};

export default FirebaseFileUpload;
