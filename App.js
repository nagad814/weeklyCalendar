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
  if(timeObj.isBetween('2018-03-05', '2010-03-06')){
  weekHourArr.push({timeObj, MonthDay:timeObj.date(), weekDay: timeObj.day(), hour: timeObj.hours()});        
  } else{
  weekHourArr.push({timeObj, MonthDay:timeObj.date(), weekDay: timeObj.day(), hour: timeObj.hours()});    
  }
}

// Create bodyArr which renders row

let bodyArr = new Array();

  // loop 0 to 23 to get hour rows
for(i= 0; i < 24; i++){
 let tempArr = weekHourArr.filter(result => result.hour === i);
 let h = moment.duration(i, 'h');
 let headTitle = firstOfWeek.clone().add(h).format("hh a")
 bodyArr.push({id:''+i, headTitle,  data:tempArr});
}

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
      return (
        <Row data={data} id={item.headTitle} direction={this.state.direction} header={false}
        width={this.state.width} height={this.state.height} onPress={() => alert("week cell")}/>
      )
    } else{
      return (
        <Row data={result} id={item.headTitle} direction={this.state.direction} header={false}
        width={this.state.width} height={this.state.height} onPress={() => alert("week cell")}/>
      )
    }
  }

  render() {
    // console.log(this.state);
   const {width, height} = this.state;
    return (
      <View style={styles.container}>
      <View style={{elevation:4}}>
        {
          this.state.direction?
          (
            <Row data={activeHeaderArr} id={"#"} direction={this.state.direction} header={true}
            width={this.state.width} height={this.state.height} onPress={() => console.log("okay")}/>
          )
          : 
          (
            <Row data={headerArr} id={"#"} direction={this.state.direction} header={true}
            width={this.state.width} height={this.state.height} onPress={() => console.log("okay")}/>
          )
        }
      </View>
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
