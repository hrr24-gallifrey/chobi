import React from 'react';
import AlbumPhotos from './albumPhotos.jsx';
import AlbumPhotoDisplay from './AlbumPhotoDisplay.jsx';

const AlbumDisplay = ({currentAlbum, albums, selectAlbum, currentPhoto}) => {
  return (
    <div>
      <AlbumPhotoDisplay photos={currentAlbum.photos} albums={albums} selectAlbum={selectAlbum} currentPhoto={currentPhoto}/>
      {/*<AlbumPhotos album={currentAlbum}/>*/}
    </div>
  );
};

export default AlbumDisplay;
