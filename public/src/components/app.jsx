import React from 'react';
import Navbar from './navbar.jsx';
import AlbumDisplay from './albumdisplay.jsx';
import AlbumList from './albumlist.jsx';
import Album from './album.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      photos: [],
      currentAlbum: null,
      currentPhoto: 0,
      currentAlbumIndex: 5,
      currentUser: {
        albums: []
      }, // change
      displayUser: {} // change
    };
  }

  addPhoto(photo, albumName, description, newAlbumName) { // pass in album name/id pulled from drop-down selector?

    var data = new FormData();
    data.append('photo', photo, photo.name);

    if(albumName === '__newalbum') {
      if(newAlbumName === '') {
        data.append('albumName', 'All Photos');
      } else {
         data.append('albumName', newAlbumName);
      }
    } else if(albumName === '') {
      data.append('albumName', 'All Photos');
    } else {
      data.append('albumName', albumName);
    }

    data.append('description', description);

    $.ajax({
      type: 'POST',
      url: "/user/upload",
      data: data,
      processData: false,
      contentType: false,
      success: function(response) {
        console.log('success', response);
        this.setState({albums: response.albums, photos: response.photos});
      }.bind(this),
      error: function(error) {
        console.error('Error in submitting photo upload form: ', error);
      }.bind(this)
    });
  }

  selectAlbum(album, photo) {
    let photoNum = photo || 0;
    console.log(album);
    console.log(photoNum)
    this.setState({currentAlbum: album, currentPhoto: photoNum});
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/user/' + this.state.currentUser,
      success: function(data) {
        console.log(data);
        this.setState({albums: data.albums, currentUser: data, displayUser: data});
        console.log(this.state.albums);
      }.bind(this),
      error: function(err) {
        console.error('error', err);
      }.bind(this)
    });
  }

  changeAlbum(dir) {
    //dir -1 or 1
    // set.state of current album to next or previous album
  }

  renderPage({currentAlbum, albums, selectAlbum, currentPhoto}) {
    if (currentAlbum === null) {
      return (
        <AlbumList
          albums={albums}
          selectAlbum={selectAlbum}
        />
      );
      //return (<Album />);
    } else {
      return (
        <AlbumDisplay
          currentAlbum={currentAlbum}
          albums={albums}
          selectAlbum={selectAlbum}
          currentPhoto={currentPhoto}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar addPhoto={this.addPhoto.bind(this)} currentUser={this.state.currentUser}/>
        <div className="container-fluid">
          <this.renderPage
            currentAlbum={this.state.currentAlbum}
            albums={this.state.albums}
            selectAlbum={this.selectAlbum.bind(this)}
            currentPhoto={this.state.currentPhoto}
          />
        </div>
      </div>
    );
  }
}


/*
<AlbumDisplay currentAlbum={this.state.currentAlbum}/>
<AlbumList albums={this.state.albums} selectAlbum={this.selectAlbum.bind(this)}/>
<Album />
*/
