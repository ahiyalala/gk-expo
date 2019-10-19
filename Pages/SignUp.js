import React from "react";
import {
  Alert,
  AsyncStorage,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { layouting, typography, colors, inputs } from "../theme/theme";
import Data from "../Helper/Data";
import { SafeAreaView } from "react-navigation";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMessage: "",
      signUpData: {
        email_address: null,
        password: null,
        first_name: null,
        middle_name: null,
        last_name: null,
        gender: null,
        birth_date: null,
        contact_number: null
      },
      formValidity: {
        email: 0,
        password: 0,
        first_name: 0,
        last_name: 0,
        birth_date: 0,
        contact_number: 0,
        gender: 0
      },
      signUpSuccessful: 0,
      retypePassword: null
    };
  }

  signup = e => {
    if (!this.canThisSignUp()) return;

    this.setState({
      formValidity: {
        email: 0,
        password: 0,
        first_name: 0,
        last_name: 0,
        birth_date: 0,
        contact_number: 0
      }
    });

    var data = this.state.signUpData;
    data.password = bcrypt.hashSync(this.state.signUpData.password, 8);

    Data.sendData("/api/users", this.state.signUpData, (result, data) => {
      if (result) {
        this.setState({
          signUpSuccessful: 1
        });
        return;
      } else {
        this.setState({
          signUpSuccessful: -1
        });
        return;
      }
    });
  };

  checkEmail = e => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = this.emailField.current.value;
    if (re.test(email)) {
      this.setState(function(prevState) {
        var prevData = prevState.signUpData;
        var prevValidity = prevState.formValidity;
        prevValidity.email = 1;
        prevData.email_address = email;
        return {
          signUpData: prevData,
          formValidity: prevValidity
        };
      });
    } else {
      this.setState(function(prevState) {
        var prevValidity = prevState.formValidity;
        prevValidity.email = -1;

        return {
          formValidity: prevValidity
        };
      });
    }
  };

  setGender = (e, value) => {
    this.setState(prevState => {
      var prevData = prevState.signUpData;
      var prevValidity = prevState.formValidity;

      prevData.gender = value;
      prevValidity.gender = 1;

      return {
        formValidity: prevValidity,
        signUpData: prevData
      };
    });
  };

  checkPassword = e => {
    var password = this.passwordField.current.value;
    if (password) {
      this.setState(function(prevState) {
        var prevData = prevState.signUpData;
        var prevValidity = prevState.formValidity;
        prevValidity.password = 1;
        prevData.password = password;
        return {
          signUpData: prevData,
          formValidity: prevValidity
        };
      });
    } else {
      this.setState(function(prevState) {
        var prevValidity = prevState.formValidity;
        prevValidity.password = -1;

        return {
          formValidity: prevValidity
        };
      });
    }
  };

  checkIfNull = (e, key, reference) => {
    var value = reference.current.value;
    if (value === "") {
      this.setState(prevState => {
        var prevValidity = prevState.formValidity;
        prevValidity[key] = -1;
        return {
          formValidity: prevValidity
        };
      });
    } else {
      this.setState(prevState => {
        var prevData = prevState.signUpData;
        var prevValidity = prevState.formValidity;
        prevData[key] = value;
        prevValidity[key] = 1;
        return {
          signUpData: prevData,
          formValidity: prevValidity
        };
      });
    }
  };

  canThisSignUp = () => {
    var validityList = this.state.formValidity;

    for (var key in validityList) {
      if (validityList[key] != 1) return false;
    }

    return true;
  };

  formValid = value => {
    if (value == 0 || value == 1) {
      return "";
    }

    return "form-error";
  };

  updateForm = (field, text) => {
    this.setState(prevState => {
      prevState.signUpData[field] = text;
      return prevState;
    });
  };

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#e2e100",
          paddingTop: 50,
          paddingLeft: 25,
          paddingRight: 25
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
            Fill up the form to sign up!
          </Text>
        </View>
        <View style={layouting.signupBox}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TextInput
              autoCapitalize="words"
              style={{
                borderBottomColor: "#fff",
                borderBottomWidth: 2,
                width: 150
              }}
            />
            <TextInput
              autoCapitalize="words"
              style={{
                borderBottomColor: "#fff",
                borderBottomWidth: 2,
                width: 150
              }}
            />
          </View>
          <TextInput
            autoCapitalize="none"
            value={this.state.signUpData.email_address}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email address"
            onChangeText={text => this.updateForm("email_address", text)}
            style={{
              borderBottomColor: "#fff",
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
            autoCapitalize="none"
            value={this.state.signUpData.password}
            keyboardType="default"
            textContentType="password"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={text => this.updateForm("password", text)}
            style={{
              borderBottomColor: "#fff",
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
            autoCapitalize="none"
            value={this.state.retypePassword}
            keyboardType="default"
            textContentType="password"
            secureTextEntry={true}
            placeholder="Retype password"
            onChangeText={text => this.setState({ retypePassword: text })}
            style={{
              borderBottomColor: "#fff",
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
            autoCapitalize="none"
            value={this.state.signUpData.contact_number}
            keyboardType="number-pad"
            textContentType="telephoneNumber"
            placeholder="Contact number"
            onChangeText={text => this.updateForm("contact_number", text)}
            style={{
              borderBottomColor: "#fff",
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
          <TouchableOpacity
            style={
              this.state.isLoggingIn ? inputs.whiteBtnDisabled : inputs.whiteBtn
            }
            activeOpacity={1}
            onPress={() => Alert.alert(this.state.signUpData.email_address)}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={inputs.brandBtn} activeOpacity={1}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: colors.white
              }}
              onPress={() => this.props.navigation.goBack()}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
