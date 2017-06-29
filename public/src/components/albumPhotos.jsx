import React from 'react';
import Photo from './photo.jsx';

const AlbumPhotos = ({}) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h3>Albumname</h3> {/* << make dynamic*/}
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
      <br />
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

export default AlbumPhotos;
