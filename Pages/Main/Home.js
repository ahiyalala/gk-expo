import {
  AsyncStorage,
  Text,
  View,
  ScrollView,
  Image,
  Button
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-navigation";
import Card from "./Partials/Card";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { Navicon } from "./Partials/Navicon";
import { MainCta } from "./Partials/MainCta";
export class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      displayMenu: false
    };
  }

  componentDidMount = async () => {
    var result = await AsyncStorage.getItem("credentials");
    var userData = JSON.parse(result);
    this.setState({ userData });
  };

  componentWillMount() {
    this.props.navigation.addListener("didBlur", () => {
      this.setState({ displayMenu: false });
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignContent: "space-around"
        }}
      >
        <ScrollView>
          <View style={{ padding: 0, height: 250, backgroundColor: "#000" }}>
            <Image
              source={require("../../assets/plantspray.jpg")}
              style={{
                width: "110%",
                height: "100%",
                marginLeft: -16,
                marginRight: -16,
                opacity: 0.75
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: -56,
                margin: 16,
                width: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#fff"
                }}
              >
                Welcome,{" "}
                {this.state.userData ? this.state.userData.first_name : ""}
              </Text>
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "80%",
                  height: 75,
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  alignSelf: "center",
                  marginLeft: -32,
                  marginTop: 8,
                  borderRadius: 5,
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
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignSelf: "center",
                    display: this.state.displayMenu ? "none" : "flex"
                  }}
                >
                  <MainCta></MainCta>
                  <Navicon
                    margin={12}
                    onPress={() => this.setState({ displayMenu: true })}
                  >
                    <SimpleLineIcons name="options" size={24} color="#999" />
                  </Navicon>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignSelf: "center",
                    display: this.state.displayMenu ? "flex" : "none"
                  }}
                >
                  <Navicon
                    onPress={() => this.setState({ displayMenu: false })}
                  >
                    <AntDesign name="left" size={32} color="#000" />
                  </Navicon>
                  <Navicon
                    title="Places"
                    onPress={() => this.props.navigation.navigate("Places")}
                  >
                    <AntDesign name="home" size={32} color="#000" />
                  </Navicon>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 8, paddingTop: 64 }}>
            <Card description="Sample" title="Item" />
            <Button onPress={this._signOut} title="Sign me out" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  _signOut = async () => {
    await AsyncStorage.removeItem("credentials");
    this.props.navigation.navigate("Auth");
  };
}
