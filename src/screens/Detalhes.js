import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
} from "react-native";

import marcadorEstrela from "../../assets/images/marcadorEstrela.png";
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";

export default function Detalhes({ route }) {
  const { figurinha } = route.params;

  const mapaSalvo = {
    latitude: figurinha.localizacao.latitude,
    longitude: figurinha.localizacao.longitude,
    latitudeDelta: figurinha.localizacao.latitudeDelta,
    longitudeDelta: figurinha.localizacao.longitudeDelta,
  };

  const compartilharFoto = async () => {
    await Sharing.shareAsync(figurinha.camera);
  };

  return (
    <>
      <StatusBar color="#f7f7f7" />
      <View style={estilos.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={estilos.subcontainer}
        >
          <View style={estilos.fotoca}>
            <Text style={estilos.titulo}>{figurinha.nome}</Text>
            <Image
              style={estilos.fotoLocal}
              source={{ uri: `${figurinha.camera}` }}
            />

            <Pressable onPress={compartilharFoto} style={estilos.botao}>
              <View style={estilos.botaoIcone}>
                <Text style={estilos.textoBotao}>Compartilhar Foto</Text>
                <Entypo name="share" size={18} color="#f7f7f7" />
              </View>
            </Pressable>
          </View>

          <View style={estilos.verLocal}>
            <Text style={estilos.titulo}>{figurinha.nomeLocal}</Text>
            <MapView
              style={estilos.fotoLocal}
              mapType="hybrid"
              region={mapaSalvo}
              scrollEnabled={false}
            >
              <Marker coordinate={mapaSalvo}>
                <Image
                  resizeMode="contain"
                  style={estilos.marcardor}
                  source={marcadorEstrela}
                />
              </Marker>
            </MapView>
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

  titulo: {
    fontSize: 18,
    padding: 12,
    borderRadius: 5,
  },
});
