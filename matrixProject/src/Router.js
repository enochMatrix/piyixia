import React from 'react';
import { StackNavigator } from 'react-navigation';
import QuestionPage from './components/QuestionPage';
import StartPage from './components/StartPage';
import FinishPage from './components/FinishPage';
import ScoreBoard from './components/ScoreBoard';

export const Router = StackNavigator({
  start: {
     screen: StartPage,
  },
  questionpage: {
     screen: QuestionPage,
  },
  scoreboard: {
    screen: ScoreBoard,
  },
  finishpage: {
    screen: FinishPage,
  },
});
