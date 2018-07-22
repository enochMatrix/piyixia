import React, { Component } from 'react';
import { View, Text } from 'react-native';

class commentPage extends Component {
//构造函数
    constructor(props) {
        super(props);
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
                  <View style={styles.container}>
                    <View style={{ height: 30, width: 30, backgroundColor: 'gray', borderRadius: 12 }} />

                    <View style={styles.container2}>
                      <Text style={{ paddingBottom: 4 }}>用户名乙</Text>
                      <View>
                        <Text>
                          评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                        </Text>
                      </View>
                      <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                        <Text>7-15 18:30</Text>
                      </View>
                      <View style={{ flexDirection: 'row', position:'absolute',right:5,bottom:10 }}>
                        <View><Text>评论  </Text></View>
                        <View><Text>皮32</Text></View>
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
    margin: 14
  },
  container2: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 13,
    paddingRight: 15
  }
};

export default commentPage;
