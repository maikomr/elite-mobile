import React, { useMemo, useEffect, useState } from 'react';
import firebase from 'firebase';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';

import { Faculty } from '../../models/faculty';
import CategoryCard from '../../components/CategoryCard';
import ROUTES from '../../constants/routes';

const FacultyListScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [faculties, setFaculties] = useState<Faculty[]>();

  useEffect(() => {
    const fetchFacultyList = async () => {
      const snapshot = await firebase.firestore().collection('faculties').get();
      setFaculties(snapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data as Faculty;
      }));
    };
    fetchFacultyList();
  }, []);

  const navigateToFacultyDetails = (id: number) =>
    navigation.push(ROUTES.COURSES.PRE_UNIVERSITARIOS.FACULTY_DETAILS, {
      facultyId: id,
    });

  const renderItem: ListRenderItem<Faculty> = ({ item }) => (
    <CategoryCard data={item} onPress={navigateToFacultyDetails} />
  );

  if (!faculties) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="4">
      <FlatList
        data={faculties}
        renderItem={renderItem}
        keyExtractor={(item) => `faculty-${item.id}`}
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
