import React, {Component} from 'react';
import { View, Text,Image } from 'react-native';

class Sponsor extends Component {

    constructor (props){
      super(props);
    
    }

    render() {
      return (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 16, width: 20 }}>金主榜</Text>
            {this.props.spons &&
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View  style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }}>
                <Image style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }} source={{url:'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/image%2F1529294093237c894ebe838.jpeg?alt=media&token=d25d5561-ce8a-45b3-baea-0d14f77b157c'}} />
              </View>
              <Text style={{ fontSize: 10 }}>小司马</Text>
              <Text style={{ fontSize: 10 }}>500</Text>
            </View>
            }
            
           <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width:30, height:30, borderRadius: 20, backgroundColor: 'gray' }} >
              <Image style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }} source={{url:'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/image%2Fimages.jpeg?alt=media&token=e9fdccb5-92f4-4b0e-bb01-27749bb3e4fc'}} />
              </View>
              <Text style={{ fontSize: 10 }}>胡丽亚</Text>
               
              <Text style={{ fontSize: 10 }}>3.6k</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width:30, height:30, borderRadius: 20, backgroundColor: 'gray' }} >
                <Image style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }} source={{url:'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/image%2F1489203230724_len17229.jpg?alt=media&token=00bf209c-8440-46b1-817b-38eab373256e'}} />
              </View>
              <Text style={{ fontSize: 10 }}>小詹姆斯</Text>
              <Text style={{ fontSize: 10 }}>3.5k</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width:30, height:30, borderRadius: 20, backgroundColor: 'gray' }} >
                <Image style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }} source={{url:'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/image%2Fimages.jpeg?alt=media&token=e9fdccb5-92f4-4b0e-bb01-27749bb3e4fc'}} />
              </View>
              <Text style={{ fontSize: 10 }}>体育委员徐晃</Text>
              <Text style={{ fontSize: 10 }}>2.5k</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width:30, height:30, borderRadius: 20, backgroundColor: 'gray' }} >
              <Image style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }} source={{url:'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/image%2F1529294093237c894ebe838.jpeg?alt=media&token=d25d5561-ce8a-45b3-baea-0d14f77b157c'}} />
              </View>
              <Text style={{ fontSize: 10 }}>班草韩金龙</Text>
              <Text style={{ fontSize: 10 }}>2k</Text>
            </View>
          </View>
      );
}
}

export default Sponsor;
