import React from 'react';
import Album from './album.jsx';

const AlbumList = ({albums, selectAlbum}) => {
  const albumNode = albums.map((album, i) => {
    return (<Album album={album} selectAlbum={selectAlbum} key={i} />);
  });
  return (<div>{albumNode}</div>);
};

export default AlbumList;
