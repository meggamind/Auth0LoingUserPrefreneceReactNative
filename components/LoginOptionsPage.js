import React, { Component } from 'react'
import{
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native'
import ToggleButtonSeries from './ToggleButtonSeries'
import { getMetricMetaInfo } from '../utils/helpers'

export default class LoginOptionsPage extends Component{
    static navigationOptions = {
        headerLeft: null
    };
    static drawerOptions = {
        headerLeft: null
    };
    state = {
            preferedApp: 'Uber',
            maxPickupDistance: 5,
            LowestPassengerRating: 4.5,
        }

    render(){
        const metaInfo = getMetricMetaInfo()
        const displayedPageNumber = this.props.pageNum
        return(
            <View>
                {Object.keys(metaInfo[displayedPageNumber]).map((key) =>{
                    const { text, options, getUnit } = metaInfo[displayedPageNumber][key]
                    return(
                        <View key={key} style={styles.loginOptionsViews}>
                            <ToggleButtonSeries
                                text={text}
                                buttonKey={key}
                                buttonData={options}
                                getUnit={getUnit}/>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginOptionsViews:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    button: {
      position:'absolute',
      bottom:50,
      width: 'auto',
      padding:22,
      right: 22,
      borderRadius: 8,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
});
