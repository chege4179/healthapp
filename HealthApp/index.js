/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";

AppRegistry.registerComponent(appName, () => App);
messaging().setBackgroundMessageHandler((remoteMessage) => {
    console.log('MESSAGE HANDLED IN THE BACKGROUND')
})
