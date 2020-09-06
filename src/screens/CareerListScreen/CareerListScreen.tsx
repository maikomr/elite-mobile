import React, { useMemo } from 'react';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';

import CategoryCard from '../../components/CategoryCard';

const CareerListScreen: React.FC<StackScreenProps<any>> = ({ route }) => {
  const careerList: string[] = useMemo(() => route.params.careerList, [
    route.params.careerList,
  ]);

  const renderCareer: ListRenderItem<any> = ({ item: career }) => (
    <CategoryCard name={career} onPress={() => {}} />
  );

  return (
    <Layout style={styles.container} level="2">
      <FlatList
        data={careerList}
        renderItem={renderCareer}
        keyExtractor={(career) => `career-${career}`}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});

export default CareerListScreen;
