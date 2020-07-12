import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";

import CoursePathCard from '../../components/CoursePathCard';

const CoursesScreen = () => {
  const [coursePaths] = useState([
    { id: 'course-path-1', title: 'Pre Universitarios' },
    { id: 'course-path-2', title: 'Universitarios' },
    { id: 'course-path-3', title: 'Apoyo Escolar' }
  ]);

  return (
    <Layout style={styles.container}>
      {coursePaths.map(coursePath => (
        <CoursePathCard key={coursePath.id} {...coursePath} />
      ))}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    alignContent: 'center'
  },
});

export default CoursesScreen;
