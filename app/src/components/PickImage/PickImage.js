import React,{Component} from 'react';
import {View,Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';


class PickImage extends Component {

    state = {
        pickedImage: null
    };

    pickImageHandler = () => {
        // maxwidth maxheight limit the size of the photo
        ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, response => {
            if(response.didCancel) {
                console.log('User Cancelled!');
            } else if (response.error){
                console.log("Error", response.error);
            } else {
                this.setState({
                    pickedImage: {uri: response.uri}
                });

                // response.data is a 64 encoded string used to representive the image, used to send to the server,
                // u can use noData:true in th showImagePicker showImagePicker(...noData: true) to save performance
                this.props.onImagePick({uri: response.uri, base64: response.data});
            }
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage}/>
                </View>
                <View style={styles.button}>
                    <Button title="Pick Image" onPress={this.pickImageHandler}/>
                </View>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholder: {
        borderWidth:1,
        borderColor: 'black',
        backgroundColor: '#eee',
        margin: 8,
        width: "80%",
        height: 150
    },
    button: {
        margin:8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

export default PickImage;



