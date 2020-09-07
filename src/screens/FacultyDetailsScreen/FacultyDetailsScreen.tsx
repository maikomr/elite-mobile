import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Layout,
  // IndexPath,
  Text,
  // Select,
  // SelectItem,
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
  // const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
  //   new IndexPath(0)
  // );
  // const enrollmentOptions = useMemo(
  //   () =>
  //     Object.keys(faculty.enrollmentOptions).sort((a, b) => a.localeCompare(b)),
  //   [faculty.enrollmentOptions]
  // );

  useEffect(() => {
    if (faculty.name) {
      navigation.setOptions({
        title: faculty.name,
      });
    }
  }, [faculty.name]);

  // const value = enrollmentOptions[(selectedIndex as IndexPath).row];
  // const getEnrollmentOption = (key: string) =>
  //   `${key} - ${faculty.enrollmentOptions[key]} Bs.`;

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
        {/* <Text style={styles.subtitle} category="h6">
        Duración
      </Text>
      <Select
        style={styles.selectDuration}
        selectedIndex={selectedIndex}
        value={getEnrollmentOption(value)}
        onSelect={setSelectedIndex}
      >
        {enrollmentOptions.map((key) => (
          <SelectItem key={key} title={getEnrollmentOption(key)} />
        ))}
      </Select> */}
        <Button
          onPress={() =>
            navigation.push(ROUTES.COURSES.PRE_UNIVERSITARIOS.CAREER_LIST, {
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
            navigation.push(ROUTES.COURSES.PRE_UNIVERSITARIOS.SUBJECT_LIST, {
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
          onPress={() => navigation.push(ROUTES.COURSES.PRE_UNIVERSITARIOS.ENROLLMENT_OPTIONS, {
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
  // selectDuration: {
  //   marginTop: 5,
  //   marginVertical: 40,
  // },
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
