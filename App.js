import React from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import NavigatorMain from './components/NavigatorMain'

const store = createStore(reducer)
console.log("store: " + JSON.stringify(store.getState()))
export default class App extends React.Component {


  render() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <NavigatorMain/>
            </View>
        </Provider>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
