import React from 'react';
import Photo from './photo.jsx';

const Album = ({album, selectAlbum}) => { // edited this (wip)
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h3 onClick={() => { selectAlbum(album); }}>All Photos</h3> {/* << make dynamic*/}
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <Photo />
        </div>
        <div className="col-md-3">
          <Photo />
        </div>
        <div className="col-md-3">
          <Photo />
        </div>
        <div className="col-md-3">
          <Photo />
        </div>
      </div>


      <div className="row">
        <div className="col-md-12">
          <h3 onClick={() => { selectAlbum(album); }}>Personal</h3> {/* << make dynamic*/}
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <Photo />
        </div>
        <div className="col-md-3">
          <Photo />
        </div>
        <div className="col-md-3">
          <Photo />
        </div>
        <div className="col-md-3">
          <Photo />
        </div>
      </div>
    </div>
  );
};

export default Album;
