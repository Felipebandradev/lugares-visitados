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
  Vibration,
} from "react-native";

import imagemBase from "../../assets/images/imagemBase.png";
import mapaBase from "../../assets/images/mapaBase.png";
import marcadorEstrela from "../../assets/images/marcadorEstrela.png";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
/* Importando o imagePicker */
import * as ImagePicker from "expo-image-picker";

/* Importando o expo-location */
import * as Location from "expo-location";

/* Importando o Async storage */
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SalvarPasseio() {
  const [localizacao, setLocalizacao] = useState(null);
  const [camera, setCamera] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [statusLoc, requestPermissionLoc] = Location.useForegroundPermissions();
  const [euMapa, setEuMapa] = useState(null);
  const [nome, setNome] = useState("");
  const [nomeLocal, setNomeLocal] = useState("");

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
      requestPermissionLoc(posicaoMapa === "granted");
      /* Armazenando os dados da localização atual */
      try {
        let meuLocal = await Location.getCurrentPositionAsync({});
        setEuMapa(meuLocal);
        // Obtém o nome da rua com base na latitude e longitude
        const nomeLocal = await getStreetName(
          meuLocal.coords.latitude,
          meuLocal.coords.longitude
        );

        setNomeLocal(nomeLocal); // Define o nome da rua no estado
      } catch (error) {
        console.error(error);
      }
    }

    Obterpermissoes();
  }, []);

  const getStreetName = async (latitude, longitude) => {
    try {
      // Chama a função reverseGeocodeAsync para obter as informações de localização
      const locationInfo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // Verifica se foram retornadas informações de localização
      if (locationInfo && locationInfo.length > 0) {
        // Extrai o nome da rua das informações de localização
        const nomeLocal = locationInfo[0].street;
        return nomeLocal;
      } else {
        // Retorna null se não foram encontradas informações de localização
        return null;
      }
    } catch (error) {
      // Lida com erros, se houver algum
      console.error("Erro ao obter o nome da rua:", error);
      return null;
    }
  };

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

  const limpar = () => {
    setLocalizacao(null);
    setCamera(null);
  };

  const salvar = async () => {
    if (!camera || !localizacao || nome === "") {
      Alert.alert(
        "Ops!!",
        "Você precisa tirar a foto ou se localizar ou digitar o nome para salvar"
      );
      return;
    }

    try {
      const albumDeLocais = await AsyncStorage.getItem("@albumvisitei");

      const listaDeLocais = albumDeLocais ? JSON.parse(albumDeLocais) : [];
      const jaTemLocal = listaDeLocais.some((listaDeLocais) => {
        return listaDeLocais.nome === nome;
        // True or False
      });

      if (jaTemLocal) {
        Alert.alert("Ops!", "Você já salvou um local com esse nome");
        Vibration.vibrate(300);
        return;
      }

      listaDeLocais.push({ camera, localizacao, nome, nomeLocal });

      await AsyncStorage.setItem(
        "@albumvisitei",
        JSON.stringify(listaDeLocais)
      );

      Alert.alert(`Local Visitado`, `local ${nome} salvo com sucesso no Álbum`);
      Vibration.vibrate(300);
    } catch (error) {
      console.log("Deu ruim: " + error);

      Alert.alert("Erro", "erro ao salvar o local");
    }
  };

  return (
    <>
      <StatusBar color="#f7f7f7" />
      <View style={estilos.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={estilos.subcontainer}
        >
          <Text style={estilos.titulo}> Fotos de lugares visitados</Text>
          <TextInput
            style={estilos.campoNomeLugar}
            placeholder="Digite o nome do local da sua visita"
            onChangeText={(valor) => setNome(valor)}
            maxLength={40}
          />

          <View style={estilos.fotoca}>
            <Image
              style={estilos.fotoLocal}
              source={camera ? { uri: camera } : imagemBase}
            />
            <Pressable onPress={tirarFotoLocal} style={estilos.botao}>
              <View style={estilos.botaoIcone}>
                <Ionicons name="camera" size={18} color="#f7f7f7" />
                <Text style={estilos.textoBotao}>Tirar Foto</Text>
              </View>
            </Pressable>
          </View>

          {camera && (
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
                <View style={estilos.botaoIcone}>
                  <FontAwesome5
                    name="map-marked-alt"
                    size={18}
                    color="#f7f7f7"
                  />
                  <Text style={estilos.textoBotao}> Localizar </Text>
                </View>
              </Pressable>
            </View>
          )}

          {(camera || localizacao) && (
            <>
              <View style={estilos.areaFuncoes}>
                <Pressable onPress={limpar} style={estilos.botaoExcluir}>
                  <Text style={estilos.textoBotaoexcluir}>
                    <Ionicons name="trash-bin" size={16} /> Limpar
                  </Text>
                </Pressable>
                <Pressable onPress={salvar} style={estilos.botao}>
                  <Text style={estilos.textoBotao}>Salvar</Text>
                </Pressable>
              </View>
            </>
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
  subcontainer: {
    flexGrow: 1,
    justifyContent: "center",
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
    marginBottom: 24,
  },
  textoBotao: {
    color: "#f7f7f7",
    fontWeight: "bold",
    fontSize: 18,
  },
  botaoIcone: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 5,
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
  botaoExcluir: {
    borderColor: "red",
    borderWidth: 3,
    padding: 12,
    borderRadius: 5,
    marginBottom: 24,
  },
  textoBotaoexcluir: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});
