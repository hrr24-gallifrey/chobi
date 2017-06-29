import React from 'react';
import Album from './album.jsx';

const AlbumList = ({albums, selectAlbum}) => {
  const albumNode = albums.map((album, i) => {
    return (<Album album={album} selectAlbum={selectAlbum} key={i} />);
  });
  return (<ul >{albumNode}</ul>);
};

export default AlbumList;
