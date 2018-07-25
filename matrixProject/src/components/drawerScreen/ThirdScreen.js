import React from 'react';
import  {Text, View , Button, Image} from 'react-native';
import { DrawerActions } from 'react-navigation';

export default class ThirdScreen extends React.Component {
    // static navigationOptions = {
    //     tabBarLabel:'screen 2',
    //     drawerIcon :()=>{
    //         return (
    //             <View>
    //                 <Text>检查更新</Text>
    //             </View>
    //         );
    //     }
    // };

    render(){
        return(
            <View style={{
                flex:1,justifyContent:'center',alignItems:'center'
            }}>
                <Text style={{fontSize: 30, color: 'green'}}>screen 2</Text>
                <Button onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())
                }
                        title="openDrawer Navigator"/>
            </View>
        )
    }
}
