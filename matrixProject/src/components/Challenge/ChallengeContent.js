import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PhotoView from 'react-native-photo-view';

class ChallengeContent extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isImageViewVisible: false,
      };
}

      // 时间差转换
      formatDate(date2, fmt) {
          const date = new Date(date2);
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
          };

          // 遍历这个对象
          for (const k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
              const str = o[k] + '';
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
            }
          }
          return fmt;
    }
     padLeftZero(str) {
      return ('00' + str).substr(str.length);
    }


    render() {
      const ct = this.formatDate(this.props.currentTime, 'yyyy-MM-dd hh:mm');
      return (
          <View>

          <View style={{ marginTop: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={{ width: 15, height: 15, backgroundColor: 'gray', borderRadius: 10 }} />
              <Text style={styles.textStyle}>{this.props.author}</Text>
              <Text style={styles.textStyle}>{' · ' + ct}</Text>
            </View>
            <Text>💗</Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 16, paddingLeft: '2%' }}>{this.props.title}</Text>
          </View>

          <View style={{ marginTop: 5, marginBottom: 15 }}>
            <Text style={styles.textStyle}>{this.props.description}</Text>
            { this.props.url &&
              <TouchableOpacity
                  onPress={() => {
                    this.setState({ isImageViewVisible: true });
            }}>
              <Image
                style={{ marginHorizontal: 10, height: 150 }}
                source={{ uri: this.props.url }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            }
            {/* { this.state.isImageViewVisible &&
            <PhotoView
              source={{ uri: this.props.url }}
              style={{ width: 300, height: 300 }}
            />
            } */}
          </View>
          </View>
      );
}
}

const styles = {
  textStyle: {
    paddingLeft: '2%',
    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    lineHeight: 18
  },
  line: {
    backgroundColor: '#cccccc',
    height: 1,
    paddingHorizontal: 5,
    marginBottom: 10
  }
};

export default ChallengeContent;
