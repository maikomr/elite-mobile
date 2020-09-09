import React, { useMemo, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout, Text } from '@ui-kitten/components';
import stringifyDate from '../../utils/stringifyDate';

const AcademicLevelingDetailsScreen: React.FC<StackScreenProps<any>> = ({ navigation, route }) => {
  const data = useMemo(() => route.params.data, [route.params.data]);
  useEffect(() => navigation.setOptions({ title: route.params.data.title }), [route.params.data]);

  return (
    <ScrollView>
      <Layout style={styles.container}>
      <Text>{data.title}</Text>
      <Text>{data.description}</Text>
      <Text>{data.monthlyRate}</Text>
      <Text>{stringifyDate(data.startDate.toDate())}</Text>
      </Layout>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});

export default AcademicLevelingDetailsScreen;
