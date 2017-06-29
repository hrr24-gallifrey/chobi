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
      currentAlbum: {}
    };
  }

  addPhoto(photo, albumName, description) { // pass in album name/id pulled from drop-down selector?

    var data = new FormData();
    data.append('photo', photo, photo.name);
    data.append('albumName', albumName);
    data.append('description', description);

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/user/1234/upload', // '1234' should be the actual user id of person
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

  selectAlbum() {

  }

  componentDidMount() {
    //$.ajax({});
  }

  renderPage({currentAlbum}) {
    if (currentAlbum === null) {
      //return (<AlbumList albums={this.state.albums} selectAlbum={this.selectAlbum.bind(this)}/>)
      return (<Album />);
    } else {
      return (<AlbumDisplay currentAlbum={currentAlbum}/>);
    }
  }

  render() {
    return (
      <div>
        <Navbar addPhoto={this.addPhoto.bind(this)}/>
        <div className="container-fluid">
          <this.renderPage currentAlbum={this.state.currentAlbum} />
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
