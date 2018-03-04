import React from 'react';
import {
    View,
    Text
  } from 'react-native'

import Cell from './cell'

import PropTypes from 'prop-types';

const Row = (props) => {
    const {
        data,
        onPress,
        direction,
        width,
        height,
    } = props;    
      return (
        <View style={{flexDirection: "row", width:width, height:height/8, flexWrap:"nowrap", alignContent:"space-between", justifyContent: "space-between", alignItems:"center"}}>
        <View         style={{ flex: 1,  height: "100%",
            borderColor:"lightgrey", borderRightWidth: 1, borderLeftWidth: 1,
            backgroundColor: 'transparent'}}>
        <Text> first hour </Text>
        </View>
            {(()=>{
                return data.map((data) => {
                    return (
                        <Cell key={data.MonthDay|| data.dayName} onPress={onPress}>
                        <View>
                        </View>
                        </Cell>
                    )
                  })
            })()}
            
          </View>
      )
};

Row.propTypes = {
    data: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
    direction: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
};

export default Row;