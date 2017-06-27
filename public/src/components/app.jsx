class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      currentAlbum: null
    }
  }

  addPhoto(link, name, description) {
    //$.ajax({})
  }

  selectAlbum() {

  }

  componentDidMount() {
    //$.ajax({});
  }

  render() {
    return (
      <div>
        <h3>rendered App</h3>
        <Navbar addPhoto={this.addPhoto.bind(this)}/>
        <AlbumDisplay currentAlbum={this.state.currentAlbum}/>
        <AlbumList albums={this.state.albums} selectAlbum={this.selectAlbum.bind(this)}/>
      </div>
    )
  }
}

window.App = App;
