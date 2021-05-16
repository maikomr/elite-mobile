import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase";
import "@firebase/firestore";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";

import CategoryCard from "../components/CategoryCard";
import ROUTES from "../constants/routes";
import { docType } from "../utils/docType";

const CollegeListScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [collegeList, setCollegeList] = useState<any[]>();

  useEffect(() => {
    const fetchCollegeList = async () => {
      const snapshot = await firebase.firestore().collection("universities/umss-cochabamba/faculties").get();
      setCollegeList(snapshot.docs);
    };
    fetchCollegeList();
  }, []);

  const renderListItem: ListRenderItem<docType> = useCallback(({ item: college }) => {
    const data = college.data();
    return (
      <CategoryCard
        name={data.name}
        onPress={() =>
          navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.FACULTY_DETAILS, {
            faculty: college,
          })
        }
      />
    );
  }, []);

  if (!collegeList) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="2">
      <FlatList data={collegeList} renderItem={renderListItem} keyExtractor={(college) => `college-${college.id}`} />
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

export default CollegeListScreen;
