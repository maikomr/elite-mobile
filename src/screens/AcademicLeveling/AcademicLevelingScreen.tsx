import React, { useEffect, useState, useMemo } from 'react';
import firebase from 'firebase';
import '@firebase/firestore';
import { ScrollView, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import LoadingState from '../../components/LoadingState';
import CategoryCard from '../../components/CategoryCard';
import { StackScreenProps } from '@react-navigation/stack';
import ROUTES from '../../constants/routes';

const AcademicLevelingScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [academicLevelingCourses, setAcademicLevelingCourses] = useState<any[]>();

  useEffect(() => {
    const fetchAllAcademicLevelingCourses = async () => {
      try {
        const snapshot = await firebase.firestore().collection('academic-leveling').get();
        setAcademicLevelingCourses(snapshot.docs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllAcademicLevelingCourses();
  }, []);

  const sortedLevelingCourses = useMemo(() => {
    if (!academicLevelingCourses) return [];
    return academicLevelingCourses.sort((a: any, b: any) => {
      const titleA: string = a.data().title;
      const titleB: string = b.data().title;
      return titleA.localeCompare(titleB);
    });
  }, [academicLevelingCourses]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {!academicLevelingCourses ? <LoadingState /> :
        <Layout style={styles.container} level="2">
          {sortedLevelingCourses.map((levelingCourse: any) => {
            const data = levelingCourse.data();
            return (
              <CategoryCard
                key={data.id}
                name={data.title}
                onPress={() => navigation.push(ROUTES.COURSES.ACADEMIC_LEVELING.ACADEMIC_LEVELING_DETAILS, { data })}
              />
            );
          })}
        </Layout>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  }
});

export default AcademicLevelingScreen;
