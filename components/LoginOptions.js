import React, { Component } from 'react'
import{
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native'
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import LoginOptionsPage from './LoginOptionsPage'
import { getMetricMetaInfo } from '../utils/helpers'
import { FontAwesome } from '@expo/vector-icons';
import { SegmentedControls } from 'react-native-radio-buttons'
import { NavigationActions } from 'react-navigation'


export default class LoginOptions extends Component{
    static navigationOptions = {
        header: null
    };



    numberOfOptionPages = getMetricMetaInfo().length

    _prefSubmit = () =>{
        this.props.navigation.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ]
        }))
    }

    render(){
        const metaInfo = getMetricMetaInfo()
        return(
                <IndicatorViewPager
                    style={{flex:1}}
                    indicator={this._renderDotIndicator()}>
                        <View style={styles.slide0}>
                            <LoginOptionsPage pageNum='0' />
                        </View>

                        <View  style={styles.slide1}>
                            <LoginOptionsPage pageNum='1'/>

                        </View>
                        <View style={styles.slide2}>
                            <LoginOptionsPage pageNum='2'/>
                                <TouchableHighlight
                                    style={styles.submitButton}
                                    onPress={this._prefSubmit}
                                    underlayColor='#99d9f4'>
                                    <FontAwesome
                                        style={styles.buttonText}
                                        name="arrow-circle-right"
                                        size={50} style={{ color: '#C25736' }}>

                                    </FontAwesome>
                                </TouchableHighlight>
                        </View>
                </IndicatorViewPager>
        );
    }
    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={this.numberOfOptionPages} />;
    }

}

const styles = StyleSheet.create({
    slide0: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323B40',
    },
    slide1: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323B40',
    },
    slide2:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323B40',
    },
    wrapper: {
        flex:1,
        backgroundColor: '#323B40',
    },
    submitButton:{
        bottom: 100,
        right: -130,
    },

});
