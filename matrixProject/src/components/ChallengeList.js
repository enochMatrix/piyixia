import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import ChallengeCard from './ChallengeCard';


class ChallengeList extends Component {

    // set state and list view data
    constructor(props) {
        super(props);
}

    renderItem() {
      return (
        <View>
        <TouchableOpacity onPressIn={this.props.onPress}>
          <ChallengeCard
            title='正方形打野'
            description='大司马，很多皮皮虾攻击你的正方形打野是玄学。但是我们作为你的学生都理解正方形打野是有科学依据的。作为这种流派的创始人，能不能请你谈谈这种打法诞生的前世今生'
            image={false}
            timeLeft='2天1小时'
            sponsor='15.7k'
            comment='13'
            time='2周前'
            username='理小查'
          />
        </TouchableOpacity>
        <ChallengeCard
          title='追迪丽热巴'
          description='大司马，你可以去追迪丽热巴吗'
          image={true}
          timeLeft='50分钟'
          sponsor='66.6k'
          comment='268'
          time='1个月前'
          username='CreidX'
        />
        <ChallengeCard
          title='一起喵喵喵'
          description='马老师，你会用芜湖话唱我们一起喵喵喵吗'
          image={false}
          timeLeft='1小时'
          sponsor='5k'
          comment='932'
          time='1小时前'
          username='sleepysushi'
        />
        <ChallengeCard
          title='单手吃鸡'
          description='马老师，你可以单手玩一盘吃鸡吗？我赌你撑不过五分钟'
          image={false}
          timeLeft='12天10小时'
          sponsor='50'
          comment='16'
          time='5分钟前'
          username='zz'
        />
        </View>
      );
    }

    render() {
      return (
        <View>
        <ScrollView>
          {this.renderItem()}
        </ScrollView>
        </View>
      );
}
}


export default ChallengeList;
