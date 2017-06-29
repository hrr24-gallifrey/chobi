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
      currentAlbum: {},
      currentAlbumIndex: 5
    };
  }

  addPhoto(photo, albumName, description) { // pass in album name/id pulled from drop-down selector?

    var data = new FormData();
    data.append('photo', photo, photo.name);
    data.append('albumName', albumName);
    data.append('description', description);

    $.ajax({
      type: 'POST',
      url: "localhost:8080/user/john_doe/upload", // '1234' should be the actual user id of person
      data: data,
      processData: false,
      contentType: false,
      success: function(response) {
        console.log('success', response);
      },
      error: function(error) {
        console.error('Error in submitting photo upload form: ', error);
      }
    });
  }

  selectAlbum(album) {
    this.setState({currentAlbum: album});
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'localhost:8080/user/john_doe',
      success: function(data) {
        this.setState({albums: data.albums});
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

  renderPage({currentAlbum, albums, selectAlbum}) {
    if (currentAlbum === null) {
      return (<AlbumList albums={albums} selectAlbum={selectAlbum}/>)
      //return (<Album />);
    } else {
      return (<AlbumDisplay currentAlbum={currentAlbum} albums={albums} selectAlbum={selectAlbum}/>);
    }
  }

  render() {
    return (
      <div>
        <Navbar addPhoto={this.addPhoto.bind(this)}/>
        <div className="container-fluid">
          <this.renderPage currentAlbum={this.state.currentAlbum} albums={this.state.albums} selectAlbum={this.selectAlbum.bind(this)}/>
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
