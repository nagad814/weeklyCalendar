import React from 'react';
import {
    View,
    Text
  } from 'react-native'

import Cell from './cell'

import PropTypes from 'prop-types';

const randCol = function(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

const Row = (props) => {
    const {
                id,
        data,
        onPress,
        direction,
        width,
        height,
        header,
    } = props;
    // console.log(props);    
      return (
        <View style={{flexDirection: "row", width:width, height:height/8, flexWrap:"nowrap", alignContent:"space-between", justifyContent: "space-between", alignItems:"center"}}>
        <View style={{ flex: 1,  height: "100%",
            borderColor:"lightgrey", borderRightWidth: 1, borderLeftWidth: 1, justifyContent: "center", alignItems:"center",
            backgroundColor: 'transparent'}}>
        <Text>{id}</Text>
        </View>
            {header ?
            (()=>{
                return data.map((data) => {
                    const {dayName, dayNum, monthName} = data;
                    return (
                        <Cell key={data.dayName} onPress={onPress}>
                        <View style={{height:"100%", flexWrap:"nowrap", flexDirection: "row"}}>
                        <View style={{backgroundColor:"pink", justifyContent:"center",flexGrow:1, flex:1, alignItems:"center"}}>
                        <Text style={{fontSize: 20}}>
                         {monthName} {dayNum} {'\n'} {dayName}
                         </Text>
                        </View>
                        </View>
                        </Cell>
                    )
                  })
            })()
            :
            (()=>{
                return data.map((data) => {
                    // console.log(data.task);
                    return (
                        <Cell key={data.MonthDay} onPress={onPress}>
                        <View style={{height:"100%", flexWrap:"nowrap", flexDirection: "row"}}>
                        {(()=>{
                            
                            return data.task.map((task) => {
                                return (
                                    <View key={task.taskName} style={{backgroundColor:randCol(task.startTime.hours(),task.startTime.date() ), justifyContent:"center",flexGrow:1, flex:1, alignItems:"center"}}>
                                    </View>
                                )
                                });
                        })()}
                        </View>
                        </Cell>
                    )
                  })
            })()}
            
          </View>
      )
};

Row.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
    direction: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
    header: PropTypes.bool.isRequired,
};

export default Row;