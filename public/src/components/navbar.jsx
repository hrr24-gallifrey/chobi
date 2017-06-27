import React from 'react';
import PhotoForm from './photoform.jsx';

const Navbar = ({addPhoto}) => {
  return (
    <PhotoForm addPhoto={addPhoto}/>
  );
};

export default Navbar;
