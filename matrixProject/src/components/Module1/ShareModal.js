import React, { Component } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import { Wechat, Weibo } from '../icons';

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.shareModal = this.shareModal.bind(this);
    this.state = {
      shareModal: false,
  };
}
  componentWillReceiveProps(nextProps) {
    if (this.props.display !== nextProps.display) {
    this.setState({
      shareModal: true
    });
  }
  }

  shouldComponentUpdate(nextProps,nextState) {
    if (this.state !== nextState){
      return true;
    }
    return false;
  }

  //To open or close share modal
  shareModal() {
    this.setState({ shareModal: false });
  }

  render() {
    console.log('renderShareModal');
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.shareModal}
      >
        <View style={styles.modalContainer}>
          <Text style={{ fontSize: 20, margin: 10 }}>
            Share to
          </Text>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Wechat />
            <Weibo />
          </View>
          <Button
            style={{ margin: 10 }}
            onPress={this.shareModal}
            title="Close"
          />
        </View>
      </Modal>
    );
  }
}

const styles = {
  modalContainer: {
    marginTop: 500,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
};

export default ShareModal;
