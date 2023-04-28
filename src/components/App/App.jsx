import { useState, useEffect } from 'react';
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import css from "./App.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Modal';
import Button from "../Button";
import Loader from '../Loader';
import imagesAPI from "../../api/fetchImages-api";

const App = ()=> {

  const[images, setImages]=useState([]);
  const[ imagesForSearch, setImagesForSearch ]=useState('');
  const[ currentPage, setCurrentPage ]=useState(1);
  const[ showModal, setShowModal ]=useState(false);
  const[ imageForModal, setImageForModal ]=useState(null);
  const[ tags, setTags ]=useState('');
  const[ isLoading, setIsLoading ]=useState(false);
  const[ total, setTotal ]=useState(0);
  const[ error, setError ]=useState(null);


  useEffect(()=>{

    const fetchImages=async()=>{
      setIsLoading(true);
      try {
        const newImages= await imagesAPI.fetchImagesWithQuery(imagesForSearch, currentPage);
        
        if (newImages.data.hits.length === 0) {
          return toast.error(
            "No images by your query"
          );
        }
          setImages( images=>[...images, ...newImages.data.hits]);
          setTotal(newImages.data.totalHits);
        
      } catch (error) {
       setError(error);
      } finally {
       setIsLoading(false);    }
    }

    if(imagesForSearch===''){
      return;
    }

    fetchImages();

  },[ imagesForSearch, currentPage ]);


 
  const formSubmitHandler=(imagesForSearch)=>{     
    setImagesForSearch(imagesForSearch);
    setImages([]);
    setCurrentPage(1);
  }

 

 const loadMoreImages =() => {   
 
      setCurrentPage(currentPage=>currentPage + 1);
 };



 const onOpenModal=(largeImageURL, tags)=>{

    setImageForModal(largeImageURL);
    setShowModal(true);
    setTags(tags);
  }

 const onCloseModal=()=>{
        setImageForModal(null);
        setShowModal(false);
        setTags('');
  }


  const totalPage = total / images.length;
   return (
    <div className={css.App}>   
    
      <Searchbar onSubmit={formSubmitHandler}/>
      <ToastContainer autoClose={1000}/>

      {images.length>0 &&     <ImageGallery images={images} onOpenModal={onOpenModal}/>
}
      

      {(isLoading) && 
      (<Loader visible={true}/>)}
{(images.length>0 && !isLoading && totalPage > 1 )&&
<Button onClick={loadMoreImages}/>}
      {showModal && (
          <Modal image={imageForModal} tags={tags} onClose={onCloseModal} />
        )}
 {error && (
         <p>"Something went wrong((("</p>
        )}

    </div>
  );

};
export default App;
