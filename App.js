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
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

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
const AppStack = createStackNavigator({ Home: Home });

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
