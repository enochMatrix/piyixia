/*
挑战列表里的一张挑战卡片
*/

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

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
      const currentDate = new Date();

      return (
        <View style={styles.container}>
              <View style={styles.whiteCardContainer}>

              {/*卡片顶部信息：头像，用户名，发布时间，点赞？*/}
              <View style={styles.topInfoContainer}>
                      <View style={styles.topInfoLeft}>
                          <View style={styles.icon} />
                          <Text style={styles.textStyle}>
                            {author}
                          </Text>
                          <Text style={styles.textStyle}>
                            {'· ' + this.timeDifc(currentTime, currentDate) + '前'}
                          </Text>
                      </View>
                      { liked === true ?      //点赞前后 皮 显示不同图片
                        <Image
                        source={require('./Logo/pied.png')}
                        style={styles.pi}
                        /> :
                        <Image
                        source={require('./Logo/pi.png')}
                        style={styles.pi}
                        /> }
              </View>

              {/*挑战标题*/}
              <View>
                  <Text style={styles.titleText}>{title}</Text>
              </View>

              {/*挑战内容有图片，就用图片格式，没有就用文字格式*/}
              { !url ?
              <View style={styles.contentContainerWithoutImage}>
                  <Text style={styles.textStyle}>{description}</Text>
              </View> :
              <View style={styles.contentContainerWithImage}>
                    <Image
                      source={{ url: url }}
                      style={styles.contentImageStyle}
                    />
                    <View style={styles.contentTextContainerStyle}>
                        <Text style={styles.textStyle}>{description}</Text>
                    </View>
              </View> }
              </View>

          {/*底部 3个tabs：赞助，剩余时间，评论*/}
          <View style={styles.bottomBarWrapper}>
                {/*赞助*/}
                <View style={styles.leftRightTab}>
                      <Image
                        source={require('./Logo/sponsor.png')}
                        style={{ width: 33, height: 33 }}
                      />
                      <Text style={styles.textStyle}>{diamond}</Text>
                </View>
            {/*状态：剩余时间，已拒绝，已接受*/}
            <View style={styles.statusTabWrapperper}>
                  { status === -1 &&
                  <View style={styles.statusTab}>
                      <Image
                        source={require('./Logo/reject.png')}
                        style={{ width: 27, height: 27 }}
                      />
                      <Text style={styles.textStyle}>打扰了！</Text>
                  </View>
                  }
                  { status === 0 &&
                    <View style={styles.statusTab}>
                        <Image
                          source={require('./Logo/timeLeft.png')}
                          style={{ width: 27, height: 27 }}
                        />
                        <Text style={styles.textStyle}>{this.timeDifc(currentTime, endTime)}</Text>
                    </View>
                  }
                  { status === 1 &&
                    <View style={styles.statusTab}>
                        <Image
                          source={require('./Logo/accepted.png')}
                          style={{ width: 27, height: 27 }}
                        />
                        <Text style={styles.textStyle}>皮一下！</Text>
                    </View>
                  }
            </View>
            {/*评论*/}
            <TouchableOpacity style={styles.leftRightTab} onPress={this.props.onPress}>
                  <Image
                    source={require('./Logo/comment.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={styles.textStyle}>56</Text>
            </TouchableOpacity>
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
  whiteCardContainer: {
    paddingTop: '2%',
    paddingLeft: '4%',
    paddingRight: '2%'
  },
  topInfoContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
  },
  topInfoLeft: {
    flexDirection: 'row',
    marginRight: 5,
  },
  contentContainerWithoutImage: {
    marginTop: 5,
    marginRight: '2%'
  },
  contentContainerWithImage: {
    marginTop: 5,
    flexDirection: 'row',
    marginRight: '2%',
    flex: 1
  },
  contentImageStyle: {
    height: 90,
    flex: 0.4,
  },
  contentTextContainerStyle: {
    flex: 0.6,
    marginLeft: '1%'
  },
  bottomBarWrapper: {
    flexDirection: 'row',
  },
  leftRightTab: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 28,
    width: '33.33%',
    backgroundColor: '#d3d3d3',
    marginTop: 16,
    borderBottomRadius: 5,
  },
  statusTabWrapperper: {
    marginTop: 16,
    backgroundColor: '#c4c4c4',
    width: '33.33%',
    height: 28,
  },
  statusTab: {
    flexDirection: 'row',
    marginTop: -12,
    backgroundColor: '#c4c4c4',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 10
  },
  textStyle: {
    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    fontFamily: 'Georgia'
  },
  titleText: {
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: 'gray',
    borderRadius: 20,
    marginRight: 5
  },
  pi: {
    width: 26,
    height: 26,
  },
};

export default ChallengeCard;
