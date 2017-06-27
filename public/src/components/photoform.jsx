import React from 'react';

const PhotoForm = ({addPhoto}) => {
  let photo;
  let name;
  let desc;

  return (
    <form onSubmit={(e) => { // add a drop-down selector for album?
      e.preventDefault();
      addPhoto(photo.value, name.value, desc.value);
      photo.value = '';
      name.value = '';
      desc.value = '';
    }}>
      <input ref={node => {
        photo = node;
      }}/>
      <input ref={node2 => {
        name = node2;
      }}/>
      <input ref={node3 => {
        desc = node3;
      }}/>
      <br />
    </form>
  );
};

export default PhotoForm;
