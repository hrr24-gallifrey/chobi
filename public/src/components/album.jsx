const Album = ({album, selectAlbum}) => {
  return (<li onClick={() => { selectAlbum(album) }}></li>)
}

window.Album = Album;
