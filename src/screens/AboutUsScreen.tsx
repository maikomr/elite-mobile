import React from "react";
import { StyleSheet, Image, ScrollView, View, TouchableHighlight, Linking } from "react-native";
import { Layout, Text, Icon } from "@ui-kitten/components";
import { companyInfo } from "../constants/general";

const AboutUsScreen = () => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Layout style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/icon.png")} />
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </Text>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
      </Text>
      <View style={styles.strongTextContainer}>
        <Text style={styles.strong}>Contactanos!</Text>
      </View>
      <View style={styles.contactContainer}>
        <TouchableHighlight onPress={() => Linking.openURL(`tel:${companyInfo.phoneNumber}`)} underlayColor="#FAFBFC">
          <View style={styles.contactItemContainer}>
            <Icon name="phone-outline" style={styles.icon} fill="#8F9BB3" />
            <Text>{companyInfo.phoneNumber}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => Linking.openURL(`tel:${companyInfo.mobilePhoneNumber}`)}
          underlayColor="#FAFBFC"
        >
          <View style={styles.contactItemContainer}>
            <Icon name="smartphone-outline" style={styles.icon} fill="#8F9BB3" />
            <Text>{companyInfo.mobilePhoneNumber}</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.contactContainer}>
        <TouchableHighlight onPress={() => Linking.openURL(`mailto:${companyInfo.email}`)} underlayColor="#FAFBFC">
          <View style={styles.contactItemContainer}>
            <Icon name="email-outline" style={styles.icon} fill="#8F9BB3" />
            <Text>{companyInfo.email}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </Layout>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
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
  paragraph: {
    marginBottom: 15,
    fontSize: 18,
  },
  strong: {
    fontWeight: "bold",
    fontSize: 18,
  },
  strongTextContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
});

export default AboutUsScreen;
