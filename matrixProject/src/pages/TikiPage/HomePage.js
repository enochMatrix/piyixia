/*MODULE 1*/
import React, { Component } from 'react';
import {
  View, TouchableOpacity, FlatList, Dimensions, TouchableWithoutFeedback
} from 'react-native';
import Video from 'react-native-video';
import { Play } from '../icons';
import Features from './components/Features';
import FeatureB from './components/FeatureB';
import Storage from '../Service/FileStorageService';

class HomePage extends Component {
  constructor() {
    super();
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this);
    this.pauseV = this.pauseV.bind(this);
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  }
  state = {
    videoList: '',
    commentInput: false,
    mask: false,
    videoPaused: false,
    videoMuted: false,
    comment: '',
    page: 0
  };

  componentWillMount() {
    console.log("willmount");
    this.setState({
      videoList: null,
      videoPaused: false,
      commentInput: false,
      mask: false,
    });
  }

  styles = {
    overlay: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    maskStyle: {
      position: 'absolute',
      flex: 1,
      bottom: 0,
      right: 0,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.8)'
    }
  }


  componentDidMount() {
    // GET ALL VIDEOS
    this.setState({videoPaused:true});
    console.log(this.styles.overlay);
    var storageService = new Storage();
    //var list = storageService.downloadVideo();
    console.log(list);
    var list = [
      {
        _id:'v1',
        description: '这个视频很赞哦',
        url: 'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/%E5%A4%A7%E5%8F%B8%E9%A9%AC%E5%94%B1%E6%AD%8C.mp4?alt=media&token=b349883d-f42e-441c-8e33-db465367c0ef'
      },
      {
        _id:'v2',
        description: '这个视频很赞哦',
        url: 'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/xiaojiejie.mp4?alt=media&token=5ed8c6c5-6dd4-4026-a5ee-aa13e654afba'

      }

    ]
    this.setState({ videoList: list });
    //Pause video when changing to other tabs
    this.pauseVideoOnChangingTab = this.props.navigation.addListener('didFocus', () => {
      this.setState({
        videoPaused: false
      });
    });
    this.continueVideoOnChangingTab = this.props.navigation.addListener('didBlur', () => {
      this.setState({
        videoPaused: true
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }
    return true;
  }
  componentWillUnmount() {
    console.log("unmount");
    this.pauseVideoOnChangingTab.remove();
    this.continueVideoOnChangingTab.remove();
  }

  /* TO get the current (viewable) video index in the flastlist */
  handleViewableItemsChanged(info) {
    this.setState({ page: info.viewableItems[0].index });
    //console.log(this.state.videoList[this.state.page]._id);
  }
  // get video


  pauseV() {
    console.log('pauseV()');
    this.setState({ videoPaused: !this.state.videoPaused });
  }

  /* pass [state: muted ? or not to] from Features to here
     prop: data is the state { some: someting } */
  updateFromFeatures(data) {
    console.log('updatafromChil');
    this.setState(data);
  }

  renderItem = ({ item, index }) => {
    
    const { videoPaused, videoMuted, mask, commentInput, videoList, page } = this.state;
    // render everything for the current video
    if (index === this.state.page) {
      return (
        <View>
          <TouchableOpacity
            style={{ flex: 1 }} onPress={this.pauseV}
          >
            <Video
              source={{ uri: item.url }}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }}
              resizeMode="cover"
              paused={videoPaused}
              muted={videoMuted}
              repeat
            />
            {/*Video play logo*/}
            {videoPaused && <View
              style={[this.styles.overlay,
              { top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }]}
            >
              <Play />
            </View>}
          </TouchableOpacity>

          {/* Features component includes all the features in the video page */}
          <View style={[this.styles.overlay, { flex: 1 }]}>
            <Features update={this.updateFromFeatures.bind(this)} currentVid={this.state.videoList[this.state.page]._id} />
          </View>
          {mask &&  // Mask is  when comment box open, darken the background
            <TouchableWithoutFeedback
              onPressIn={() => {
                this.setState({ mask: !this.state.mask, commentInput: false });
              }}>
              <View style={this.styles.maskStyle} />
            </TouchableWithoutFeedback>
          }
          <View>
            {/* input is a boolean prop to open/close comment modal */}

            <FeatureB input={commentInput} description={item.description} />
          </View>
        </View>
      );
    }


    /* just render the video itself but not playing it
      for not viewable videos */
    return (
      <View>
        <Video
          source={{ uri: item.url }}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
          resizeMode="cover"
          paused
          muted
        />
        <View style={[this.styles.overlay, { flex: 1 }]}>
          <Features />
        </View>
        <View>
          <FeatureB input={commentInput} description={item.description} />
        </View>
      </View>
    );
  }
  render() {
    console.log('renderHomePage');
   
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          pagingEnabled
          data={this.state.videoList}
          renderItem={this.renderItem}
          extraData={this.state}
          onViewableItemsChanged={this.handleViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          initialNumberToRender={3}
        />
      </View>
    );
  }

  styles = {
    overlay: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    maskStyle: {
      position: 'absolute',
      flex: 1,
      bottom: 0,
      right: 0,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.8)'
    }
  }
}


export default HomePage;
