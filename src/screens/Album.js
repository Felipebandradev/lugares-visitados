import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Album({ navigation }) {
  const [figurinhas, setFigurinhas] = useState([]);

  useEffect(() => {
    const carregarFigurinhas = async () => {
      try {
        const dados = await AsyncStorage.getItem("@albumvisitei");

        if (dados) {
          setFigurinhas(JSON.parse(dados));
        }
      } catch (error) {
        console.log("Erro ao carregar os dados:  " + error);
        Alert.alert(
          "Erro",
          "Erro ao carregar os dados tente novamente mais tarde"
        );
      }
    };
    carregarFigurinhas();
  }, []);

  // console.log(figurinhas);

  return (
    <>
      <StatusBar color="#f7f7f7" />
      <View style={estilos.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={estilos.titulo}>
            Visitei
            <MaterialIcons name="photo-album" size={18} color="#f7f7f7" />
          </Text>
          <Text style={estilos.subtitulo}>
            Figurinhas{" "}
            <MaterialCommunityIcons name="sticker" size={16} color="black" />:{" "}
            {figurinhas.length}
          </Text>

          {figurinhas && (
            <View style={estilos.areaCards}>
              {figurinhas.map((figurinha) => {
                return (
                  <Pressable
                    key={figurinha.nome}
                    onPress={() =>
                      navigation.navigate("Detalhes", { figurinha })
                    }
                  >
                    <View style={estilos.cardLocal}>
                      <View>
                        <MaterialIcons
                          name="photo-album"
                          size={18}
                          color="#f7f7f7"
                        />
                        <Image
                          style={estilos.foto}
                          source={{ uri: `${figurinha.camera}` }}
                        />
                      </View>

                      <View style={estilos.areaTexto}>
                        <Text style={estilos.tituloFoto}>{figurinha.nome}</Text>
                        <Text style={estilos.nomeLocal}>
                          {figurinha.nomeLocal}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    textAlign: "center",
    fontSize: 20,
    padding: 12,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#F1B215",
    color: "#f7f7f7",
  },
  foto: {
    width: 150,
    height: 200,
    marginVertical: 18,
    borderRadius: 5,
  },
  cardLocal: {
    alignItems: "center",
    backgroundColor: "#ffd795",
    padding: 12,
    marginVertical: 12,
    borderRadius: 5,
  },
  areaTexto: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  areaCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2.5,
    flexWrap: "wrap",
    margin: 12,
  },
  tituloFoto: {
    fontSize: 18,
    fontWeight: "500",
  },
  nomeLocal: {
    fontSize: 12,
    fontWeight: "300",
  },
  subtitulo: {
    textAlign: "justify",
    margin: 10,
    fontSize: 16,
  },
});
