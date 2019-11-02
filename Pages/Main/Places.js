import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from "react-native";
import React from "react";
import { colors } from "../../theme/theme";
import Card from "./Partials/Card";
import Data from "../../Helper/Data";
import { AntDesign } from "@expo/vector-icons";
export class Places extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Places",
      headerStyle: {
        backgroundColor: colors.brandYellow
      },
      headerTintColor: "#fff",
      headerRight: (
        <TouchableOpacity
          style={{ paddingHorizontal: 16 }}
          title="Add"
          onPress={() => navigation.navigate("PlacesForm")}
        >
          <AntDesign name="plus" size={32} color="#fff" />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      placesList: null
    };
  }

  componentWillMount() {
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      async () => {
        Data.getAuthenticatedData("/api/places", (result, data) => {
          if (!result) return;

          this.setState({
            placesList: data
          });
        });
      }
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  renderPlaces() {
    if (this.state.placesList == null) return <ActivityIndicator />;

    if (this.state.placesList.length == 0)
      return (
        <View>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            You don't have any registered places yet
          </Text>
          <View
            style={{
              padding: 16,
              backgroundColor: colors.brandYellow,
              alignSelf: "center",
              marginTop: 8,
              borderRadius: 64
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("PlacesForm")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: colors.white,
                  fontSize: 16
                }}
              >
                Add a new one
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    return (
      <ScrollView style={{ margin: 8, marginTop: 16 }}>
        {this.state.placesList.map((value, index) => {
          return (
            <Card
              key={index}
              title={value.location_type}
              description={
                value.location_street +
                ", " +
                value.location_barangay +
                " " +
                value.location_city
              }
            />
          );
        })}
      </ScrollView>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        {this.renderPlaces()}
      </View>
    );
  }
}
