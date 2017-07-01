import React from 'react';

const PhotoForm = ({addPhoto, currentUser}) => {
  let photo;
  let name;
  let desc;
  let newName;

  $('select#name').on('change', function(e) {
    e.preventDefault();
    name = $(this).val();
    console.log(name);
    if($(this).val() === '__newalbum') {
      $('.new-name-hidden').show();
    } else {
      $('.new-name-hidden').hide();
    }
  });

  return (
    <form method="post" encType="multpart/form-data" onSubmit={(e) => { // add a drop-down selector for album?
      e.preventDefault();
      addPhoto(photo.files[0], name, desc.value, newName.value);
      photo.value = '';
      // name.value = '';
      desc.value = '';
      newName.value = '';
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
        <select id="name" className="form-control" name="name">
          <option value="">Select Album</option>
          <option value="personal">Personal</option>
          <option value="office">Office</option>
          <option value="__newalbum">Create New Album</option>
        </select>
      </div>

      <div className="form-group new-name-hidden">
        <input id="newName" className="form-control" type="text" name="newName" placeholder="New Album" autoComplete="off" ref={node4 => {
          newName = node4;
        }}/>
      </div>

      <input type="submit" className="btn btn-primary" value="Submit" />
    </form>
  );
};

export default PhotoForm;

/*
<div className="form-group">
        <input id="name" className="form-control" type="text" name="name" placeholder="Album name" autoComplete="off" ref={node2 => {
          name = node2;
        }}/>
      </div>
      */
