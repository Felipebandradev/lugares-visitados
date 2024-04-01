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
      <View>
        <ScrollView>
          <Text> Álbum </Text>

          {figurinhas.map((figurinha) => {
            return (
              <Pressable>
                <View>
                  <Text>{figurinha.nome}</Text>
                  <Image
                    style={estilos.foto}
                    source={{ uri: `${figurinha.camera}` }}
                  />
                  <Text>{figurinha.nomeLocal}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  foto: {
    width: 150,
    height: 200,
    marginVertical: 18,
    borderRadius: 5,
  },
});
