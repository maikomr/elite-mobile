import React, { useEffect, useMemo } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { companyInfo } from "../../constants/general";
import { StackScreenProps } from "@react-navigation/stack";
import WhatsappButton from "../../components/WhatsappButton/WhatsappButton";
import LiveesButton from "../../components/LiveesButton/LiveesButton";
import { Subject } from "../../models/subject";

const PreUniversitySubjectScreen: React.FC<StackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const subject: Subject = useMemo(() => route.params.subject, [
    route.params.subject,
  ]);

  useEffect(() => {
    if (subject.name) {
      navigation.setOptions({
        title: subject.name,
      });
    }
  }, [subject.name]);

  const handleWhatsappPress = async () => {
    const msg = `Hola, quisiera inscribirme a la materia de ${subject.name}`;
    const url = `whatsapp://send?text=${msg}&phone=${companyInfo.mobilePhoneNumber}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLiveesPress = async () => {
    const url = `https://lck.page.link/CgVT`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container} level="2">
        <Text style={styles.subtitle} category="h6">
          Duration
        </Text>
        <Text style={styles.paragraph}>{subject.duration}</Text>
        <Text style={styles.priceText}>Inversión: {subject.monthlyRate}</Text>
        <View style={styles.button}>
          <WhatsappButton onPress={handleWhatsappPress} />
        </View>
        <View style={styles.button}>
          <LiveesButton onPress={handleLiveesPress} />
        </View>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 5,
    fontSize: 16,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 30,
  },
});

export default PreUniversitySubjectScreen;
