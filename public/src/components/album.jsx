import React from 'react';
import Photo from './photo.jsx';

const Album = ({album, selectAlbum}) => { // edited this (wip)
  /*const photos = album.photos.map(photo, i) => {
    return (<div className="col-md-3"><Photo photo={photo} key={album.name + i}/></div>)
  }*/
  const photos = album.photos.map((photo, i) => {
    if(i < 4) {
      return (<div className="col-md-3"><Photo photo={photo}/></div>);
    }
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h3 onClick={() => { selectAlbum(album); }}>{album.name}</h3> {/* << make dynamic*/}
        </div>
      </div>

      <div className="row">
        {photos}
      </div>
    </div>
  );
};

export default Album;
