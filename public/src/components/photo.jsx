import React from 'react';

const Photo = ({photo}) => {
  return (
    <img className="img-responsive" src={photo.url} title={photo.description}/>
  );
};

export default Photo;
