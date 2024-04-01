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

export default function Album() {
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

  console.log(figurinhas);

  return (
    <>
      <StatusBar color="#f7f7f7" />
      <View style={estilos.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={estilos.titulo}> Álbum </Text>

          {figurinhas.map((figurinha) => {
            return (
              <View key={figurinha.nome} style={estilos.cardLocal}>
                <View>
                  <Image
                    style={estilos.foto}
                    source={{ uri: `${figurinha.camera}` }}
                  />
                </View>

                <View style={estilos.areaTexto}>
                  <Text style={estilos.tituloFoto}>{figurinha.nome}</Text>
                  <Text style={estilos.nomeLocal}>{figurinha.nomeLocal}</Text>
                </View>
              </View>
            );
          })}
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
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 16,
    gap: 5,
  },
});
