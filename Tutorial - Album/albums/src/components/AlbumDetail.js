import React from 'react';
import { Text,View,Image,Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Buttons from './Buttons'

/* functional component
need to receive props passsed from albumList
pass the pass tag as a component
*/
const AlbumDetail = ({ album }) => {
  const { title, artist, thumbnail_image, image, url } = album; //destructure!
  const {
     thumbnailStyle, headerContentStyle,
     headerTextStyle, imageStyle, thumnailContainerStyle
   } = styles;

  return (
    <Card>
      <CardSection>
        <View style={thumnailContainerStyle}>
          <Image source={{ uri: thumbnail_image }} style={thumbnailStyle} />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image source={{ uri: image }} style={imageStyle} />
      </CardSection>

      <CardSection>
        <Buttons onPress={() => Linking.openURL(url)}>Buy now</Buttons>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
   justifyContent: 'space-around',
   flexDirection: 'column'
},
  headerTextStyle: {
   fontSize: 18
},
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: { // to make a pic from most left to most right of screen
    height: 300,
    width: null,
    flex: 1
  }
};

export default AlbumDetail;
