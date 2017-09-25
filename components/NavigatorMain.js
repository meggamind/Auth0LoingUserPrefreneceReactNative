import React, { Component } from 'react';
import Login from './Login';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import LoginOptions from './LoginOptions'
import Home from './Home'
import { Entypo } from '@expo/vector-icons'
import{
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import {connect } from 'react-redux'



const Home1 = ({ navigation }) => (
    <View style={{flex:1}}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <FontAwesome name="user-circle" size={50} style={{ color: 'gray' }} />
        </TouchableOpacity>
    </View>
);

toggle = (navigation) => {

};


const Dashboard = ({ navigation }) => (
    <View>
        <Text>This is the Dashboard view</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
            <Text>Press here to open the drawer!</Text>
        </TouchableOpacity>
    </View>
);

const Drawer = DrawerNavigator({
    Login: { screen: Home},
    Settings: { screen: LoginOptions },
    Logout: {screen: Login}
});

const HomeNavigator = StackNavigator(
    {
        Login: { screen: Login },
        LoginOptions:{ screen: LoginOptions },
        Home:{ screen: Drawer },
    },{
        navigationOptions:({ navigation }) => ({
            drawerLabel: 'Home',
            headerLeft:
                <TouchableOpacity onPress={ () => {
                    if (navigation.state.index === 0) {
                        // check if drawer is not open, then only open it
                        navigation.navigate('DrawerOpen');
                    } else {
                        // else close the drawer
                        navigation.navigate('DrawerClose');
                    }
                }} style={{top:10}}>
                <Entypo name="menu" size={40} style={{ color: 'gray'}} />
                </TouchableOpacity>,

        }),
    },{
        headerMode: 'screen'
    },
        console.log("In HomeNavigator: ", this.state1)
);

const renderScene = (route, navigator) => {
    if(route.name == 'Main') {
        return <Main navigator={navigator} />
    }
    if(route.name == 'Home') {
        return <Home navigator={navigator} />
    }
}

export default class NavigatorMain extends Component {

    state = {
        hidden: false,
    }

    static navigationOptions = {
        title: 'Great',
        headerTintColor: 'blue',
        backgroundColor: 'transparent',
    }
    render() {
        console.log("state1: " + JSON.stringify(this.state))
        return (
            <HomeNavigator state1={this.state}/>
        );
    }
}
