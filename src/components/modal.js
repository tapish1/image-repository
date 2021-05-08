import React from 'react'

const Modal = ({selectedImg, setSelected}) => {
    
    const clickHandler = (e) => {
        if(e.target.classList.contains('bg-modal')){
            setSelected(null);
        }
    }
    return (
        <div className="bg-modal" onClick={(clickHandler)}>
            <img src={selectedImg} alt="modal-picture" ></img>
        </div>
    )
}

export default Modal;
