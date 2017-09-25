import React from 'react'
import {
    View,
    Text,
    Slider,
    TouchableHighlight
} from 'react-native'

export default function ToggleButton({textView, onPress}){
    return(
        <TouchableHighlight onPress={onPress}
            underlayColor='#242424'
            style={{
                    flexDirection:'row'}}>
            <View>
                {textView}
            </View>
        </TouchableHighlight>
    )
}
