import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class commentPage extends Component {
  constructor(props) {
    super(props);
  }

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
    const { user, date, content } = this.props;
    const ct = this.formatDate(date, 'yyyy-MM-dd hh:mm');
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }}>
              <Image style={{ width: 30, height: 30}} source={{ url: 'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/image%2F1529294093237c894ebe838.jpeg?alt=media&token=d25d5561-ce8a-45b3-baea-0d14f77b157c' }} />
            </View>
          </View>
          <View style={styles.container2}>
            {/*用户名*/}
            <Text style={styles.textStyle}>{user}</Text>
            {/*内容*/}
            <View style={styles.contentContainerStyle}>
              <Text style={styles.contentStyle}>
                {content}
              </Text>
            </View>

            <View style={styles.bottomLineWrapper}>
              {/*日期*/}
              <View style={styles.date}>
                <Text style={styles.DateStyle}>{ct}</Text>
              </View>
              {/*评论转发*/}
              <View style={styles.commentShareWrapper}>
                <View style={styles.commentWrapper}>
                  <Text style={styles.textStyle}>评论</Text>
                </View>
                <View style={styles.commentWrapper}>
                  <Text style={styles.textStyle}>皮32</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 5,
    textAligh: 'right'
  },
  profileContainer: {
    width: '15%'
  },
  container2: {
    paddingLeft: 5,
    width: '85%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 0
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: 'gray',
    borderRadius: 20
  },
  textStyle: {
    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    lineHeight: 18,
    textAlign: 'right'
  },
  contentContainerStyle: {
    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    lineHeight: 18,
    textAlign: 'right',
    marginBottom: 5
  },
  contentStyle: {
    fontSize: 13,
    color: 'gray',
    letterSpacing: 0.7,
    lineHeight: 18,
  },
  DateStyle: {

    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    lineHeight: 18,
    textAlign: 'left'
  },
  bottomLineWrapper: {
    flexDirection: 'row',
    width: '100%',
    textAligh: 'right',

  },
  commentShareWrapper: {
    width: '50%',
    flexDirection: 'row',
  },
  commentWrapper: {

    width: '50%'
  },
  date: {
    width: '50%'

  }
};

export default commentPage;
