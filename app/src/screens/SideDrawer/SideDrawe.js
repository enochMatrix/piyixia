import React, {Component}  from 'react';
import  {View, Text, Dimensions,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
 class SideDrawer extends Component {
     render(){

         return (
             <View style={[styles.container,{width:Dimensions.get("window").width *0.8}
             ]}>
                 <TouchableOpacity >
                     <View style={styles.drawerItem}>
                         <Icon name={Platform.OS==='android'?"md-log-out":"ios-log-out"}
                         //判断操作系统 用不同的ICON，import Platform from 'react-native'
                               size={30}
                               color='#aaa'
                               style={styles.drawerItemIcon}/>

                 <Text>SignOut</Text>
                     </View>
                 </TouchableOpacity>
             </View>
         )
     }
 };
 const styles =StyleSheet.create({
     container:{
         marginTop:30,
         backgroundColor: "white",
         flex:1
     },
     drawerItem:{
         flexDirection:"row",
         alignItems:"center",
         padding:10,
         backgroundColor:"#eee"
     },
     drawerItemIcon:{
         marginRight: 10
     }
 })
 export default SideDrawer;