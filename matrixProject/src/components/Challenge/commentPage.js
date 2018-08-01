import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import AComment from './AComment';

class commentPage extends Component {
//构造函数
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        // 添加一个按钮
        // const myButton = (
        //     <Icon.Button name="facebook" backgroundColor="#3b5998">
        //         Login with Facebook
        //     </Icon.Button>
        // );

        return (
                <View>
                  <View style={styles.center}>
                    <Text>评论268</Text>
                  </View>
                  <View style={styles.line} />

                  <AComment />
                  <AComment />

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
  }
}

export default commentPage;
