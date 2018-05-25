import React from 'react';
import { StackNavigator } from 'react-navigation';
import QuestionPage from './components/QuestionPage';
import StartPage from './components/StartPage';

export const Router = StackNavigator({
  start: {
     screen: StartPage,
  },
  questionpage: {
     screen: QuestionPage,
  },
});
