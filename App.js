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

import imagemBase from "./assets/images/imagemBase.png";
import mapaBase from "./assets/images/mapaBase.png";
import marcadorEstrela from "./assets/images/marcadorEstrela.png";
import MapView, { Marker } from "react-native-maps";
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

  const tirarFotoLocal = async () => {
    const foto = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!foto.canceled) {
      setCamera(foto.assets[0].uri);
    }
  };

  const melocaliza = () => {
    setLocalizacao({
      latitude: euMapa.coords.latitude,
      longitude: euMapa.coords.longitude,

      latitudeDelta: 0.001,
      longitudeDelta: 0.002,
    });
  };

  return (
    <>
      <StatusBar color="#f7f7f7" />
      <View style={estilos.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={estilos.titulo}> Fotos de lugares visitados</Text>
          <TextInput
            style={estilos.campoNomeLugar}
            placeholder="Digite o nome do local"
          />

          <View style={estilos.fotoca}>
            <Image
              style={estilos.fotoLocal}
              source={camera ? { uri: camera } : imagemBase}
            />
            <Pressable onPress={tirarFotoLocal} style={estilos.botao}>
              <Text style={estilos.textoBotao}>Tirar Foto</Text>
            </Pressable>
          </View>

          <View style={estilos.verLocal}>
            {localizacao ? (
              <MapView
                style={estilos.fotoLocal}
                mapType="hybrid"
                region={localizacao}
                scrollEnabled={false}
              >
                <Marker coordinate={localizacao}>
                  <Image
                    resizeMode="contain"
                    style={estilos.marcardor}
                    source={marcadorEstrela}
                  />
                </Marker>
              </MapView>
            ) : (
              <Image style={estilos.fotoLocal} source={mapaBase} />
            )}

            <Pressable onPress={melocaliza} style={estilos.botao}>
              <Text style={estilos.textoBotao}>Localizar no Mapa</Text>
            </Pressable>
          </View>
          <Text style={estilos.subtitulo}>Funções</Text>
          <View style={estilos.areaFuncoes}>
            <Pressable style={estilos.botao}>
              <Text style={estilos.textoBotao}>Limpar</Text>
            </Pressable>
            <Pressable style={estilos.botao}>
              <Text style={estilos.textoBotao}>Salvar</Text>
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
    marginVertical: 18,
    alignItems: "center",
  },
  fotoLocal: {
    width: 350,
    height: 300,
    marginVertical: 18,
    borderRadius: 5,
  },
  marcardor: {
    width: 60,
    height: 60,
  },
  botao: {
    backgroundColor: "#F1B215",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textoBotao: {
    color: "#f7f7f7",
    fontWeight: "bold",
    fontSize: 18,
  },
  campoNomeLugar: {
    borderColor: "#F1B215",
    padding: 12,
    borderWidth: 3,
    borderRadius: 5,
    marginVertical: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  titulo: {
    textAlign: "center",
    fontSize: 20,
    padding: 12,
    borderRadius: 5,
    margin: 10,
  },
  subtitulo: {
    textAlign: "center",
    fontSize: 18,
    margin: 10,
    padding: 12,
  },
  areaFuncoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
