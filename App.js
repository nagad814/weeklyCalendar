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

var moment = require('moment');

// set starting day of the week as number
// 0 is sunday
const startDay = 0
const today = new Date();
// Get first day of the week based on startday
var firstOfWeek = moment(today).startOf('week').weekday(startDay);


// Create a header array
var headerArr = new Array();

for(i=0; i < 7; i++ ){
  let d = moment.duration(i, 'd');
  let timeObj = firstOfWeek.clone().add(d)
  headerArr.push({timeObj, weekDay: timeObj.day(), dayNum:timeObj.date(),dayName: timeObj.format("ddd"), monthName: timeObj.format("MMM") });
}

const {width, height} = Dimensions.get("window");
let direction = width<height;

let activeHeaderArr = headerArr.slice().filter(result => result.weekDay !== 0 && result.weekDay !== 6)


// Create weekHour array wiht 7*24 items

var weekHourArr = new Array();

for(i=0; i < 168; i++ ){
  let h = moment.duration(i, 'h');
  let timeObj = firstOfWeek.clone().add(h)
  weekHourArr.push({timeObj, MonthDay:timeObj.date(), weekDay: timeObj.day(), hour: timeObj.hours()});
}

// Create bodyArr which renders row

let bodyArr = new Array();

  // loop 0 to 23 to get hour rows
for(i= 0; i < 23; i++){
 let tempArr = weekHourArr.filter(result => result.hour === i);
 bodyArr.push({id:''+i, data:tempArr});
}






var date = new Date(new Date().setHours(0,0,0,0));
var calendar = require('calendar-month-array');
const weeks = calendar(date , {weekStartDay: 6})



const data = [ {id: 1, title:'ant', day: "Sunday" }, {id: 2, title:'bison', day: "Monday" }, {id: 3, title:'camel', day: "Tuesday" },  {id: 4, title:'dear', day: "Wednesday" }, {id: 5, title:'elephant', day: "Thursday" }, {id: 6, title:'fox', day: "Friday" }, {id: 7, title:'girrafe', day: "Saturday" }];


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

    console.log(bodyArr);
    Dimensions.addEventListener('change', this._handleChange);

  }

  componentWillUnmount() {
    Dimensions.addEventListener('change', this._handleChange);
  }

  _handleChange = ({window}) => {
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.setState(prevState => ({width:window.width,height:window.height ,direction : window.width<window.height}));
  }

  _keyExtractor = (item, index) => item.id;

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
    const data = result.filter(result => result.weekDay != 0 && result.weekDay != 6 );
    if(this.state.direction){
      // console.log(data);
      return (
        <Row data={data} id={data.MonthDay} direction={this.state.direction} 
        width={this.state.width} height={this.state.height} onPress={() => alert("week cell")}/>
      )
    } else{
      // console.log(result);
      return (
        <Row data={result} id={result.MonthDay} direction={this.state.direction} 
        width={this.state.width} height={this.state.height} onPress={() => alert("week cell")}/>
      )
    }
  }

  render() {
    console.log(this.state);
   const {width, height} = this.state;
    return (
      <View style={styles.container}>
        {
          this.state.direction?
          (
            <Row data={activeHeaderArr} id={"top"} direction={this.state.direction} 
            width={this.state.width} height={this.state.height} onPress={() => console.log("okay")}/>
          )
          : 
          (
            <Row data={headerArr} id={"top"} direction={this.state.direction} 
            width={this.state.width} height={this.state.height} onPress={() => console.log("okay")}/>
          )
        }
        <FlatList
        data={bodyArr}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderItem}
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
