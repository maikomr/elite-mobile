import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";

import RootCategoryCard from "../../components/RootCategoryCard";
import ROUTES from "../../constants/routes";

const CoursesScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <Layout style={styles.container} level="4">
      <RootCategoryCard
        title="Pre Universitarios"
        onPress={() => navigation.push(ROUTES.COURSES.PRE_UNIVERSITARIOS.ROOT)}
      />
      <RootCategoryCard title="Universitarios" onPress={() => {}} />
      <RootCategoryCard title="Apoyo Escolar" onPress={() => {}} />
      <RootCategoryCard title="Desarrollo de Inteligencia" onPress={() => {}} />
    </Layout>
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
