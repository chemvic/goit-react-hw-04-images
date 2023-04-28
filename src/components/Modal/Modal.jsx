
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from "./Modal.module.css";
const modalRoot = document.querySelector('#modal-root');


const Modal = ({image, tags, onClose})=>{


    useEffect(()=>{window.addEventListener('keydown', handleEscCatch)},[]);

 
    useEffect(()=>{return ()=>{window.removeEventListener('keydown',handleEscCatch)}},[]);

   const handleEscCatch=(event)=>{
     
      if(event.code==='Escape'){
        onClose();
      }
    }
   const  handleOverlayClick=(event)=>{
      if(event.currentTarget===event.target){
        onClose();
      }
    }
  
  


return createPortal(
  <div className={css.overlay} onClick={handleOverlayClick}>
  <div className={css.modal}>
  <img src={image} alt={tags} className={css.imageModal} />
  </div>
</div>, modalRoot
    );

 
}

Modal.propTypes={
 
  tags: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal;      