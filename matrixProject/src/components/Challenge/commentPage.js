import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import AComment from './AComment';

class commentPage extends Component {
//构造函数
    constructor(props) {
        super(props);
        this.state = ({
          comment: ''
        });
    }

    componentWillMount() {
      fetch('http://192.168.10.107:3000/get/challengeComment/' + this.props.cid, {
        credentials: 'same-origin',
      })
        .then((response) => (response.json()))
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
            this.setState({ comment: res[0].comment });
            console.log(res[0].comment);
        });
    }

    renderItem = ({ item }) => {
      return (
          <AComment
            user={item.author}
            date={item.date}
            content={item.content}
          />
          );
        }

    render() {
      console.log(this.state.comment);
        return (
                <View>
                  <View style={styles.center}>
                    <Text>评论268</Text>
                  </View>
                  <View style={styles.line} />
                  <FlatList
                    data={this.state.comment}
                    renderItem={this.renderItem}
                    extraData={this.state}
                    //keyExtractor={item => item.title}
                    //refreshing={this.state.refreshing}
                    //onRefresh={this.handleRefresh}
                  />
                </View>
        );
}
}

const styles = {
  line: {
    backgroundColor: 'gray',
    height: 0.5,
    marginHorizontal: '1%'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
};

export default commentPage;
