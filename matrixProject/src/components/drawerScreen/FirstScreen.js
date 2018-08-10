import React from 'react';
import  {Text, View , Button, Image, List, FlatList, ListItem,StyleSheet} from 'react-native';
import {DrawerActions} from "react-navigation";
import { Header, Left, Icon, Right} from 'native-base';
import Swipeout from 'react-native-swipeout';



export default class FirstScreen extends React.Component {
    // static navigationOptions= {
    //     // title:'qqq',
    //     tabBarLabel:'screen 1',
    //     drawerIcon :()=>{
    //         return (
    //             <View>
    //                 <Text>设置</Text>
    //             </View>
    //         );
    //     }
    // };
    state={
        transaction: null
    };

    componentWillMount() {
        // GET ALL getUserTransaction
        fetch('http://192.168.10.107:3000/get/transaction', {
            credentials: 'same-origin',
        })
            .then((response) => (response.json()))
            .catch((error) => {
                console.log(error);
            })
            .then((res) => {
                console.log('User transcation Info',res['0']['transaction']);
                this.setState({transaction : res['0']['transaction'] });
            });
        //Pause video when changing to other tabs

    }

    deleteItem =(id) =>{
        const item= this.state.data;
        item.splice(id,1);
        this.setState({
            transcation:item
        })
    };

    _renderItem = ({item,index}) => {
      console.log(item);
      return (
        <Swipeout right={[{text:'Delete',
            backgroundColor:'red',
        onPress:()=>{this.deleteItem(index)}}]}
                  >
        <View >
        <Text style={styles.bubble}>
            {item.usage}
        </Text>
            <Text style={styles.time}>
                {item.date}
            </Text>
        </View>
        </Swipeout>
);
}
    _keyExtractor = (item, index) => item.key;


    render(){
      console.log()
        return(
            <View>


            <View style={{height:'20%', backgroundColor:'grey', borderBottomRightRadius: 10000, borderBottomLeftRadius:10000}}>
                        <Icon name='menu'
                              onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}/>

                <Text>头像</Text>
            </View>

                {/*<Swipeout right={[{ text: 'Delete'}]}>*/}
                    {/*<View>*/}
                        {/*<Text>Swipe me left</Text>*/}
                    {/*</View>*/}
                {/*</Swipeout>*/}

                <View style={styles.List} >

<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                {/*<Icon name='chatboxes' style={{width: '10%'}}/>*/}
                <View>
            <Text style={{width: '50%',}}>消息列表</Text>
                </View>



<View>
                <Text style={{width: '50%',}}>删除全部</Text>
                {/*<Icon name='pint' style={{width: '10%'}}/>*/}
</View>
</View>

           </View>
        <View style={styles.container}>
            <View >
              <FlatList data={this.state.transaction}
              renderItem = {this._renderItem}

              keyExtractor={this._keyExtractor}
              />
            </View>


            </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    bubble: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10,
        borderRadius: 6,

    },
    time: {
        textAlign: 'right',
        color: '#bababa',
        fontSize: 12,
    },
    List:{
        height: '5%',
        borderBottomWidth :3 ,
        borderBottomColor: '#000',
        marginBottom: 8,
        paddingBottom:1,
        display:'flex',
        flexDirection: 'row',

    }

})
