import React from 'react';

const PhotoForm = ({addPhoto}) => {
  let photo;
  let name;
  let desc;

  return (
    <form method="post" encType="multpart/form-data" onSubmit={(e) => { // add a drop-down selector for album?
      e.preventDefault();
      addPhoto(photo.files[0], name.value, desc.value);
      photo.value = '';
      name.value = '';
      desc.value = '';
    }}>
      <div className="form-group">
        <input id="photo" className="form-control" type="file" name="photo" placeholder="Upload Photo" ref={node => {
          photo = node;
        }}/>
      </div>
      <div className="form-group">
        <input id="desc" className="form-control" type="text" name="desc" placeholder="Description" autoComplete="off" ref={node3 => {
          desc = node3;
        }}/>
      </div>
      <div className="form-group">
        <input id="name" className="form-control" type="text" name="name" placeholder="Album name" autoComplete="off" ref={node2 => {
          name = node2;
        }}/>
      </div>
      <input type="submit" className="btn btn-primary" value="Submit" />
    </form>
  );
};

export default PhotoForm;
