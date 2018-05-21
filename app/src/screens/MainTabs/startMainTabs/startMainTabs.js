import {Navigation} from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import  {Platform} from 'react-native';



const startTabs = ()=>{

    Promise.all([
        Icon.getImageSource(Platform.OS==="android"?"md-map":"ios-map", 30),
        //判断不同的操作系统ICON的样式！
        Icon.getImageSource(Platform.OS==="android"?"md-share-alt":"ios-share-alt", 30),
        Icon.getImageSource(Platform.OS==="android"?"md-menu":"ios-menu",30)
    ]).then(source=>{
        Navigation.startTabBasedApp({
            tabs:[
                {
                    screen: "awesome-places.FindPlaceScreen",
                    label:"Find place",
                    title:"Find place",
                    icon:source[0],
                    navigatorButtons:{
                        leftButtons:[{
                            icon:source[2],
                            title: "menu",
                            id:"sideDrawerToggle"
                        }

                        ]
                    }// add a botton in findPlaceScreen to triggle the sidedrawer

                },
                {
                    screen: "awesome-places.SharePlaceScreen",
                    label:"Share place",
                    title:"Share place",
                    icon:source[1],
                    navigatorButtons:{
                        leftButtons:[{
                            icon:source[2],
                            title: "menu",
                            id:"sideDrawerToggle"
                        }

                        ]
                    }

                }

            ],
            tabStyle:{
              tabBarSelectedButtonColor:"orange"
            },
            //ios 改变TAB样式的方法
        drawer:{
                left:{
                    screen:"awesome-places.SideDrawerScreen"
                }
        },
            appStyle:{
                tabBarSelectedButtonColor:"orange"
            },
            //Android 改变TAB样式的方法

        })

    });



};

export default startTabs;
