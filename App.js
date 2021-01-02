
import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// screen import
import HomeScreen from './screen/homescreen';
import LoginScreen from './screen/login';
import TipsScreen from './screen/tips';
import BackupScreen from './screen/backup_seed_wallet';
import ConfirmScreen from './screen/confirm_seed';
import SeedScreen from './screen/seed';
import WalletScreen from './screen/wallet';
import HookScreen from './screen/hook';
import ReceiveScreen from './screen/receive';
import SendScreen from './screen/send';
// import RewardScreen from './screen/reward.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function Home() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      // headerShown:false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name == "Home") {
          iconName = focused ? "ios-information-circle" : 'ios-information-circle-outline';
        } else {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" options={{
        // headerShown:false
      }} component={HomeScreen} />
      <Tab.Screen name="Messages" component={BackupScreen} />
    </Tab.Navigator>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* 
        <Stack.Screen options={{
            headerShown: false
          }} name="Hook" component={HookScreen} /> */}



          <Stack.Screen options={{
            headerShown: false
          }} name="Login" component={LoginScreen} />

          <Stack.Screen options={{
            headerShown: false
          }} name="Tips" component={TipsScreen} />

          <Stack.Screen options={{
            headerShown: false
          }} name="Backup" component={BackupScreen} />

          <Stack.Screen options={{
            headerShown: false
          }} name="Confirm" component={ConfirmScreen} />

          <Stack.Screen options={{
            headerShown: false
          }} name="Seed" component={SeedScreen} />

          <Stack.Screen options={{
            headerShown: false
          }} name="Home" component={HomeScreen} />

          <Stack.Screen options={{
            headerShown: false
          }} name="Wallet" component={WalletScreen} />

          <Stack.Screen options={{
            headerShown: false
          }} name="Receive" component={ReceiveScreen} />

          <Stack.Screen options={{
            headerShown: false
          }} name="Send" component={SendScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
