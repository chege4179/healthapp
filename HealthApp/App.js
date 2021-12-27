/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Provider} from "react-redux";
import store from "./src/ReduxStore/Store";
import MainApp from "./src/MainApp";

const App = () => {
  return (
      <Provider store={store}>
        <MainApp/>
      </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  }
})
export default App;
