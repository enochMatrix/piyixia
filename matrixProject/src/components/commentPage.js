import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';




class commentPage extends Component {
//构造函数
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render (){
        // 添加一个按钮
        // const myButton = (
        //     <Icon.Button name="facebook" backgroundColor="#3b5998">
        //         Login with Facebook
        //     </Icon.Button>
        // );
        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: '<p>Hello World!</p >',
        };
        return(
                <View style={styles.flex}>
                    <TextInput
                        style={styles.input}
                        returnKeyType="search"
                        placeholder="Detail"
                        onChangeText={(text) => this.setState({text})}
                        />
                </View>


        )

}
}
const styles = StyleSheet.create({
    input:{
        height:150,
        borderWidth:1,
        marginLeft: 5,
        paddingLeft:5,
        borderColor: '#ccc',
        borderRadius: 4
    },
    flex:{
        flex: 1,
    },
});
export default commentPage;
