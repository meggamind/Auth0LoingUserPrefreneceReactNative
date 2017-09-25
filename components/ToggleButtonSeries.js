import React from 'react'
import {
    View,
    Text,
    Slider,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native'
import ToggleButton from './ToggleButton'
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import { connect } from 'react-redux'
import { addEntry } from '../actions'

class ToggleButtonSeries extends React.Component{
    state ={
    }

    setSelectedOption = (selectedOption) => {
        this.props.dispatch(addEntry({
            [this.props.buttonKey]: selectedOption
        }))

        this.setState({
            selectedOption
        });
    }

    renderOption = (option, selected, onSelect, index) => {
        style = styles.button

        if(this.props.statePref[this.props.buttonKey] == option){
            style = styles.button1
        }

        return (
            <TouchableHighlight onPress={onSelect} key={index} style={style}>
                <View>
                    <Text>
                        {option}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }


    renderContainer = (optionNodes) =>{
        return (
            <View style={styles.buttonsView}>{optionNodes}</View>
        )
    }


    render(){
        return(
            <View>
                <Text style={styles.title}>
                    {this.props.text}
                </Text>
                <RadioButtons
                    options={ this.props.buttonData }
                    renderOption={ this.renderOption }
                    onSelection={ this.setSelectedOption.bind(this) }
                    selectedOption={ this.state.selectedOption }
                    renderContainer={this.renderContainer}
                    justifyContent={'space-around'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonsView:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title:{
        fontSize: 29,
        marginTop: 60,
        textAlign:'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        height:70,
        width: 70,
        justifyContent: 'center',
        margin:4,
        paddingLeft:4,
        paddingRight:4,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    button1: {
        alignItems: 'center',
        height:70,
        width: 70,
        justifyContent: 'center',
        margin:4,
        paddingLeft:4,
        paddingRight:4,
        borderRadius: 4,
        borderWidth: 0.5,
        backgroundColor: '#F86B42',
    },
    buttonsView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});



function mapStateToProps(statePref){
    return{
        statePref:statePref,
    }
}

export default connect(
    mapStateToProps
)(ToggleButtonSeries)
