/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Cell from "./src/grid/row/cell";
import Row from "./src/grid/row";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const data = [ {id: 1, title:'ant', day: "Sunday" }, {id: 2, title:'bison', day: "Monday" }, {id: 3, title:'camel', day: "Tuesday" },  {id: 4, title:'dear', day: "Wednesday" }, {id: 5, title:'elephant', day: "Thursday" }, {id: 6, title:'fox', day: "Friday" }, {id: 7, title:'girrafe', day: "Saturday" }];
const direction = "horizontal";

export default class App extends Component {

  render() {
    console.log(data);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        {/* <Cell key={100} onPress={()=>alert("on press cell")}>
        <View style={{backgroundColor:"pink"}}>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        </View>
        </Cell> */}
        <Row data={data} id={10} direction={direction} onPress={() => alert("week cell")}/>
        <Row data={data} id={10} direction={direction} onPress={() => alert("week cell")}/>
        <Row data={data} id={10} direction={direction} onPress={() => alert("week cell")}/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
