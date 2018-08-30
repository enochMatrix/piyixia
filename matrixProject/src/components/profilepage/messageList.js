import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Trash, Envelope } from '../icons';

export default class MessageList extends React.Component {

  constructor(prop) {
    super();
    this.state = {
        transaction: prop.transaction,
    };
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
      return strTime + '前';
}


    deleteItem =(id) => {
      console.log(id);
        const item = this.state.transaction;
        item.splice(id, 1);
        this.setState({
            transcation: item
        });
    };

    _renderItem = ({ item, index }) => {
        let backgroundColor = 'red';
        if (index % 2 === 0) {
           backgroundColor = '#cccccc';
        } else {
          backgroundColor = '#f0f0f0';
        }
        const swipeoutBtn = [
          {
          text: 'Delete',
          backgroundColor: 'red',
          onPress: () => { this.deleteItem(index); }
          }
        ];
        const currentDate = new Date();
        return (
          <Swipeout
            backgroundColor='white'
            right={swipeoutBtn}
          >
              <View style={[styles.message, { backgroundColor: backgroundColor }]}>
                  <Text style={styles.bubble}>
                      {item.usage}
                  </Text>
                  <Text style={styles.time}>
                      {this.timeDifc(item.date, currentDate)}
                  </Text>
              </View>
          </Swipeout>
  );
}

    render() {
      console.log('messageList');
        return (
            <View>
                  <View style={styles.listTextContainer}>
                        <View style={styles.sameLineWrapper}>
                            <Envelope />
                            <Text style={styles.listText}> 消息列表</Text>
                        </View>
                        <View style={styles.sameLineWrapper}>
                            <Text style={styles.listText}>删除全部 </Text>
                            <Trash />
                        </View>
                  </View>

                  <View style={styles.aLine} />

                  <View style={styles.listContainer}>
                      <FlatList
                        data={this.props.transaction}
                        renderItem={this._renderItem}
                      />
                  </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sameLineWrapper: {
      flexDirection: 'row',
    },
    listTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listText: {
      color: 'gray'
    },
    aLine: {
      marginTop: 2,
      height: 3,
      backgroundColor: 'black'
    },
    listContainer: {
      marginTop: 5,
      paddingBottom: 520
    },
    message: {
      //marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 10,
      padding: 17,
    },
    bubble: {

    },
    time: {
      fontSize: 12,
    },
});
