import {useState} from 'react';
import PropTypes from 'prop-types';
import css from "./Searchbar.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from "react-icons/fa";


const Searchbar = ({onSubmit})=> {
  const[ imagesForSearch, setImagesForSearch ]=useState('');
 
  const handleSubmit=(event)=>{
    
      event.preventDefault();

    if(imagesForSearch.trim()===''){
      toast.error('Enter images for search');  
         return;
    }   
    onSubmit(imagesForSearch);
    setImagesForSearch('');
 
  }

  const handleImagesNames =(event)=>{
    setImagesForSearch(event.currentTarget.value.toLowerCase());
    
  }

 
     return(
        <header className={css.searchbar}>
  <form className={css.searchForm} onSubmit={handleSubmit}>
    <button type="submit" className={css.searchFormButton}>
        <FaSearch  style={{color: "#84868b",}}/>
    </button>

    <input
      className={css.searchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleImagesNames}
    />
  </form>

</header>
    )
 
   
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

export default Searchbar;