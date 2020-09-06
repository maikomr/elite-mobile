import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import '@firebase/firestore';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';

import CategoryCard from '../../components/CategoryCard';
import ROUTES from '../../constants/routes';
import { Faculty } from '../../models/faculty';

const FacultyListScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [facultyList, setFacultyList] = useState<Faculty[]>();

  useEffect(() => {
    const fetchFacultyList = async () => {
      const snapshot = await firebase.firestore().collection('faculties').get();
      const facultyList = snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Faculty)
      );
      setFacultyList(facultyList);
    };
    fetchFacultyList();
  }, []);

  const navigateToFacultyDetails = (item: any) => () =>
    navigation.push(ROUTES.COURSES.PRE_UNIVERSITARIOS.FACULTY_DETAILS, {
      faculty: item,
    });

  const renderFaculty: ListRenderItem<any> = ({ item: faculty }) => (
    <CategoryCard
      name={faculty.name}
      onPress={navigateToFacultyDetails(faculty)}
    />
  );

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
