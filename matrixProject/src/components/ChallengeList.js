import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import ChallengeCard from './ChallengeCard';


class ChallengeList extends Component {

    // set state and list view data
    constructor(props) {
        super(props);
        this.onPressInDetail = this.onPressInDetail.bind(this);
        this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
}
    state = { challenge: [], refreshing: false };

    componentWillMount() {
      this.makeRemoteRequest();
    }

    onPressInDetail(title, description, author, currentTime, url, id) {
      this.props.navigation.navigate('ChallengeDetailPage', {
        title: title,
        description: description,
        author: author,
        currentTime: currentTime,
        url: url,
        id: id
      });
    }

    makeRemoteRequest() {
      fetch('http://192.168.10.107:3000/get/challenge', {
        credentials: 'same-origin',
      })
        .then((response) => (response.json()))
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
            this.setState({ challenge: res, refreshing: false });
            console.log(res);
        });
    }

    handleRefresh = () => {
      this.setState({
        refreshing: true
      }, () => {
        this.makeRemoteRequest();
      });
    }

    renderItem = ({ item }) => {
      return (
          <TouchableOpacity
            onPress={() => this.onPressInDetail(item.title,
              item.description, item.author, item.currentTime,
              item.url, item._id)}
          >
            <ChallengeCard
              challenge={item}
              onPress={() => this.props.onPress(item._id)}
            />
          </TouchableOpacity>
          );
        }
    //     <View>
    //     <TouchableOpacity onPress={this.onPressInDetail}>
    //       <ChallengeCard
    //         title='正方形打野'
    //         description='大司马，很多皮皮虾攻击你的正方形打野是玄学。但是我们作为你的学生都理解正方形打野是有科学依据的。作为这种流派的创始人，能不能请你谈谈这种打法诞生的前世今生'
    //         image={false}
    //         timeLeft='2天1小时'
    //         sponsor='15.7k'
    //         comment='13'
    //         time='2周前'
    //         username='理小查'
    //       />
    //     </TouchableOpacity>
    //     <ChallengeCard
    //       title='追迪丽热巴'
    //       description='大司马，你可以去追迪丽热巴吗'
    //       image={true}
    //       timeLeft='打扰了'
    //       sponsor='66.6k'
    //       comment='268'
    //       time='1个月前'
    //       username='CreidX'
    //       reject={true}
    //     />
    //     <ChallengeCard
    //       title='一起喵喵喵'
    //       description='马老师，你会用芜湖话唱我们一起喵喵喵吗'
    //       image={false}
    //       timeLeft='1小时'
    //       sponsor='5k'
    //       comment='932'
    //       time='1小时前'
    //       username='sleepysushi'
    //       liked={true}
    //     />
    //     <ChallengeCard
    //       title='单手吃鸡'
    //       description='马老师，你可以单手玩一盘吃鸡吗？我赌你撑不过五分钟'
    //       image={false}
    //       timeLeft='12天10小时'
    //       sponsor='50'
    //       comment='16'
    //       time='5分钟前'
    //       username='zz'
    //     />
    //     </View>
    //   );
    // }

    render() {
      console.log('ChallengeList');
      console.log(this.state.challenge);
      return (
        <View>
        <FlatList
          data={this.state.challenge}
          renderItem={this.renderItem}
          extraData={this.state}
          keyExtractor={item => item.title}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
        </View>
      );
}
}


export default ChallengeList;
