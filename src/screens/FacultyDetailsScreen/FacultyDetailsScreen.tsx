import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
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

const FacultyDetailsScreen: React.FC<StackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const faculty: Faculty = useMemo(() => route.params.faculty, [route.params.faculty]);
  // const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
  //   new IndexPath(0)
  // );
  // const enrollmentOptions = useMemo(
  //   () =>
  //     Object.keys(faculty.enrollmentOptions).sort((a, b) => a.localeCompare(b)),
  //   [faculty.enrollmentOptions]
  // );

  useEffect(() => {
    navigation.setOptions({
      title: faculty.name,
      headerStyle: styles.header,
    });
  }, [faculty.name]);

  // const value = enrollmentOptions[(selectedIndex as IndexPath).row];
  // const getEnrollmentOption = (key: string) =>
  //   `${key} - ${faculty.enrollmentOptions[key]} Bs.`;

  return (
    <Layout style={styles.container}>
      <Button
        onPress={() => {}}
        accessoryRight={(style) => (
          <Icon {...style} name="checkmark-circle-outline" />
        )}
      >
        Inscribirse
      </Button>
      <Text style={styles.subtitle} category="h6">
        {`Modalidad${faculty.admissionTypes.length > 1 ? 'es' : ''} de Admisión`}
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
      <Text style={styles.subtitle} category="h6">
        Descripción
      </Text>
      <Text>{faculty.description}</Text>
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
        onPress={() => {}}
        appearance="outline"
        style={styles.secondaryButton}
        accessoryRight={(style) => (
          <Icon {...style} name="arrow-ios-forward-outline" />
        )}
      >
        Ver carreras
      </Button>
      <Button
        onPress={() => {}}
        appearance="outline"
        style={styles.secondaryButton}
        accessoryRight={(style) => (
          <Icon {...style} name="arrow-ios-forward-outline" />
        )}
      >
        Ver materias
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    shadowOpacity: 0,
  },
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
  secondaryButton: {
    marginTop: 30,
    justifyContent: 'space-between'
  }
});

export default FacultyDetailsScreen;
