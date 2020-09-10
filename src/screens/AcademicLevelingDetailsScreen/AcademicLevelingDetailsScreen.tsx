import React, { useMemo, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout, Text } from '@ui-kitten/components';
import stringifyDate from '../../utils/stringifyDate';

const AcademicLevelingDetailsScreen: React.FC<StackScreenProps<any>> = ({ navigation, route }) => {
  const data = useMemo(() => route.params.data, [route.params.data]);
  useEffect(() => navigation.setOptions({ title: route.params.data.title }), [route.params.data]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        {data.description.split('\\n').map((paragraph: string, i: number) => (
          <Text style={styles.descriptionParagraph} key={`description-paragraph-${i}`}>{paragraph}</Text>
        ))}
        <Text style={styles.field}><Text style={styles.label}>Duración:</Text> {data.duration} {`mes${data.duration > 1 ? 'es' : ''}`}</Text>
        <Text style={styles.field}><Text style={styles.label}>Inversión:</Text> {data.monthlyRate} Bs.</Text>
        <Text style={styles.field}><Text style={styles.label}>Inicio de clases:</Text> {stringifyDate(data.startDate.toDate())}</Text>
      </Layout>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  descriptionParagraph: {
    marginBottom: 5,
    fontSize: 16
  },
  field: {
    marginTop: 20,
    fontSize: 16
  },
  label: {
    fontWeight: 'bold'
  },
});

export default AcademicLevelingDetailsScreen;
