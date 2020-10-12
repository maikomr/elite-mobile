import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase";
import "@firebase/firestore";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";

import CategoryCard from "../../components/CategoryCard";
import ROUTES from "../../constants/routes";
import { docType } from "../../utils/docType";

const PrivateCourseListScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [subjects, setSubjects] = useState<docType[]>();

  useEffect(() => {
    const fetchFaculties = async () => {
      const snapshot = await firebase.firestore().collection("subjects").get();
      setSubjects(snapshot.docs);
    };
    fetchFaculties();
  }, []);

  const renderSubject: ListRenderItem<docType> = useCallback(({ item: subject }) => {
    const data = subject.data();
    return (
      <CategoryCard
        name={data.name}
        onPress={() =>
          navigation.push(ROUTES.COURSES.PRIVATE.PRIVATE_COURSE_DETAILS, {
            subject,
          })
        }
      />
    );
  }, []);

  if (!subjects) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="2">
      <FlatList data={subjects} renderItem={renderSubject} keyExtractor={(subject) => `subject-${subject.id}`} />
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

export default PrivateCourseListScreen;
