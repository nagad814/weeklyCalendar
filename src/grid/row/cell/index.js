import React from 'react';
import {
    TouchableOpacity,
    View,
  } from 'react-native'

import PropTypes from 'prop-types';

const Cell = (props) => {
    const {
        onPress,
        children,
    } = props;

    return (
        <TouchableOpacity onPress={onPress} 
        style={{ flex: 1,  height: "100%",
            borderColor:"lightgrey", borderRightWidth: 1, borderLeftWidth: 1,
            backgroundColor: 'transparent'}}>
        <View>
            {children}
        </View>
        </TouchableOpacity>
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