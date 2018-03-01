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
  View,
  Dimensions,
  FlatList,
  LayoutAnimation,
  UIManager
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
const {width, height} = Dimensions.get("window");
let direction = width<height;

const flatListData = [{key: "1", data}, {key: "2", data}, {key: "3", data}, {key: "4", data}, {key: "5", data}, 
  {key: "6", data},{key: "7", data},{key: "8", data},{key: "9", data},{key: "10", data},{key:"11", data},
  {key: "12", data},{key: "13", data},{key: "14", data},{key: "15", data},{key: "16", data},{key: "17", data},
  {key: "18", data},{key: "19", data},{key: "20", data},{key: "21", data},{key: "22", data},{key: "23", data}, {key: "24", data}]

const CustomLayoutSpring = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

export default class App extends Component {
  constructor(props){
  super(props);
  this.state = { direction, width, height }
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  componentDidMount(){
    Dimensions.addEventListener('change', this._handleChange);
  }

  componentWillUnmount() {
    Dimensions.addEventListener('change', this._handleChange);
  }

  _handleChange = (change) => {
      // console.log(change.window);
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.setState(prevState => ({width:change.window.width,height:change.window.height ,direction : change.window.width<change.window.height}));
  }

  _keyExtractor = (item, index) => item.key;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderItem =({item}) =>{
    const result = item.data.slice();
    const data = result.filter(result => result.day != "Sunday" && result.day != "Saturday" );
    if(this.state.direction){
      // console.log(data);
      return (
        <Row data={data} id={data.key} direction={this.state.direction} 
        width={this.state.width} height={this.state.height} onPress={() => alert("week cell")}/>
      )
    } else{
      // console.log(result);
      return (
        <Row data={result} id={result.key} direction={this.state.direction} 
        width={this.state.width} height={this.state.height} onPress={() => alert("week cell")}/>
      )
    }
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <FlatList
        data={flatListData}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
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
