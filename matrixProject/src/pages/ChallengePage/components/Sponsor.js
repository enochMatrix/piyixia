import React, {Component} from 'react';
import { View, Text } from 'react-native';

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
              <View style={{ width:45, height:45, borderRadius: 20, backgroundColor: 'gray' }} />
              <Text style={{ fontSize: 10 }}>小司马</Text>
              <Text style={{ fontSize: 10 }}>500</Text>
            </View>
            }
           {/* <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width:45, height:45, borderRadius: 20, backgroundColor: 'gray' }} />
              <Text style={{ fontSize: 10 }}>用户名甲</Text>
              <Text style={{ fontSize: 10 }}>19k</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width:45, height:45, borderRadius: 20, backgroundColor: 'gray' }} />
              <Text style={{ fontSize: 10 }}>用户名甲</Text>
              <Text style={{ fontSize: 10 }}>19k</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width:45, height:45, borderRadius: 20, backgroundColor: 'gray' }} />
              <Text style={{ fontSize: 10 }}>用户名甲</Text>
              <Text style={{ fontSize: 10 }}>19k</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width:45, height:45, borderRadius: 20, backgroundColor: 'gray' }} />
              <Text style={{ fontSize: 10 }}>用户名甲</Text>
              <Text style={{ fontSize: 10 }}>19k</Text>
            </View> */}
          </View>
      );
}
}

export default Sponsor;
