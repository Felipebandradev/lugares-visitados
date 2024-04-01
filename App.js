import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import SalvarPasseio from "./src/screens/SalvarPasseio";
import Album from "./src/screens/Album";
import Detalhes from "./src/screens/Detalhes";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#F1B215" },
            headerTintColor: "#f7f7f7",
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SalvarPasseio"
            component={SalvarPasseio}
            options={{ title: "Lugar Visitado" }}
          />
          <Stack.Screen
            name="Album"
            component={Album}
            options={{ title: "Álbum" }}
          />
          <Stack.Screen
            name="Detalhes"
            component={Detalhes}
            options={{ title: "Lugar Visitado" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
