import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import CategoryCard from '../../components/CategoryCard';
import { StackScreenProps } from '@react-navigation/stack';
import ROUTES from '../../constants/routes';

const ScoolSupportScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Layout style={styles.container} level="2">
      <CategoryCard name="Nivelación Academica" onPress={() => navigation.push(ROUTES.COURSES.SCHOOL_SUPPORT.ACADEMIC_LEVELING)} />
    </Layout>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});

export default ScoolSupportScreen;
