import { DrawerNavigator } from 'react-navigation';
import FirstScreen1 from './components/FirstScreen';
import SecondScreen2 from './components/SecondScreen';
import ThirdScreen from './components/ThirdScreen';
import FourthScreen from './components/FourthScreen';

const AppDrawer = DrawerNavigator({
        FirstScreen: {
            screen: FirstScreen1,
            navigationOptions: () => ({
                title: `设置`,
                headerBackTitle: null,
                drawerIcon: '',
            }),
        },
        SecondScreen: {
            screen: SecondScreen2,
            navigationOptions: () => ({
                title: `检查更新`,
                headerBackTitle: null
            }),
        },
        ThirdScreen: {
            screen: ThirdScreen,
            navigationOptions: () => ({
                title: `通用条款`,
                headerBackTitle: null,
            }),
        },
        FourthScreen: {
            screen: FourthScreen,
            navigationOptions: () => ({
                title: `退出登陆`,
                headerBackTitle: null,
            }),
        },
      },
       {
        initialRouteName: 'FirstScreen',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: false,
        tabBarPosition: 'bottom',
      }
);

export default AppDrawer;
