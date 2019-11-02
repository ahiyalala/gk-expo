import {
  AsyncStorage,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  Alert,
  ActivityIndicator
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-navigation";
import Card from "./Partials/Card";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { Navicon } from "./Partials/Navicon";
import { MainCta } from "./Partials/MainCta";
import Data from "../../Helper/Data";
import { colors } from "../../theme/theme";
export class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      displayMenu: false,
      placesList: [],
      disabled: true,
      appointments: {
        all: null,
        finished: null,
        pending: null
      }
    };
  }

  componentWillMount = async () => {
    var result = await AsyncStorage.getItem("credentials");
    this.props.navigation.addListener("didBlur", () => {
      this.setState({ displayMenu: false });
    });
    this.props.navigation.addListener("didFocus", () => {
      Data.getAuthenticatedData("/api/places", (result, data) => {
        if (!result) return;

        this.setState({
          placesList: data
        });
      });

      Data.getAuthenticatedData("/api/appointments", (result, data) => {
        if (!result) return;

        var needsReview = data.filter(item => item.is_finished == 1);
        var pending = data.filter(item => item.is_finished == 0);
        this.setState({
          appointments: {
            all: data,
            finished: needsReview,
            pending: pending
          }
        });
      });
    });
    var userData = JSON.parse(result);

    this.setState({ userData });
  };

  componentDidMount() {
    Data.getAuthenticatedData("/api/places", (result, data) => {
      if (!result) return;

      this.setState({
        placesList: data,
        disabled: false
      });
    });

    Data.getAuthenticatedData("/api/appointments", (result, data) => {
      if (!result) return;

      var needsReview = data.filter(item => item.is_finished == 1);
      var pending = data.filter(item => item.is_finished == 0);
      this.setState({
        appointments: {
          all: data,
          finished: needsReview,
          pending: pending
        }
      });
    });
  }

  navigateToBooking = () => {
    const { placesList } = this.state;
    if (placesList.length == 0) {
      Alert.alert(
        "Before that...",
        "You don't have any registered places yet. Would you like to add one?",
        [
          {
            text: "Yes",
            onPress: () => this.props.navigation.navigate("PlacesForm")
          },
          { text: "No" }
        ]
      );
      return;
    }

    this.props.navigation.navigate("BookingCalendar");
  };

  renderBookingList() {
    const { all, pending, finished } = this.state.appointments;

    if (all == null) return <ActivityIndicator />;

    if (pending.length == 0)
      return (
        <Text style={{ textAlign: "center" }}>
          You don't have any pending appointments
        </Text>
      );

    return pending.map((appointment, index) => {
      return (
        <Card
          key={index}
          title={appointment.service_type_key}
          description={appointment.date}
        />
      );
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
                  <MainCta
                    onPress={this.navigateToBooking}
                    disabled={this.state.disabled}
                  />
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
                  <Navicon title="Sign out" onPress={this._signOut}>
                    <AntDesign name="logout" size={32} color="#000" />
                  </Navicon>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ marginHorizontal: 8, paddingTop: 64, paddingBottom: 16 }}
          >
            {this.renderBookingList()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  _signOut = async () => {
    Alert.alert("Warning", "Do you want to sign out?", [
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.removeItem("credentials");
          this.props.navigation.navigate("Auth");
        }
      },
      { text: "No" }
    ]);
  };
}
