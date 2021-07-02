import React, { useState } from 'react';
import { render } from 'react-dom';
import { storage } from './base';
import './index.css';

const FirebaseFileUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`files/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot =>{},
      error => {
        console.log(error);
      },
      () => {
        storage.ref("files").child(image.name).getDownloadURL().then(url => {
          console.log(url);
          setUrl(url);
        });
      }
    );
  };


  return(
    <div>
      HI ALL
      <br/>
      <input type="file" onChange={handleChange}/>
      <button onClick={handleUpload}>Upload</button>
      <br/>
      {url}
    </div>
  );
};

export default FirebaseFileUpload;