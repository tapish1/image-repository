import React, { useState, useEffect } from 'react'
import UploadImg from './components/uploadImg'
import ImgDisplay from './components/ImgDisplay'
import Modal from './components/modal.js'
import history from './history';

function App({setAuthenticated}) {

  const [show, setShow] = useState(false)
  const window_url = window.location.search
  const urlParams = new URLSearchParams(window_url);
  const user = urlParams.get('user')
  const [feedUrl, setUrl] = useState('/feed'+"?user="+user)
  const [selectedImg, setSelected] = useState(null)


  const openModal = () => {
    setShow(prev=>!prev)
    console.log(user)
  }

  const handleClick = () => {
    history.push(feedUrl)
  }

  const handleSignOut = () => {
    setAuthenticated(false)
    history.push('/')
  }
  
  return (
    <div className="App" >
    <div className="title">
      <a href='#' onClick={handleClick}><h1>Feed</h1></a>
      <h2>Your Pictures</h2>
      <p>Your personal image repository</p>
    </div>
    
    <button onClick={openModal} className="upload-btn">Upload an Image</button>
    <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>

    <UploadImg show={show} setShow={setShow}></UploadImg>
    <ImgDisplay setSelected={setSelected}></ImgDisplay>
    {selectedImg && <Modal selectedImg={selectedImg} setSelected={setSelected}></Modal>}
    </div>
  );
}

export default App;
