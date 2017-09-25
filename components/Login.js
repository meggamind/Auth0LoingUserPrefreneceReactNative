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
import Auth0 from 'react-native-auth0';

export default class Login extends React.Component {
    STORAGE_KEY = 'id_token'

    state = {
        username: null,
        password: null,
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

    _userLogin1 = () =>{
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
            }

        }).catch(err => {
            this.setState({ message: err });
            this.setState({ isLoggingIn: false })
		});
    }


    _userLogin = () => {
            auth0 = new Auth0({
                clientId:    '0kTu00V7ZD1Uz3z50VXXYcjjz3NL1tbd',
                domain:      'testing-react.auth0.com',
            });

            auth0.auth
                .passwordRealm({
                    username: this.state.username,
                    password: this.state.password,
                    realm: "Username-Password-Authentication"
                }).then(credentials => {
                    this.setState({
                        id_token: credentials.accessToken,
                        clientId: credentials.idToken,
                    });
                    this.props.navigation.navigate('LoginOptions')
                    console.log("here", credentials)
                    console.log("this.state: ", this.state)
                    console.log("this.state.id_token: ", this.state.id_token)
                }).catch(error => {
                    Alert.alert(
                      'Login Error',
                      error.message,
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
                    )
                });
        }


    _userSignup = () => {
        auth0 = new Auth0({
            clientId:    '0kTu00V7ZD1Uz3z50VXXYcjjz3NL1tbd',
            domain:      'testing-react.auth0.com',
        });
        auth0.auth
            .createUser({
                email: this.state.username,
                password: this.state.password,
                connection: 'Username-Password-Authentication'
            }).then(() => {
                Alert.alert(
                  'SignUp Sucess!',
                  'Account created sucessfully, you may now login',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
                console.log("error1.message: " + error.message)
            }).catch(error => {
                Alert.alert(
                  'SignUp Error',
                  error.message,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
                console.log("error1.message: " + error.message)
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

    static navigationOptions = {
        header: null
    };

    _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

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
  buttonPress: {
    height: 36,
    backgroundColor: '#FF6A33',
    borderColor: '#FF6A33',
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
