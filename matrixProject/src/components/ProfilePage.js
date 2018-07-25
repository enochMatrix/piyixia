import React, { Component } from 'react';

import AppDrawer from './SideDrawer';

class ProfilePage extends Component {
    static navigationOptions ={ header: null };

    // state={
    //     showSideDrawer:false
    // };
    // //
    // showSideDrawer =()=>{
    //     this.setState({showSideDrawer:!this.state.showSideDrawer})
    //     // this.props.navigation.openDrawer();
    // };

    render() {
        // let sideDrawer=null;
        // if(this.state.showSideDrawer) {
        //     sideDrawer=(
        //        <SideDrawer />
        //     )
        // }
        console.log('ProfilePage');
        return (
            <AppDrawer />

    );
    }

}
export default ProfilePage;

// const AppDrawer = DrawerNavigator({
//     FirstScreen : {
//         screen:FirstScreen1,
//         navigationOptions: () => ({
//             title: `设置`,
//             headerBackTitle: null,
//             drawerIcon:'',
//
//         }),
//
//     },
//     SecondScreen : {
//         screen:SecondScreen2,
//         navigationOptions: () => ({
//             title: `检查更新`,
//             headerBackTitle: null
//         }),
//     },
//         ThirdScreen : {
//             screen:ThirdScreen,
//             navigationOptions: () => ({
//                 title: `通用条款`,
//                 headerBackTitle: null,
//
//
//             }),
//
//         },
//         FourthScreen : {
//             screen:FourthScreen,
//             navigationOptions: () => ({
//                 title: `退出登陆`,
//                 headerBackTitle: null,
//
//
//             }),
//
//         },},
//     {initialRouteName: 'FirstScreen',
//         swipeEnabled: true,
//         animationEnabled: true,
//         lazy: false,
//         tabBarPosition:'bottom',}
//
//
// );
