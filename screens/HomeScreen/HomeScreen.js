import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'

function Home({ navigation }) {
    return(
        <View style={styles.contianer}>
            <Text style={styles.text}>HOME VIEW</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}> To DashBoard </Text>
                </TouchableOpacity>
        </View>
    )
}

function DashBoard(){
    return(
        <View style={styles.contianer}>
            <Text style={styles.contianer}>DashBoard</Text>
        </View>
    )
}

const Stack = StackNavigator({
    Home:{
        screen: Home,
    },
    DashBoard:{
        screen: DashBoard,
    }
})


export default class HomeScreen extends React.Component{
    render(){
        return(
            <View style={{felx:1}}>
                <Text>asdasd</Text>
                <Stack/>
            </View>
        )
    }
}
