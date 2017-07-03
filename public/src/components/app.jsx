import React from 'react';
import Navbar from './navbar.jsx';
import AlbumDisplay from './albumdisplay.jsx';
import AlbumList from './albumlist.jsx';
import Album from './album.jsx';
import UserList from './userList.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      currentAlbum: null,
      currentUser: {
        albums: []
      },
      displayUser: {
        albums:[]
      },
      users: [],
      friends: [],
      friendRequests: {
        pendingSentUsers: [],
        pendingRecUsers: []
      }
    };

    this.request = this.addFriend.bind(this);
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

  getUser(username) {
    username = username || '';
    var currentUser = this.state.currentUser;

    $.ajax({
      type: 'GET',
      url: '/user/' + username,
      success: function(data) {
        console.log(data);
        if (!currentUser) {
          currentUser = data;
        }
        this.setState({ currentUser: currentUser, displayUser: data});
        console.log(this.state.albums);
      }.bind(this),
      error: function(err) {
        console.error('error', err);
      }.bind(this)
    });

  }

  getUsers() {
    $.ajax({
      type: 'GET',
      url: '/users',
      success: function(data) {
        console.log("==== get users ===", data);
        this.setState({users: data});
        console.log(this.state.users);
      }.bind(this),
      error: function(err) {
        console.error('error', err);
      }.bind(this)
    });
  }

  getFriends() {
    $.ajax({
      type: 'GET',
      url: '/friends',
      success: function(data) {
        console.log("==== get friends ===", data);
        this.setState({friends: data});

      }.bind(this),
      error: function(err) {
        console.error('error', err);
      }.bind(this)
    });
  }

  getFriendRequests() {
    $.ajax({
      type: 'GET',
      url: '/user/friend-requests',
      success: function(data) {
        console.log("===get friend-requests===", data);
        this.setState({
          friendRequests: data
        });
      }.bind(this),
      error: function(err) {
        console.error('error', err);
      }.bind(this)
    });
  }

  addFriend(friendName) {
    let data = {friendName: friendName}
    $.ajax({
      type: 'POST',
      url: `/friends/add/${friendName}`,
      data: data,
      success: function(response) {
        this.setState({albums: data.albums, currentUser: data, displayUser: data.username});
        //this.getFriendRequests();
      }.bind(this),
      error: function(err) {
        console.error('error', err);
      }.bind(this)
    });

  }

  selectUser(username){

  }

  selectAlbum(album, photo) {
    let photoNum = photo || 0;
    console.log(album);
    console.log(photoNum)
    this.setState({currentAlbum: album, currentPhoto: photoNum});
  }

  componentDidMount() {
    this.getUser();
    this.getUsers();
    this.getFriendRequests();
    this.getFriends();
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
        <Navbar
          addPhoto={this.addPhoto.bind(this)}
          currentUser={this.state.currentUser}
          friends={this.state.friends}
          friendRequests={this.state.friendRequests}
        />
        <div className="container-fluid">
          <this.renderPage
            currentAlbum={this.state.currentAlbum}
            albums={this.state.albums}
            selectAlbum={this.selectAlbum.bind(this)}
            currentPhoto={this.state.currentPhoto}
          />
        </div>
        <UserList users={this.state.users} addFriend={this.addFriend.bind(this)} />
      </div>
    );
  }
}


/*
<AlbumDisplay currentAlbum={this.state.currentAlbum}/>
<AlbumList albums={this.state.albums} selectAlbum={this.selectAlbum.bind(this)}/>
<Album />
*/
