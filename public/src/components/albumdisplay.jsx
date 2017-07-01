import React from 'react';
import AlbumPhotos from './albumPhotos.jsx';
import AlbumPhotoDisplay from './AlbumPhotoDisplay.jsx';

const AlbumDisplay = ({currentAlbum, albums, selectAlbum}) => {
  return (
    <div>
      <AlbumPhotoDisplay photos={currentAlbum.photos} albums={albums} selectAlbum={selectAlbum}/>
      {/*<AlbumPhotos album={currentAlbum}/>*/}
    </div>
  );
};

export default AlbumDisplay;
