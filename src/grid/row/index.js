import React from 'react';
import {
    View,
    Text
  } from 'react-native'

import Cell from './cell'

import PropTypes from 'prop-types';

const Row = (props) => {
    const {
        direction,
        data,
        onPress,
    } = props;

    rowCell =() => {

    }
    
      return (
        <View style={{flexDirection: "row", flexWrap:"wrap", justifyContent:"space-around"}}>
            {(()=>{
            let arr = [];
            for (var val of data) {
                    if(direction==="vertical"){
                        if(val.day !=="Sunday" && val.day !== "Saturday")
                        arr.push(
                            <Cell key={val.id} onPress={onPress}>
                            <View style={{backgroundColor:"pink"}}>
                            <Text>{val.title} and {val.day}</Text>
                            </View>
                            </Cell>
                        )   
                    } else{
                        arr.push(
                            <Cell key={val.id} onPress={onPress}>
                            <View style={{backgroundColor:"pink"}}>
                            <Text>{val.title} and {val.day}</Text>
                            </View>
                            </Cell>
                        )
                    }}
            return arr
            })()}
          </View>
      )
};

Row.propTypes = {
    direction: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default Row;