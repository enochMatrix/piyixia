/*
挑战列表里的一张挑战卡片
*/

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class ChallengeCard extends Component {

    constructor(props) {
        super(props);
}

  //  时间显示的格式，用于 挑战剩余时间 和 挑战发布时间
    timeDifc(start, end) {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const date3 = endTime.getTime() - startTime.getTime();  //时间差的毫秒数
      //计算出相差天数
      const days = Math.floor(date3 / (24 * 3600 * 1000));
      const years = Math.floor(days / 365);
      const months = Math.floor(days / 30);
      //计算出小时数
      const leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
      const hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      const leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
      const minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数
      const leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
      const seconds = Math.round(leave3 / 1000);

    //  const retValue = new Date(years, months, days, hours, minutes, seconds);
      let strTime = '';
      if (years >= 1) {
          strTime = years + '年';
      } else if (months >= 1) {
          strTime = months + '个月';
      } else if (days >= 1) {
          strTime = days + '天';
      } else if (hours >= 1) {
          strTime = hours + '小时';
      } else {
          strTime = minutes + '分钟';
      }
      //retValue.PubTime = strTime;     //帖子,文章,博客发表时间的一种简短表示方法
      return strTime;
}


    render() {
      console.log('ChallengeCard');

      const { author, currentTime, description, endTime,
        title, url, liked, diamond, status } = this.props.challenge;
      const d = new Date();

      return (
        <View style={styles.container}>
          <View style={{ paddingTop: '2%', paddingHorizontal: '2%' }}>

          {/*卡片顶部信息：头像，用户名，发布时间，点赞？*/}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={{ width: 15, height: 15, backgroundColor: 'gray', borderRadius: 10 }} />
              <Text style={styles.textStyle}>{author}</Text>
              <Text style={styles.textStyle}>{'· ' + this.timeDifc(currentTime, d) + '前'}</Text>
            </View>
            { liked === true ?
              <Image
              source={require('./Logo/pied.png')}
              style={{ width: 26, height: 26 }}
              /> :
              <Image
              source={require('./Logo/pi.png')}
              style={{ width: 26, height: 26 }}
              /> }
          </View>

          {/*挑战标题*/}
          <View>
            <Text style={{ fontSize: 16, paddingHorizontal: '2%' }}>{title}</Text>
          </View>

          {/*挑战内容有图片，就用图片格式，没有就用文字格式*/}
          { !url ?
          <View style={{ marginTop: 5, marginRight: '2%' }}>
          <Text style={styles.textStyle}>{description}</Text>
          </View> :
          <View style={{ marginTop: 5, flexDirection: 'row', flex: 1 }}>
            <Image
              source={{ url: url }}
              style={{ width: 120, height: 90, flex: 0.4, margin: '1%' }}
            />
            <View style={{ flex: 0.6, margin: '1%' }}>
            <Text style={styles.textStyle}>{description}</Text>
            </View>
          </View> }
          </View>

          {/*底部 3个tabs：赞助，剩余时间，评论*/}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {/*赞助*/}
            <View style={styles.tabStyle}>
              <Image
                source={require('./Logo/sponsor.png')}
                style={{ width: 33, height: 33 }}
              />
              <Text style={styles.textStyle}>{diamond}</Text>
            </View>
            {/*状态：剩余时间，已拒绝，已接受*/}
            <View style={styles.tab2Wrapper}>
              { status === -1 &&
              <View style={styles.tab2Style}>
              <Image
                source={require('./Logo/reject.png')}
                style={{ width: 27, height: 27 }}
              /><Text style={styles.textStyle}>打扰了！</Text>
              </View>
              }
              { status === 0 &&
                <View style={styles.tab2Style}>
                <Image
                  source={require('./Logo/timeLeft.png')}
                  style={{ width: 27, height: 27 }}
                /><Text style={styles.textStyle}>{this.timeDifc(currentTime, endTime)}</Text>
                </View>
              }
              { status === 1 &&
                <View style={styles.tab2Style}>
                <Image
                  source={require('./Logo/accepted.png')}
                  style={{ width: 27, height: 27 }}
                /><Text style={styles.textStyle}>皮一下！</Text>
                </View>
              }
            </View>
            {/*评论*/}
            <View style={styles.tabStyle}>
              <Image
                source={require('./Logo/comment.png')}
                style={{ width: 20, height: 20 }}
              />
              <Text style={styles.textStyle}>56</Text>
            </View>
          </View>
        </View>
      );
}
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'column',
    marginVertical: 4
  },
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 28,
    width: '33.33%',
    backgroundColor: '#d3d3d3',
    marginTop: 16,
    borderBottomRadius: 5,
  },
  tab2Style: {
    flexDirection: 'row',
    marginTop: -12,
    backgroundColor: '#c4c4c4',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 10
  },
  tab2Wrapper: {
    marginTop: 16,
    backgroundColor: '#c4c4c4',
    width: '33.33%',
    height: 28,
    justifyContent: 'space-between',
  },
  textStyle: {
    paddingLeft: '2%',
    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    lineHeight: 18
  }
};

export default ChallengeCard;
