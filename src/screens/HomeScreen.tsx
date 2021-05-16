import React from "react";
import { Linking, StyleSheet, View, Dimensions } from "react-native";
import { Layout, Text, Button, Icon } from "@ui-kitten/components";
import { DrawerScreenProps } from "@react-navigation/drawer";
import MapView, { Marker } from "react-native-maps";

import ROUTES from "../constants/routes";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { companyInfo } from "../constants/general";

const HomeScreen: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Layout style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.redText, styles.titleText]} category="h5">
          INSTITUTO{" "}
        </Text>
        <Text category="h5" style={styles.titleText}>
          ELITE
        </Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text category="h6" style={styles.subtitle}>
          Sé parte del cambio en la manera de enseñar y aprender.
        </Text>
        <Text category="h6" style={styles.subtitle}>
          Sé parte de la ÉLITE
        </Text>
      </View>
      <View style={styles.contactContainer}>
        <TouchableHighlight
          onPress={() => Linking.openURL(`tel:${companyInfo.phoneNumber}`)}
          underlayColor="#FAFBFC"
        >
          <View style={styles.contactItemContainer}>
            <Icon name="phone-outline" style={styles.icon} fill="#8F9BB3" />
            <Text>{companyInfo.phoneNumber}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() =>
            Linking.openURL(`tel:${companyInfo.mobilePhoneNumber}`)
          }
          underlayColor="#FAFBFC"
        >
          <View style={styles.contactItemContainer}>
            <Icon
              name="smartphone-outline"
              style={styles.icon}
              fill="#8F9BB3"
            />
            <Text>{companyInfo.mobilePhoneNumber}</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: companyInfo.headquartersLocation.latitude,
            longitude: companyInfo.headquartersLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          scrollEnabled={false}
        >
          <Marker
            coordinate={companyInfo.headquartersLocation}
            pinColor="red"
            title="Instituto Elite"
          />
        </MapView>
      </View>
      <Button
        style={styles.exploreBtn}
        onPress={() => navigation.navigate(ROUTES.COURSES.ROOT)}
        accessoryRight={(style) => (
          <Icon {...style} name="arrow-forward-outline" />
        )}
        size="large"
      >
        Explora nuestros cursos
      </Button>
    </Layout>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
  },
  titleText: {
    fontWeight: "bold",
  },
  subtitleContainer: {
    padding: 20,
  },
  subtitle: {
    textAlign: "center",
  },
  redText: {
    color: "red",
  },
  contactContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  contactItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  mapContainer: {
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8F9BB3",
    marginVertical: 20,
  },
  mapStyle: {
    width: Dimensions.get("window").width - 100,
    height: Dimensions.get("window").width - 100,
  },
  exploreBtn: {
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
});

export default HomeScreen;
