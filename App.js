import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import Home from "./src/screens/Home";
import SalvarPasseio from "./src/screens/SalvarPasseio";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#F1B215" },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="SalvarPasseio" component={SalvarPasseio} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
