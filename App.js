import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
} from "react-native";

import imagemBase from "./assets/images/imagemBase.jpg";
import MapView from "react-native-maps";
import { useState } from "react";

export default function App() {
  const [localizacao, setLocalizacao] = useState(null);

  return (
    <>
      <StatusBar color="#f7f7f7" />
      <View style={estilos.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text> Fotos de lugares visitados</Text>
          <View style={estilos.verFoto}>
            <Image
              resizeMode="contain"
              style={estilos.fotoLocal}
              source={imagemBase}
            />
            <Pressable style={estilos.botao}>
              <Text style={estilos.textoBotao}>Tirar Foto</Text>
            </Pressable>
          </View>
          <View style={estilos.verLocal}>
            {localizacao ? (
              <MapView />
            ) : (
              <Image
                resizeMode="contain"
                style={estilos.fotoLocal}
                source={imagemBase}
              />
            )}

            <Pressable style={estilos.botao}>
              <Text style={estilos.textoBotao}>Localizar no Mapa</Text>
            </Pressable>
          </View>
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
    marginVertical: 18,
  },
  fotoLocal: {
    width: 300,
    height: 250,
    marginVertical: 18,
  },
});
