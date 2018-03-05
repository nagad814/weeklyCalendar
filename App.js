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
  weekHourArr.push({timeObj, MonthDay:timeObj.date(), weekDay: timeObj.day(), hour: timeObj.hours(), task: [] });

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

// Helper funtions

// 1) firstDayOfWeek get first day of week, that contains given date.
// needs date and start of the week parameter.
// return a moment obeject



const firstDayOfWeek = function(date, weekStart) {
  return moment(date).startOf('week').weekday(weekStart);
}

// 2) headerArrCreator returns an array of 7 objects. Containing 
// each object contains
// dayName = "Sun"/ "Fri"
// weekDay = 0 / 5
// dayNum = 4 ,if date is 4th May 
// monthName = May // May the force be with you 
// timeObj a moment time object, so that you can use it for further transfroms
// needs date and start of the week parameter.


const headerArrCreator = function(date, weekStart){
  let firstDay = firstDayOfWeek(date, weekStart);
  let headerArr = new Array();

    for(i=0; i < 7; i++ ){
      let d = moment.duration(i, 'd');
      let timeObj = firstDay.clone().add(d)
      headerArr.push({timeObj, weekDay: timeObj.day(), dayNum:timeObj.date(),dayName: timeObj.format("ddd"), monthName: timeObj.format("MMM") });
    }
  return headerArr;
}

// 3) bodyArrCreator returns an array of 168 objects. Containing 
// each object contains
// weekDay = 0 / 5
// MonthDay = 4 ,if date is 4th May 
// hour = 0 to 23 // this is to track which row should render this object
// timeObj a moment time object, so that you can use it for further transfroms
// task a object of sub task
// needs date and start of the week parameter.


const bodyArrCreator = function(date, weekStart) {
  let firstDay = firstDayOfWeek(date, weekStart);
  let bodyArr = new Array();

  for(i=0; i < 168; i++ ){
    let h = moment.duration(i, 'h');
    let timeObj = firstDay.clone().add(h)
    bodyArr.push({timeObj, MonthDay:timeObj.date(), weekDay: timeObj.day(), hour: timeObj.hours(), task:[] });
  }

return bodyArr;
}

// 4) rotationFilter returns an array of filter objects. 
// based on start of week parameter, 
// the assumption is to remove the last 2 columns
// needs date, isVertical, and start of the week parameter.
// rotationFilter(bodyArrCreator(new Date(), 0), 0, true)

 const rotationFilter = function( arr, weekStart, isVertical){
    return isVertical ?
     arr.slice().filter(result => result.weekDay !== weekStart+5 && result.weekDay !== weekStart+6)
     :
     arr
 }

 
 // 5) taskAdder 
 // Takes taskObj and adds it to calendar array based on task start and end date
 // returns calendar array

  const taskAdder = function(arr, taskArr){
    // taskObj should have
    // 1 start time
    // 2 end time
    // 3 task name


    let tempArr = arr.slice();

    taskArr.forEach(function(taskObj){
      const {endTime, startTime, taskName } = taskObj;
      console.log(taskObj);
      if(moment.isMoment(endTime) && moment.isMoment(startTime)) {
        tempArr.forEach(function(element) {
          let {timeObj, task} = element
          moment(timeObj).isBetween(startTime.toISOString(), endTime.toISOString(), "hour") ? task.push(taskObj): null
        });
      }
    })
    return tempArr;
  }

// 6) calendarArrayCreator 
// array of task objects , date, weekStart

// this function is very ineffcient as it caluclates all data, which is independent of direction.
// only needs rotation filter and body modification

  const calendarArrayCreator = function (taskArr, date, weekStart, isVertical) {

    let calendarArr = new Array();
    let firstOfWeek = firstDayOfWeek(date, weekStart);
    let bodyArr = bodyArrCreator(date, weekStart);
    let taskedArr = taskAdder(bodyArr, taskArr);
    let rotationfilterArr = rotationFilter(taskedArr, weekStart, isVertical);

    // loop 0 to 23 to get hour rows
    for(i= 0; i < 24; i++){
    let tempArr = rotationfilterArr.filter(result => result.hour === i);
    let h = moment.duration(i, 'h');
    let headTitle = firstOfWeek.clone().add(h).format("hh a")
    calendarArr.push({id:''+i, headTitle,  data:tempArr});
    }
    return calendarArr;
  }
const finalData = calendarArrayCreator([{endTime: moment("2018-03-06"), 
                  startTime: moment("2018-03-05"), taskName:"first"},
                  { startTime: moment("2018-03-05T14:56:55Z"), 
                  endTime: moment("2018-03-06T14:56:55Z"), taskName:"second"}], new Date(), 0);

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
    // moment("").isBetween(moment("2018-03-03"), )
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
        data={finalData}
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
