import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomBtn = ({
    onPress = () => {},
    btnStyle = {},
    btnText
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}
    style = {{
        ...styles.btnStyle, ...btnStyle
    }}
    >
            <Text style = {{
                color : "black",
                fontSize : 16,
                fontWeight : "600"
            }}>{btnText}</Text>
    </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
    btnStyle : {
        height : 48,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : "white",
        paddingHorizontal : 16,
        borderWidth : 1
    }
})