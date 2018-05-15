import {Navigation} from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons';



const startTabs = ()=>{

    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30),
        Icon.getImageSource("ios-menu",30)
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
        drawer:{
                left:{
                    screen:"awesome-places.SideDrawerScreen"
                }
        }

        })

    });



};

export default startTabs;
