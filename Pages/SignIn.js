import React from "react";
import {
  Alert,
  AsyncStorage,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { layouting, typography, colors, inputs } from "../theme/theme";
import Data from "../Helper/Data";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputFocus: {
        email: false,
        password: false
      },
      inputForm: {
        email_address: "",
        password: ""
      },
      count: 0,
      isLoggingIn: false
    };
  }

  focusInput = key => {
    this.setState(prevState => {
      prevState.inputFocus[key] = true;

      return prevState;
    });
  };

  blurOutput = key => {
    this.setState(prevState => {
      prevState.inputFocus[key] = false;

      return prevState;
    });
  };

  focusStyle = value => {
    if (value) return colors.white;

    return colors.offColor;
  };

  login = e => {
    if (this.state.isLoggingIn) return;
    this.setState(prevState => {
      prevState.isLoggingIn = true;

      return prevState;
    });
  };

  componentDidUpdate() {
    if (this.state.isLoggingIn) this.proceedLogin(this.state.inputForm);
  }

  proceedLogin = credentials => {
    Data.authenticateUser("/api/users/login", credentials, (status, result) => {
      if (status) {
        delete result.password;
        AsyncStorage.setItem("credentials", JSON.stringify(result));
        this.props.navigation.navigate("App");
      } else {
        Alert.alert("Login Failed", "Check your credentials");
      }
    });

    this.setState(prevState => {
      prevState.isLoggingIn = false;

      return prevState;
    });
  };

  updateEmailValue = text => {
    this.setState(prevState => {
      prevState.inputForm.email_address = text;

      return prevState;
    });
  };

  updatePasswordValue = text => {
    this.setState(prevState => {
      prevState.inputForm.password = text;

      return prevState;
    });
  };

  render() {
    return (
      <ScrollView style={layouting.loginContainer}>
        <View style={{ padding: 30, alignItems: "center" }}>
          <Image
            style={{ width: 75, height: 75, marginLeft: 10 }}
            source={require("../assets/transparentIcon.png")}
          />
        </View>
        <View style={layouting.loginBox}>
          <TextInput
            autoCapitalize="none"
            onChangeText={text => this.updateEmailValue(text)}
            value={this.state.inputForm.email_address}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email address"
            onBlur={e => this.blurOutput("email")}
            onFocus={e => this.focusInput("email")}
            style={{
              borderBottomColor: this.focusStyle(this.state.inputFocus.email),
              borderBottomWidth: 2,
              paddingTop: 10,
              paddingBottom: 5,
              paddingLeft: 5,
              paddingRight: 15,
              marginBottom: 15,
              color: "#fff",
              fontSize: 16
            }}
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
          <TextInput
            onChangeText={text => this.updatePasswordValue(text)}
            value={this.state.inputForm.password}
            secureTextEntry={true}
            textContentType="password"
            placeholder="Password"
            onBlur={e => this.blurOutput("password")}
            onFocus={e => this.focusInput("password")}
            style={{
              borderBottomColor: this.focusStyle(
                this.state.inputFocus.password
              ),
              borderBottomWidth: 2,
              paddingTop: 10,
              paddingBottom: 5,
              paddingLeft: 5,
              paddingRight: 15,
              marginBottom: 30,
              color: "#fff",
              fontSize: 16
            }}
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
          <TouchableOpacity
            style={
              this.state.isLoggingIn ? inputs.whiteBtnDisabled : inputs.whiteBtn
            }
            activeOpacity={1}
            onPress={e => this.login(e)}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginBottom: 16,
              textAlign: "center",
              color: colors.white
            }}
          >
            or
          </Text>
          <TouchableOpacity style={inputs.brandBtn} activeOpacity={1}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: colors.white
              }}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
