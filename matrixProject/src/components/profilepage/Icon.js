import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = { // 弹出框配置
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class IconChange extends Component {

  constructor(prop) {
    super();
    this.state = {
        uri: prop.avatar
    };
    this._imagePicker = this._imagePicker.bind(this);
  }

  _imagePicker() {
      ImagePicker.showImagePicker(options, (res) => {
        const formData = new FormData(); //如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
        const file = {
          uri: res.uri,
          type: 'multipart/form-data',
          name: 'image.png'
        };   //这里的key(uri和type和name)不能改变,
        formData.append('files', file);   //这里的files就是后台需要的key

        fetch('http://192.168.10.107:3000/add/avatar', {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data'
            },
          body: formData
            })
          .then((response) => (response.text()))
          .catch((error) => {
            console.log(error);
          })
          .then((resp) => {
            console.log(resp);
            this.props.update();
      });
      //     if (res.didCancel) {  // 返回
      //         return;
      //     } else {
      //         let source;  // 保存选中的图片
      //         source = {uri: 'data:image/jpeg;base64,' + res.data};
      //
      //         if (Platform.OS === 'android') {
      //             source = { uri: res.uri };
      //         } else {
      //             source = { uri: res.uri.replace('file://','') };
      //         }
      //
      //         this.setState({
      //             avatarSource: source
      //         });
      //     }
      // })
      //console.log(res);
    });
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={this._imagePicker}>
        <Image
          source={{ url: this.props.avatar }}
          style={{ width: 85, height: 85, borderRadius: 46 }}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  icon: {
    backgroundColor: 'white',
    height: 85,
    width: 85,
    borderRadius: 57,
    marginBottom: 5
  },
};

export default IconChange;
