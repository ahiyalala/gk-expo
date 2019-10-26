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
import { Form, TextValidator } from "react-native-validator-form";
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMessage: "",
      signUpData: {
        email_address: "",
        password: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        contact_number: ""
      },
      signUpSuccessful: 0,
      retypePassword: ""
    };
  }

  submit = () => {
    var data = this.state.signUpData;
    const password = data.password;
    data.password = bcrypt.hashSync(password, 8);

    Data.sendData("/api/users", data, (result, data) => {
      if (result) {
        Alert.alert(
          "Registration successful",
          "You will be redirected to the login screen",
          [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
          { cancelable: false }
        );
        this.setState({
          signUpSuccessful: 1
        });

        return;
      } else {
        alert("Fail");
        this.setState({
          signUpSuccessful: -1
        });
        return;
      }
    });
  };

  handleSubmit = () => {
    this.refs.form.submit();
  };

  handleChange = (key, value) => {
    this.setState(prevState => (prevState.signUpData[key] = value));
  };

  componentWillMount() {
    // custom rule will have name 'isPasswordMatch'
    Form.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.signUpData.password) {
        return false;
      }
      return true;
    });

    bcrypt.setRandomFallback(len => {
      const buf = new Uint8Array(len);

      return buf.map(() => Math.floor(isaac.random() * 256));
    });
  }

  componentWillUnmount() {
    Form.removeValidationRule("isPasswordMatch");
  }

  handlePassword = value => {
    const { signUpData } = this.state;
    signUpData.password = value;
    this.setState(prevState => (prevState.signUpData = signUpData));
  };

  handleRepeatPassword = value => {
    this.setState(prevState => (prevState.retypePassword = value));
  };

  render() {
    const { signUpData } = this.state;
    const { retypePassword } = this.state;
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingTop: 50,
          paddingLeft: 25,
          paddingRight: 25
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Fill up the form to sign up!
          </Text>
        </View>
        <Form style={layouting.signupBox} ref="form" onSubmit={this.submit}>
          <TextValidator
            name="first_name"
            label="first_name"
            placeholder="First Name"
            type="text"
            validators={["required"]}
            errorMessages={["This field is required"]}
            value={signUpData.first_name}
            onChangeText={e => this.handleChange("first_name", e)}
            style={{
              paddingTop: 10,
              paddingBottom: 16,
              paddingLeft: 16,
              fontSize: 16
            }}
          />
          <TextValidator
            name="last_name"
            label="last_name"
            placeholder="Last Name"
            type="text"
            validators={["required"]}
            errorMessages={["This field is required"]}
            value={signUpData.last_name}
            onChangeText={e => this.handleChange("last_name", e)}
            style={{
              paddingTop: 10,
              paddingBottom: 16,
              paddingLeft: 16,
              fontSize: 16
            }}
          />
          <TextValidator
            autoCapitalize="none"
            name="email_address"
            label="email_address"
            placeholder="Email Address"
            type="text"
            keyboardType="email-address"
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "Invalid email"]}
            value={signUpData.email_address}
            onChangeText={e => this.handleChange("email_address", e)}
            style={{
              paddingTop: 10,
              paddingBottom: 16,
              paddingLeft: 16,
              fontSize: 16
            }}
          />
          <TextValidator
            name="password"
            label="password"
            placeholder="Password"
            type="text"
            secureTextEntry
            validators={["required"]}
            errorMessages={["This field is required"]}
            value={signUpData.password}
            onChangeText={this.handlePassword}
            style={{
              paddingTop: 10,
              paddingBottom: 16,
              paddingLeft: 16,
              fontSize: 16
            }}
          />
          <TextValidator
            name="password"
            label="password"
            placeholder="Password"
            type="text"
            secureTextEntry
            validators={["required", "isPasswordMatch"]}
            errorMessages={["This field is required", "Password did not match"]}
            value={retypePassword}
            onChangeText={this.handleRepeatPassword}
            style={{
              paddingTop: 10,
              paddingBottom: 16,
              paddingLeft: 16,
              fontSize: 16
            }}
          />
          <TouchableOpacity
            style={
              this.state.isLoggingIn ? inputs.whiteBtnDisabled : inputs.whiteBtn
            }
            activeOpacity={1}
            onPress={this.handleSubmit}
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
        </Form>
      </ScrollView>
    );
  }
}
