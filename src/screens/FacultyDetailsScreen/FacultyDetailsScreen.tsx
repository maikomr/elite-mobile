import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, IndexPath, Text, Select, SelectItem, Button } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';

const FacultyDetailsScreen: React.FC<StackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const faculty = useMemo(() => route.params.faculty, [route.params.faculty]);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath|IndexPath[]>(new IndexPath(0));
  const enrollmentOptions = useMemo(() => Object.keys(faculty.enrollmentOptions).sort((a, b) => a.localeCompare(b)), [faculty.enrollmentOptions]);

  useEffect(() => {
    navigation.setOptions({
      title: faculty.name,
    });
  }, [faculty.name]);

  const value = enrollmentOptions[(selectedIndex as IndexPath).row];
  const getEnrollmentOption = (key: string) => `${key} - ${faculty.enrollmentOptions[key]} Bs.`;

  return (
    <Layout style={styles.container}>
      <Text style={styles.subtitle} category="h6">
        Modalidad de Admisión
      </Text>
      <View>
        {faculty.admissionTypes.map((admissionPeriod: string) => (
          <View key={admissionPeriod}>
            <Text>{admissionPeriod}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle} category="h6">
        Fecha de Admisión
      </Text>
      <View>
        {faculty.admissionPeriods.map((admissionPeriod: string) => (
          <View key={admissionPeriod}>
            <Text>{admissionPeriod}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle} category="h6">
        Descripción
      </Text>
      <Text>{faculty.description}</Text>
      <Text style={styles.subtitle} category="h6">
        Duración
      </Text>
      <Select
        style={styles.selectDuration}
        selectedIndex={selectedIndex}
        value={getEnrollmentOption(value)}
        onSelect={setSelectedIndex}>
        {enrollmentOptions.map(key => (
          <SelectItem key={key} title={getEnrollmentOption(key)} />
        ))}
      </Select>
      <Button onPress={() => {}}>
        Inscribirse
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  selectDuration: {
    marginTop: 5,
    marginVertical: 40
  },
});

export default FacultyDetailsScreen;
