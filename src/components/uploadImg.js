import React, { useState, useEffect } from 'react';
import ProgressBar from './progressBar';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
  }));

const UploadImg = ({show, setShow}) => {

    const [img, setImg] = useState(null)
    const [check, setCheck] = useState('false')
    const [submit, setSubmit] = useState(null)
    const classes = useStyles();

    const uploadHandler = (e) => {
        const files = e.target.files[0];
        if(files){
            if(files.type=="image/png" || files.type=="image/jpeg"){
                setImg(files)
            }else{
                alert("Invalid file type chosen. Please choose a png or jpeg file")
            }   
    }
};

const handleCheckBox = (e) => {
    if(check=='true'){
        setCheck('false')
    }else{
        setCheck('true')
    }
}

const handleClick = (e) => {
    setSubmit(true)
}

    return(
        <Modal
        open={show}
        onClose={() => setShow(false)}
      >

<div className={classes.paper}>
      <h2 style={{fontSize:'25px'}}>Upload an Image</h2>
      <form>
            <input type="file" style={{marginTop:'10px'}}onChange={uploadHandler}></input>
                <label style={{marginTop:'10px'}}>Private  
                    <input
                        name="isPrivate"
                        type="checkbox"
                        onChange={handleCheckBox}
                        style={{marginLeft: '10px'}}
                    />
                </label>
                <br></br>
            <button type="button" onClick={handleClick}>Upload</button>
            <div className="output">
                { (img && submit) && <ProgressBar file={img} setFile={setImg} check={check} setCheck={setCheck} setSubmit={setSubmit}/> }
            </div>
        </form>
</div>
      </Modal>
      
    );
}

export default UploadImg;
