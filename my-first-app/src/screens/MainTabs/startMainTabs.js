import { Navigation } from 'react-native-navigation';

const startTabs = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                screen: "awesome-places.SharePlaceScreen",
                label: "Share Place",
                title: "Share Place"
            },
            {
                screen: "awesome-places.FindPlaceScreen",
                label: "Find Place",
                title: "Find Place"
            }
        ]
    });
};

export default startTabs;
