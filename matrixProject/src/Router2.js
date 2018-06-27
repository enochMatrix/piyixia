import React from 'react';
import { TabNavigator,StackNavigator } from 'react-navigation';
import HomePage from './components/HomePage';
import ChallengePage from './components/ChallengePage';
import ChallengeDetailPage from './components/ChallengeDetailPage';
import JoinedChallenge from "./components/JoinedChallenge";
import CommentList from './components/CommentList';
import QuestionPage from './components/QuestionPage';
import StartPage from './components/StartPage';
import ScoreBoard from './components/ScoreBoard';
import DiamondControls from './components/common/DiamondControls'

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
    ChallengePage: {screen: ChallengePage},
    ChallengeDetailPage: { screen: ChallengeDetailPage},
    JoinedChallenge: {screen: JoinedChallenge},
    CommentList: {screen: CommentList},
    DiamondControls: {screen: DiamondControls}
});


const Router2 = TabNavigator(
  {
    HomePage: HomePage,
    Router: Router,
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
