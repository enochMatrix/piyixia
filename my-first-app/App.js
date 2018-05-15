import {Navigation} from 'react-native-navigation';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

// Add Redux to screens
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
const store = configureStore();
//

// Register Screens by ID which was assigned


Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);

// Start a App

Navigation.startSingleScreenApp({
    screen: {
        screen: "awesome-places.AuthScreen",
        title: "Login"
    }
});