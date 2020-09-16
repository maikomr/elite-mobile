import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';

import CategoryCard from '../../components/CategoryCard';
import { Subject } from '../../models/subject';
import ROUTES from '../../constants/routes';

const SubjectListScreen: React.FC<StackScreenProps<any>> = ({ navigation, route }) => {
  const [subjectList, setSubjectList] = useState<Subject[]>();

  useEffect(() => {
    const fetchSubjectList = async () => {
      const snapshots = await Promise.all(
        route.params.subjects.map((subjectRef: any) => subjectRef.get())
      );
      const subjectList = snapshots.map(
        (s: any) => ({ ...s.data(), id: s.id } as Subject)
      );
      setSubjectList(subjectList);
    };
    fetchSubjectList();
  }, [route.params.subjects]);

  const renderSubject: ListRenderItem<any> = ({ item: subject }) => (
    <CategoryCard
      name={subject.name}
      onPress={() => navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.PRE_UNIVERSITY_SUBJECT_DETAILS, { subject })}
    />
  );

  if (!subjectList) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container} level="2">
      <FlatList
        data={subjectList}
        renderItem={renderSubject}
        keyExtractor={(subject) => `subject-${subject.id}`}
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

export default SubjectListScreen;
