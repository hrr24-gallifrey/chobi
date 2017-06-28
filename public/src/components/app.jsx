import React from 'react';
import Navbar from './navbar.jsx';
import AlbumDisplay from './albumdisplay.jsx';
import AlbumList from './albumlist.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      currentAlbum: null
    };
  }

  addPhoto(photo, albumName, description) { // pass in album name/id pulled from drop-down selector?

    var data = new FormData();
    data.append('photo', photo, photo.name);
    data.append('albumName', albumName);
    data.append('description', description);

    $.ajax({
      type: 'POST',
      url: 'upload',
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

  render() {
    return (
      <div>
        <Navbar addPhoto={this.addPhoto.bind(this)}/>
        <AlbumDisplay currentAlbum={this.state.currentAlbum}/>
        <AlbumList albums={this.state.albums} selectAlbum={this.selectAlbum.bind(this)}/>
      </div>
    );
  }
}
