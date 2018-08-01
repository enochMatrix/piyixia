import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';

class CreateComment extends Component {

  constructor(props) {
      super(props);
      if (this.send !== null) {
      this.send = this.send.bind(this);
      }
      this.state = {
        content: '',
      };
}
    send() {
      const { cid } = this.props.navigation.state.params;
      fetch('http://192.168.0.16:3000/add/challengeComment/' + cid, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          content: this.state.content
        })
          })
        .then((response) => (response.text()))
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
          console.log(res);
    });
    }


    render() {
      return (
        <View style={{ flex:1, backgroundColor: 'white' }}>
          <TextInput
             style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
             onChangeText={(text) => this.setState({ content: text })}
             value={this.state.text}
          />
          <Button
            onPress={this.send}
            title="发送"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          </View>
      );
}
}

const styles = {

};

export default CreateComment;
