import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase";
import "@firebase/firestore";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";

import CategoryCard from "../../components/CategoryCard";
import ROUTES from "../../constants/routes";
import { docType } from "../../utils/docType";

const FacultyListScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [faculties, setFaculties] = useState<docType[]>();

  useEffect(() => {
    const fetchFaculties = async () => {
      const snapshot = await firebase.firestore().collection("universities/umss-cochabamba/faculties").get();
      setFaculties(snapshot.docs);
    };
    fetchFaculties();
  }, []);

  const renderFaculty: ListRenderItem<docType> = useCallback(({ item: faculty }) => {
    const data = faculty.data();
    return (
      <CategoryCard
        name={data.name}
        onPress={() =>
          navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.FACULTY_DETAILS, {
            faculty,
          })
        }
      />
    );
  }, []);

  if (!faculties) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="2">
      <FlatList data={faculties} renderItem={renderFaculty} keyExtractor={(faculty) => `faculty-${faculty.id}`} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  loadingStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FacultyListScreen;
