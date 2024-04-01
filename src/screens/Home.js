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
import logo from "../../assets/icon.png";

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar color="#f7f7f7" />
      <View style={estilos.container}>
        <Image style={estilos.logo} source={logo} />
        <View>
          <Pressable onPress={() => navigation.navigate("SalvarPasseio")}>
            <Text>Salvar Lugar</Text>
          </Pressable>
          <Pressable>
            <Text>Lugares que Visitei</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
