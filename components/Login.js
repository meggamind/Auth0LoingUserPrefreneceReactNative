import React from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    ActivityIndicator,
    TouchableHighlight,
    TextInput,
    Alert,
    Image
} from 'react-native';
import {Toast} from 'react-native-toast'
import { MessageBarManager } from 'react-native-message-bar'

export default class Login extends React.Component {
    STORAGE_KEY = 'id_token'

    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: ''
    }

    async _onValueChange(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        }catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    _userLogin = () =>{
        dataOBj = {
            client_id:'0kTu00V7ZD1Uz3z50VXXYcjjz3NL1tbd',
            client_secret:'W6rrXXRkMntUjAUxGmXp5wO6kolJiE1CPHCTuZYWA5GaKwboAOdxmypD-M13GK2O',
            audience: 'https://testing-react.auth0.com/api/v2/',
            grant_type: 'client_credentials'
        }
        var proceed = false;
        this.setState({ isLoggingIn: true, message: '' });
        fetch("https://testing-react.auth0.com/oauth/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataOBj)
        }).then((response) => response)
        .then((response) => {
            console.log("status1: " + response["status"])
            if (response["status"]==200) proceed = true;
            else {
                this.setState({ message: response["message"] });
            }
        }).then(() => {
            this.setState({ isLoggingIn: false })
            if (proceed) {
                this.setState({isLoggedIn: true})
                this.props.navigation.navigate('LoginOptions')
            }

        })
        .catch(err => {
            this.setState({ message: err });
            this.setState({ isLoggingIn: false })
		});
    }



    _userSignup = () => {
        console.log(this.state)
        fetch("https://testing-react.auth0.com/dbconnections/signup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: 'opBiNRZn3x5yRHIPAXzhCft502h1VjhB',
                email: 'something4@gmail.com',
                password: 'Thales01*',
                connection: 'Username-Password-Authentication'
            })
        })
        .then((response) => response)
        .then((response) => {
            console.log("status12: " + response["status"])
            const error_code = JSON.parse(response["_bodyText"])["code"]
            console.log("ID: " + error_code)
            if (response["status"]==200) {
                proceed = true
                console.log("ID: " + response["_bodyText"])
            }else if(response["status"]==400 && error_code == 'user_exists'){
                proceed = true
                Toast.showShortTop.bind(null, "this is a message")
                console.log("response: " + JSON.stringify(response))
                this.setState({ message: response["message"] });
            }
        }).then(() => {
            console.log(this.state)
            this.setState({ isLoggingIn: false })
            if (proceed) {
                this.setState({isLoggedIn: true})
                this.props.onLoginPress()
            }

        })
        .catch(err => {
            this.setState({ message: err });
            this.setState({ isLoggingIn: false })
            console.log(this.state)
            console.log(err.message)
            console.log({message})
		});
    }

    clearUsername = () => {
        this._username.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        console.log('lcearing')
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    ComponentDidMount(){
        MessageBarManager.registerMessageBar(this.refs.alert)
        MessageBarManager.showAlert({
            title: 'Your alert title goes here',
            message: 'Your alert message goes here',
            alertType: 'success',
            // See Properties section for full customization
            // Or check `index.ios.js` or `index.android.js` for a complete example
        });
    }

    componentWillUnmount() {
      // Remove the alert located on this master page from the manager
      MessageBarManager.unregisterMessageBar();
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../images/logo.png')}/>
            <TextInput
                style={styles.textInput}
                ref={component => this._username = component}
                placeholder='Username'
                onChangeText={(username) => this.setState({username})}
                autoFocus={true}
                onFocus={this.clearUsername}
            />
            <TextInput
                style={styles.textInput}
                ref={component => this._password = component}
                placeholder='Password'
                onChangeText={(password) => this.setState({password})}
                secureTextEntry={true}
                onFocus={this.clearPassword}
                onSubmitEditing={this._userLogin}
            />
            {!!this.state.message && (
                <Text
                    style={{fontSize: 14, color: 'red', padding: 5}}>
                    {this.state.message}
                </Text>
            )}
        {this.state.isLoggingIn && <ActivityIndicator />}

        <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this._userSignup} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textInput:{
      padding:10,
      color:'white'
  },
  logo:{
      top:-80,
      alignSelf: 'center',
  }
});
