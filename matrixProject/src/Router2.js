import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import HomePage from './components/HomePage';
import ChallengePage from './components/ChallengePage';
import CreateChallenge from './components/Challenge/CreateChallenge';
import ChallengeDetailPage from './components/ChallengeDetailPage';
import CreateComment from './components/CreateComment';
import QuestionPage from './components/QuestionPage';
import StartPage from './components/StartPage';
import ScoreBoard from './components/ScoreBoard';
import LoginPage from './LoginPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfilePage from './components/ProfilePage';

const Router = StackNavigator({
  start: {
     screen: StartPage,
     navigationOptions: () => ({
         title: `智力问答`,
         headerStyle:{ backgroundColor: 'white'},
         headerBackTitle: null
     }),
  },
  questionpage: {
     screen: QuestionPage,
     navigationOptions: () => ({
         title: '智力问答',
         headerStyle: { backgroundColor: 'white' },
         headerBackTitle: null
     }),
  },
  scoreboard: {
    screen: ScoreBoard,
    navigationOptions: () => ({
        title: '积分榜',
        headerStyle: { backgroundColor: 'white' },
        headerBackTitle: null
    }),
  },
});

const ProfilePageStack = StackNavigator(
  {
    ProfilePage: { screen: ProfilePage }
  },
    {
      navigationOptions: {
      header: null,
    }
  }
  );

const ChallengePageStack = StackNavigator({
    ChallengePage: {
        screen: ChallengePage,
},
    ProfilePage: ProfilePageStack,
    CreateComment: {
          screen: CreateComment,
          navigationOptions: () => ({
              title: '新建回复',
              headerStyle: { backgroundColor: 'white' },
              headerBackTitle: null
          }),
        },
    CreateChallenge: {
      screen: CreateChallenge,
      navigationOptions: () => ({
          title: '新建挑战',
          headerStyle: { backgroundColor: 'white' },
          headerBackTitle: null
      }),
    },
    ChallengeDetailPage: {
      screen: ChallengeDetailPage,
      navigationOptions: () => ({
          title: '挑战内容',
          headerStyle: { backgroundColor: 'white' },
          headerBackTitle: null
      }),
    },
});

const Router2 = TabNavigator(
  {
  // Router: Router,
  // HomePage: HomePage,
  ChallengePageStack: ChallengePageStack,
  },
  {
    //  initialRouteName: 'HomePage',
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

const RootStack = StackNavigator(
  {
    LoginPage: { screen: LoginPage },
    Home: { screen: Router2 }
  },
  {
    navigationOptions: {
    header: null,
}
  }
);

export default RootStack;
