import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import AuthLoadingScreen from "./AuthLoadingScreen";
import { colors } from "./theme/theme";
import { Home } from "./Pages/Main/Home";
import { Places } from "./Pages/Main/Places";
import { PlacesForm } from "./Pages/Main/PlacesForm";
import { BookingCalendar } from "./Pages/Main/BookingCalendar";
import { BookingType } from "./Pages/Main/BookingType";
import { BookingDetails } from "./Pages/Main/BookingDetails";
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
console.disableYellowBox = true;
const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign up",
      headerStyle: {
        backgroundColor: colors.brandYellow
      },
      headerTintColor: colors.white
    }
  }
});
const AppStack = createStackNavigator({
  Home: Home,
  Places: Places,
  PlacesForm: PlacesForm,
  BookingCalendar: BookingCalendar,
  BookingType: BookingType,
  BookingDetails: BookingDetails
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
