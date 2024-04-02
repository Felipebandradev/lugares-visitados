import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Image,
} from "react-native";
import logo from "../../assets/icon.png";

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar color="#f7f7f7" />
      <View style={estilos.container}>
        <View>
          <Image style={estilos.logo} source={logo} />
          <Text style={estilos.titulo}>VISITEI</Text>
        </View>
        <View>
          <Pressable
            style={estilos.botao}
            onPress={() => navigation.navigate("SalvarPasseio")}
          >
            <Text style={estilos.textoBotao}>Salvar Lugar</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Album")}
            style={estilos.botao}
          >
            <Text style={estilos.textoBotao}> Álbum de Locais Visitados </Text>
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
    width: 350,
    height: 350,
    alignSelf: "center",
  },
  botao: {
    backgroundColor: "#F1B215",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 24,
  },
  textoBotao: {
    color: "#f7f7f7",
    fontWeight: "bold",
    fontSize: 18,
  },
  titulo: {
    textAlign: "center",
    fontSize: 40,
    color: "#F1B214",
    fontWeight: "bold",
  },
});
