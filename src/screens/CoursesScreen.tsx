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
          onPress={() => navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.ROOT)}
        />
        <RootCategoryCard
          title="Cursos Particulares"
          onPress={() => navigation.push(ROUTES.COURSES.PRIVATE.ROOT)}
        />
        <RootCategoryCard
          title="Apoyo Escolar"
          onPress={() => navigation.push(ROUTES.COURSES.ACADEMIC_LEVELING.ROOT)}
        />
        <RootCategoryCard title="Ajedrez" onPress={() => navigation.push(ROUTES.COURSES.CHESS)} />
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
