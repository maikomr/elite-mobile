import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import '@firebase/firestore';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';

import CategoryCard from '../../components/CategoryCard';
import ROUTES from '../../constants/routes';

const FacultyListScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [facultyList, setFacultyList] = useState<any[]>();

  useEffect(() => {
    const fetchFacultyList = async () => {
      const snapshot = await firebase.firestore().collection('faculties').get();
      setFacultyList(snapshot.docs);
    };
    fetchFacultyList();
  }, []);

  const navigateToFacultyDetails = (item: any) => () =>
    navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.FACULTY_DETAILS, {
      faculty: item,
    });

  const renderFaculty: ListRenderItem<any> = ({ item: faculty }) => {
    const data = faculty.data();
    return (
      <CategoryCard
        name={data.name}
        onPress={navigateToFacultyDetails(faculty)}
      />
    );
  };

  if (!facultyList) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="2">
      <FlatList
        data={facultyList}
        renderItem={renderFaculty}
        keyExtractor={(faculty) => `faculty-${faculty.id}`}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FacultyListScreen;
