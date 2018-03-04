import React from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableHighlight,
    View,
  } from 'react-native'

import PropTypes from 'prop-types';

const Cell = (props) => {
    const {
        onPress,
        children,
    } = props;

    return (
        <TouchableHighlight onPress={()=>null}
        style={{ flex: 1,  height: "100%", width:"100%",
            borderColor:"lightgrey", borderWidth: 1,
            backgroundColor: 'transparent', justifyContent: "space-between",
            alignItems:"stretch",flexBasis:"auto"}}>
        <View>
            {children}
        </View>
        </TouchableHighlight>
    );
};

Cell.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    onPress: PropTypes.func.isRequired
};

export default Cell;