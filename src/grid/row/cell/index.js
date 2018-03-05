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
        <View
        style={{ flex: 1,  height: "100%", width:"100%",
            borderColor:"#4c4c4c",borderLeftWidth: 1,
            backgroundColor: 'transparent', justifyContent: "space-between",
            alignItems:"stretch",flexBasis:"auto"}}>
            {children}
        </View>
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