import React from 'react';
import Album from './album.jsx';

const AlbumList = ({albums, selectAlbum}) => {
  const albumNode = albums.map((album) => {
    return (<Album album={album} selectAlbum={selectAlbum} key={album.id} />);
  });
  return (<ul style={{display:'none'}}>{albumNode}</ul>);
};

export default AlbumList;
