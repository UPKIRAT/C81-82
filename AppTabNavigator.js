import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import GoodDonateScreen from '../Screens/GoodsDonate';
import GoodRequestScreen from '../Screens/GoodsRequest';



export const AppTabNavigator = createBottomTabNavigator({
  GoodDonateScreen : {
    screen: GoodDonateScreen,
    navigationOptions :{
      // tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Exchange Goods",
    }
  },
  GoodsRequest: {
    screen: GoodRequestScreen,
    navigationOptions :{
      // tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Request Goods",
    }
  }
});
