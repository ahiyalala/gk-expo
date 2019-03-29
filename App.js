import React from 'react';
import {Button, Text, TextInput, View, Image } from 'react-native';
import {layouting, typography, colors, inputs} from './theme/theme';
export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      inputFocus: {
        email:false,
        password:false
      }
    }
  }

  focusInput = (key) => {
    this.setState((prevState) => {
      prevState.inputFocus[key] = true;

      return prevState;
    })
  }

  blurOutput = (key) => {
    this.setState((prevState) => {
      prevState.inputFocus[key] = false;

      return prevState;
    })
  }

  focusStyle = (value) => {
    if(value) return colors.black;

    return colors.offColor;
  }

  login = (e) => {
    return e;
  }

  render() {
    return (
      <View style={layouting.loginContainer}>
        <View style={{padding:30,alignItems:'center'}}>
          <Image style={{width:75,height:75,marginLeft:10}} source={require('./assets/transparentIcon.png')} />
        </View>
        <View style={layouting.loginBox}>
          <Text style={typography.header}>Login</Text>
          <TextInput keyboardType='email-address' textContentType='emailAddress' placeholder="Email address" onBlur={(e) => this.blurOutput('email')} onFocus={(e) => this.focusInput('email')} style={{borderBottomColor:this.focusStyle(this.state.inputFocus.email),borderBottomWidth:1,paddingTop:10,paddingBottom:5,paddingLeft:15,paddingRight:15,marginBottom:15}}  />
          <TextInput secureTextEntry={true} textContentType='password' placeholder="Password" onBlur={(e) => this.blurOutput('password')} onFocus={(e) => this.focusInput('password')} style={{borderBottomColor:this.focusStyle(this.state.inputFocus.password),borderBottomWidth:1,paddingTop:10,paddingBottom:5,paddingLeft:15,paddingRight:15, marginBottom:30}} />
          <Button title='Login' color={colors.brandYellow} onPress={(e) => this.login(e)} />
        </View>
      </View>
    );
  }
}


