import React, { useMemo, useEffect } from "react";
import { ScrollView, StyleSheet, View, Linking } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Layout, Text } from "@ui-kitten/components";
import Collapsible from "../components/Collapsible";
import { companyInfo } from "../constants/general";
import WhatsappButton from "../components/WhatsappButton";
import LiveesButton from "../components/LiveesButton";

const PrivateCourseDetailsScreen: React.FC<StackScreenProps<any>> = ({ navigation, route }) => {
  const subject = useMemo(() => route.params.subject.data(), [route.params.subject]);

  useEffect(() => navigation.setOptions({ title: subject?.name }), [subject]);

  const handleWhatsappPress = async () => {
    const msg = `Hola, solicito inscribirme al curso particular de "${subject?.name}"`;
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
      await Linking.openURL(subject.liveesCheckoutUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        {subject.description.split("\\n").map((paragraph: string, i: number) => (
          <Text style={styles.descriptionParagraph} key={`description-paragraph-${i}`}>
            {paragraph}
          </Text>
        ))}
        {subject?.topics?.length && (
          <View style={styles.field}>
            <Collapsible title="Qué vas a aprender?" initiallyOpen={true}>
              <View style={styles.collapsibleBody}>
                {subject.topics.map((topic: any) => (
                  <View style={styles.topicRow} key={topic}>
                    <Text style={styles.descriptionParagraph}>{topic}</Text>
                  </View>
                ))}
              </View>
            </Collapsible>
          </View>
        )}
        <Text style={[styles.field, styles.hourlyRate]}>Precio por hora: {subject.hourlyRate}Bs.</Text>
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
  descriptionParagraph: {
    marginBottom: 5,
    fontSize: 16,
  },
  field: {
    marginTop: 20,
    fontSize: 16,
  },
  label: {
    fontWeight: "bold",
  },
  hourlyRate: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  collapsibleBody: {
    marginTop: 10,
  },
  topicRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    marginHorizontal: 30,
  },
});

export default PrivateCourseDetailsScreen;
