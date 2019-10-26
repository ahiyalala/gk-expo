import {
  Alert,
  AsyncStorage,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  StatusBar
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-navigation";
export class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  componentDidMount = async () => {
    var result = await AsyncStorage.getItem("credentials");
    var userData = JSON.parse(result);
    this.setState({ userData });
    /* AsyncStorage.getItem("credentials", (err, result) => {
      const userData = JSON.parse(result);
      this.setState(prevState => (prevState.userData = userData));
    }); */
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignContent: "space-around",
          padding: 16,
          paddingTop: 16 * 5
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
          Welcome, {this.state.userData ? this.state.userData.first_name : ""}
        </Text>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 32,
            backgroundColor: "#fff",
            marginVertical: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6
          }}
        >
          <Text>This is a sample card</Text>
        </View>
        <Button onPress={this._signOut} title="Sign me out" />
      </SafeAreaView>
    );
  }

  _signOut = async () => {
    await AsyncStorage.removeItem("credentials");
    this.props.navigation.navigate("Auth");
  };
}
