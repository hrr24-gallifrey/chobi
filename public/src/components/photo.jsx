import React from 'react';

/* ------------------------------
renders a single photo currently in use from album.jsx
-------------------------------*/

const Photo = ({photo}) => {
  return (
    <img className="img-responsive" src={photo.url} title={photo.description}/>
  );
};

export default Photo;
