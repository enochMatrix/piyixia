import React from 'react';
import { TabNavigator,StackNavigator } from 'react-navigation';
import Router from './Router';
import HomePage from './components/HomePage';
import ChallengePage from './components/ChallengePage';
import ChallengeDetailPage from './components/ChallengeDetailPage';
import JoinedChallenge from "./components/JoinedChallenge";


const ChallengePageStack = StackNavigator({
    ChallengePage:{
        screen: ChallengePage,
        navigationOptions:{
        title:'challengePage'
        }
    },
    ChallengeDetailPage: {
        screen: ChallengeDetailPage,
        title:'challengeDetailPage'
        //not exist???
    },
    JoinedChallenge: {
        screen: JoinedChallenge,
        title:'challengeJoinedPage'}
});


const Router2 = TabNavigator(
  {
    HomePage: HomePage,
    Router: Router,
      ChallengePage: ChallengePageStack,
  },
  {
      swipeEnabled: true,
      tabBarOptions: {
       tabBarVisible: false,
       style: {
         backgroundColor: 'transparent',
         position: 'absolute',
        }
   },
  },
);

export default Router2;
