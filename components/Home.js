import React, { Component } from 'react';
import Expo from "expo";

import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Button,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux'


class Home extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={{color:'white'}}>Selected option: {
                        Object.keys(this.props.statePref).map((keys)=>{
                        return (
                            <Text key={keys} style={{fontWeight:'bold', color:'white'}}>
                                {this.props.statePref[keys] + "\n"}
                            </Text>
                        )
                    })}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:12,
        backgroundColor: '#323B40',
        alignItems: 'center',
        flexDirection: 'row',
    },
});



function mapStateToProps(statePref){
    return{
        statePref:statePref,
    }
}


export default connect(
    mapStateToProps
)(Home)
