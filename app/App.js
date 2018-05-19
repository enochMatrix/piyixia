import {Navigation} from 'react-native-navigation';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/sharePlace/sharePlace';
import FindPlaceScreen from './src/screens/findPlace/findPlace';
import PlaceDetailScreen from './src/screens/placeDetail/placeDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawe';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

//Rrhister Screens

Navigation.registerComponent(
    "awesome-places.AuthScreen",
    ()=>AuthScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.SharePlaceScreen",
    ()=>SharePlaceScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.FindPlaceScreen",
    ()=>FindPlaceScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.PlaceDetailScreen",
    ()=>PlaceDetailScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.SideDrawerScreen",
    ()=>SideDrawer
);
//register the sideDrawerScreen
//we should have this to show this when we put mouse on left of screen
//but in android system we cannot do this, so we should add a button to triggle the sideDrawer
//the navigatorButtons i have put it in the startMainTabs
//navigatorButtons is a child of tab

Navigation.startSingleScreenApp(
    {
        screen:{
            screen:"awesome-places.AuthScreen",
            title:"Login"
        }
    }
);

