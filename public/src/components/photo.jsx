import React from 'react';

const Photo = ({photo}) => {
  return (
    <img src="{photo.url}" title="{photo.description}"/>
  );
};

export default Photo;
