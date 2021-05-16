import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Layout, Text, Button, Icon } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";
import { Faculty } from "../models/faculty";

import ROUTES from "../constants/routes";
import Collapsible from "../components/Collapsible";
import { docType } from "../utils/docType";

const FacultyDetailsScreen: React.FC<StackScreenProps<any>> = ({ navigation, route }) => {
  const [careers, setCareers] = useState<docType[]>([]);
  const facultyData: Faculty = useMemo(() => route.params.faculty.data(), [route.params.faculty]);

  useEffect(() => {
    const fetchCareers = async () => {
      const snapshot = await route.params.faculty.ref.collection("careers").get();
      setCareers(snapshot.docs);
    };
    fetchCareers();
  }, []);

  useEffect(() => {
    if (facultyData.name) {
      navigation.setOptions({
        title: facultyData.name,
      });
    }
  }, [facultyData.name]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        <Text style={styles.description}>{facultyData.description}</Text>
        <Text style={styles.subtitle} category="h6">
          {`Modalidad${facultyData.admissionTypes.length > 1 ? "es" : ""} de Admisión`}
        </Text>
        <View>
          {facultyData.admissionTypes.map((admissionPeriod: string) => (
            <View key={admissionPeriod}>
              <Text>{admissionPeriod}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.subtitle} category="h6">
          {`Fecha${facultyData.admissionPeriods.length > 1 ? "s" : ""} de Admisión`}
        </Text>
        <View>
          {facultyData.admissionPeriods.map((admissionPeriod: string) => (
            <View key={admissionPeriod}>
              <Text>{admissionPeriod}</Text>
            </View>
          ))}
        </View>
        <View style={styles.collapsible}>
          <Collapsible title="Carreras" initiallyOpen={false}>
            <View style={styles.collapsible}>
              {careers.map((careerDoc: docType) => (
                <View key={careerDoc.id}>
                  <Text>- {careerDoc.data().name}</Text>
                </View>
              ))}
            </View>
          </Collapsible>
        </View>
        <Button
          onPress={() =>
            navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.ENROLLMENT_OPTIONS, {
              faculty: route.params.faculty,
            })
          }
          style={[styles.button, styles.enrollmentButton]}
          accessoryRight={(style) => <Icon {...style} name="checkmark-circle-outline" />}
        >
          Inscribirse a este curso
        </Button>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  description: {
    lineHeight: 20,
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  collapsible: {
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
    justifyContent: "space-between",
  },
  enrollmentButton: {
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
});

export default FacultyDetailsScreen;
