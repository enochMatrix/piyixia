import React from 'react';
import { TabNavigator } from 'react-navigation';
import Router from './Router';
import HomePage from './components/HomePage';

const Router2 = TabNavigator(
  {
    HomePage: HomePage,
    Router: Router
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
