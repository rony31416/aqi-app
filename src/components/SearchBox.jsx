import React from 'react';
import { FcSearch } from "react-icons/fc";

const SearchBox = () => {
  return (
    <div className='searchBox position-relative d-flex align-items-center'>
      <FcSearch className='mr-2 searchIcon' />
      <input type="text" placeholder='Search here...' />
    </div>
  )
}

export default SearchBox;

