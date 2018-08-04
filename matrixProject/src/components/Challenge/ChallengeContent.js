import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Lightbox from 'react-native-lightbox';

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

          <View style={styles.topBarWrapper}>
                <View style={styles.topBarLeft}>
                  <View style={styles.icon} />
                  <Text style={styles.textStyle}>{this.props.author}</Text>
                  <Text style={styles.textStyle}>{' · ' + ct}</Text>
                </View>
                <Text>💗</Text>
          </View>

          <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{this.props.title}</Text>
          </View>

          <View style={styles.contentContainer}>
              <Text style={styles.textStyle}>{this.props.description}</Text>
              { this.props.url &&
                <TouchableOpacity
                    onPress={() => {
                      this.setState({ isImageViewVisible: true });
              }}>
                    <Lightbox>
                      <Image
                        style={{ marginHorizontal: 10, height: 150 }}
                        source={{ uri: this.props.url }}
                        resizeMode="contain"
                      />
                    </Lightbox>
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
  topBarWrapper: {
    marginTop: '2%',
    marginHorizontal: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topBarLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  titleContainer: {
    paddingLeft: '2%',
    paddingTop: '1%'
  },
  titleText: {
    fontSize: 16,
  },
  contentContainer: {
    margin: '2%'
  },
  icon: {
    width: 15,
    height: 15,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginRight: '2%'
  },
  textStyle: {
    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    //lineHeight: 18
    fontFamily: 'Georgia'
  },
  line: {
    backgroundColor: '#cccccc',
    height: 1,
    paddingHorizontal: 5,
    marginBottom: 10
  }
};

export default ChallengeContent;
