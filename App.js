import React from 'react';
import SignupLoginScreen from './Screens/SignupLoginScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export default function App() {
  return (
    <AppContainer/>
  );
}

// const TabNavigator = createBottomTabNavigator({
//   GoodsRequest : {screen:GoodRequestScreen},
//   GoodsDonate : {screen:GoodDonateScreen},
// })

const switchNavigator = createSwitchNavigator({
  Login : {screen : SignupLoginScreen},
  Drawer : {screen : AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator)

