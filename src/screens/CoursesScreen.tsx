import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";

import RootCategoryCard from "../components/RootCategoryCard";
import ROUTES from "../constants/routes";

const CoursesScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container} level="2">
        <RootCategoryCard
          title="Pre Universitarios"
          onPress={() => navigation.push(ROUTES.PRE_UNIVERSITY_COURSES)}
        />
        <RootCategoryCard
          title="Cursos Particulares"
          onPress={() => navigation.push(ROUTES.SUBJECT_COURSES)}
        />
        <RootCategoryCard
          title="Apoyo Escolar"
          onPress={() => navigation.push(ROUTES.ACADEMIC_LEVELING)}
        />
        <RootCategoryCard title="Ajedrez" onPress={() => navigation.push(ROUTES.CHESS)} />
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
});

export default CoursesScreen;
