import React from 'react';
import {
    View,
    Text
  } from 'react-native'

import Cell from './cell'

import PropTypes from 'prop-types';

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
    console.log(props);    
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
                    return (
                        <Cell key={data.MonthDay} onPress={onPress}>
                        <View>
                            {data.children}
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