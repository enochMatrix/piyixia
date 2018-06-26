import React from 'react';
import { TabNavigator,StackNavigator } from 'react-navigation';
import HomePage from './components/HomePage';
import ChallengePage from './components/ChallengePage';
import ChallengeDetailPage from './components/ChallengeDetailPage';
import JoinedChallenge from "./components/JoinedChallenge";
import QuestionPage from './components/QuestionPage';
import StartPage from './components/StartPage';
import ScoreBoard from './components/ScoreBoard';
import CommentPage from './components/commentPage';

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
         title: `智力问答`,
         headerStyle:{ backgroundColor: 'white'},
         headerBackTitle: null
     }),
  },
  scoreboard: {
    screen: ScoreBoard,
    navigationOptions: () => ({
        title: '积分榜',
        headerStyle:{ backgroundColor: 'white'},
        headerBackTitle: null
    }),
  },
});

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
        title:'challengeJoinedPage'},
    commentPage:{
        screen: CommentPage,
        title:'commentPage'
    }
});


const Router2 = TabNavigator(
  {
    Router: Router,
    HomePage: HomePage,
    ChallengePage: ChallengePageStack,
  },
  {
      initialRouteName: 'HomePage',
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
