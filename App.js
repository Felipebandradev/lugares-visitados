import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import imagemBase from "./assets/images/imagemBase.jpg";
import MapView from "react-native-maps";
import { useEffect, useState } from "react";
/* Importando o imagePicker */
import * as ImagePicker from "expo-image-picker";

/* Importando o expo-location */
import * as Location from "expo-location";

export default function App() {
  const [localizacao, setLocalizacao] = useState(null);
  const [camera, setCamera] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [euMapa, setEuMapa] = useState(null);

  useEffect(() => {
    async function Obterpermissoes() {
      /* Pedindo permissão da camera */
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");

      /* Pedindo permissão  Localização */
      const { status: posicaoMapa } =
        await Location.requestForegroundPermissionsAsync();

      if (posicaoMapa !== "granted") {
        Alert.alert("Ops", "Você não permitiu sua localização");
        return;
      }

      /* Armazenando os dados da localização atual */
      try {
        let meuLocal = await Location.getCurrentPositionAsync({});
        setEuMapa(meuLocal);
      } catch (error) {
        console.error(error);
      }
    }

    Obterpermissoes();
  }, []);

  const tirarFotoLocal = async () => {};

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
            <Pressable onPress={tirarFotoLocal} style={estilos.botao}>
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
