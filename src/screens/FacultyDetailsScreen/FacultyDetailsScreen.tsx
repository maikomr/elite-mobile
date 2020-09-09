import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Layout,
  Text,
  Button,
  Icon,
} from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { Faculty } from '../../models/faculty';

import ROUTES from '../../constants/routes';

const FacultyDetailsScreen: React.FC<StackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const faculty: Faculty = useMemo(() => route.params.faculty.data(), [
    route.params.faculty,
  ]);

  useEffect(() => {
    if (faculty.name) {
      navigation.setOptions({
        title: faculty.name,
      });
    }
  }, [faculty.name]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        <Text>{faculty.description}</Text>
        <Text style={styles.subtitle} category="h6">
          {`Modalidad${
            faculty.admissionTypes.length > 1 ? 'es' : ''
          } de Admisión`}
        </Text>
        <View>
          {faculty.admissionTypes.map((admissionPeriod: string) => (
            <View key={admissionPeriod}>
              <Text>{admissionPeriod}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.subtitle} category="h6">
          {`Fecha${faculty.admissionPeriods.length > 1 ? 's' : ''} de Admisión`}
        </Text>
        <View>
          {faculty.admissionPeriods.map((admissionPeriod: string) => (
            <View key={admissionPeriod}>
              <Text>{admissionPeriod}</Text>
            </View>
          ))}
        </View>
        <Button
          onPress={() =>
            navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.CAREER_LIST, {
              careerList: faculty.careers || [],
            })
          }
          appearance="outline"
          style={styles.button}
          accessoryRight={(style) => (
            <Icon {...style} name="arrow-ios-forward-outline" />
          )}
        >
          Ver carreras
        </Button>
        <Button
          onPress={() =>
            navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.SUBJECT_LIST, {
              subjects: faculty.subjects || [],
            })
          }
          appearance="outline"
          style={styles.button}
          accessoryRight={(style) => (
            <Icon {...style} name="arrow-ios-forward-outline" />
          )}
        >
          Ver materias
        </Button>
        <Button
          onPress={() => navigation.push(ROUTES.COURSES.PRE_UNIVERSITY.ENROLLMENT_OPTIONS, {
            faculty: route.params.faculty,
          })}
          style={[styles.button, styles.enrollmentButton]}
          accessoryRight={(style) => (
            <Icon {...style} name="checkmark-circle-outline" />
          )}
        >
          Inscribirse a este curso
        </Button>
      </Layout>
    </ScrollView>
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
  button: {
    marginTop: 30,
    justifyContent: 'space-between',
  },
  enrollmentButton: {
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
});

export default FacultyDetailsScreen;
