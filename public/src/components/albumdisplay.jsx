import React from 'react';
import AlbumPhotoDisplay from './AlbumPhotoDisplay.jsx';

/* ------------------------------
Render a single album to the page
 -calls albumPhotoDisplay
-------------------------------*/

const AlbumDisplay = ({currentAlbum, albums, selectAlbum, currentPhoto}) => {
  return (
    <div>
      <AlbumPhotoDisplay photos={currentAlbum.photos} albums={albums} selectAlbum={selectAlbum} currentPhoto={currentPhoto}/>
    </div>
  );
};

export default AlbumDisplay;
