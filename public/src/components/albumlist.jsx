const AlbumList = ({albums, selectAlbum}) => {
  const albumNode = albums.map((album) => {
    return (<Album album={album} selectAlbum={selectAlbum} key={album.id} />)
  });
  return (<ul>{albumNode}</ul>)
}

window.AlbumList = AlbumList;
