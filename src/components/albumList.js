import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import AlbumDetail from './AlbumDetail'; // "./" means in the current dir

class albumList extends Component {

  state = { albums: [] }; //initialize empty state
  //lifecycle method: will be automatically called at some point
  componentWillMount() { // once called, component will mount.
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
      .then((response) => response.json())
      .then(response => this.setState({ albums: response }));
  }


  /* return an array that
    for each album, return a text tag that contains album.title */
renderAlbumbs() {
    return this.state.albums.map(album =>
      <AlbumDetail key={album.title} album={album} /> //props system: passing down "album" as prop
    );
}

  render() {
    console.log(this.state)
    return (
    <ScrollView>
      {this.renderAlbumbs()}
    </ScrollView>
  );
}
}

export default albumList;
