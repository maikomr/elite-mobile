import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Spinner,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Icon,
} from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import stringifyDate from '../../utils/stringifyDate';

const EnrollmentOptionsScreen: React.FC<StackScreenProps<any>> = ({
  route,
}) => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [selectedShiftIndex, setSelectedShiftIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [selectedDurationIndex, setSelectedDurationIndex] = useState<IndexPath>(
    new IndexPath(0)
  );

  const [availableCourses, setAvailableCourses] = useState<any>();

  const startDateOptions = useMemo(
    () =>
      availableCourses
        ? availableCourses
            .map((course: any) => course.startDate.toDate())
            .sort((a: Date, b: Date) => a > b)
            .map((d: Date) => stringifyDate(d))
        : [],
    [availableCourses]
  );

  const shiftOptions = useMemo(
    () =>
      availableCourses ? availableCourses[selectedCourseIndex.row].shifts : [],
    [availableCourses, selectedCourseIndex]
  );

  const priceByDurationMap = useMemo(
    () =>
      availableCourses
        ? availableCourses[selectedCourseIndex.row].priceByDurationMap
        : {},
    [availableCourses, selectedCourseIndex]
  );

  const durationOptions = useMemo(() => {
    return availableCourses
      ? Object.keys(priceByDurationMap).sort((a, b) => a.localeCompare(b))
      : [];
  }, [availableCourses, priceByDurationMap]);

  useEffect(() => {
    const fetchEnrollmentOptions = async () => {
      const snapshot = await route.params.faculty.ref
        .collection('courses')
        .get();
      const availableCourses = snapshot.docs.map((s: any) => ({
        ...s.data(),
        id: s.id,
      }));
      setAvailableCourses(availableCourses);
    };
    fetchEnrollmentOptions();
  }, [route.params.faculty]);

  useEffect(() => {
    if (!availableCourses) return;
    setSelectedShiftIndex(new IndexPath(0));
    const selectedCourse =
      availableCourses[(selectedCourseIndex as IndexPath).row];
    const defaultDurationIndex = selectedCourse.defaultDuration
      ? new IndexPath(
          durationOptions.indexOf(selectedCourse.defaultDuration.toString())
        )
      : new IndexPath(0);
    setSelectedDurationIndex(defaultDurationIndex);
  }, [availableCourses, selectedCourseIndex]);

  const getMonthStr = useCallback(
    (month) => `${month} mes${month == '1' ? '' : 'es'}`,
    []
  );

  const handleConfirm = () => {
    console.log('"Confirmar" pressed');
    // TODO: implement send whatsapp message
  };

  if (!availableCourses) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        <Text style={styles.overview}>
          Aqui podras seleccionar las opciones que se ajusten a tus necesidades.
        </Text>
        <Text style={styles.subtitle} category="h6">
          Fecha de inicio:
        </Text>
        <Select
          style={styles.select}
          selectedIndex={selectedCourseIndex}
          value={startDateOptions[selectedCourseIndex.row]}
          onSelect={(index: IndexPath | IndexPath[]) =>
            setSelectedCourseIndex(index as IndexPath)
          }
        >
          {startDateOptions.map((startDate: any) => (
            <SelectItem key={startDate} title={startDate} />
          ))}
        </Select>
        <Text style={styles.subtitle} category="h6">
          Turno:
        </Text>
        <Select
          style={styles.select}
          selectedIndex={selectedShiftIndex}
          value={shiftOptions[selectedShiftIndex.row]}
          onSelect={(index: IndexPath | IndexPath[]) =>
            setSelectedShiftIndex(index as IndexPath)
          }
        >
          {shiftOptions.map((shift: any) => (
            <SelectItem key={shift} title={shift} />
          ))}
        </Select>
        <Text style={styles.subtitle} category="h6">
          Duración:
        </Text>
        <Select
          style={styles.select}
          selectedIndex={selectedDurationIndex}
          value={getMonthStr(durationOptions[selectedDurationIndex.row])}
          onSelect={(index: IndexPath | IndexPath[]) =>
            setSelectedDurationIndex(index as IndexPath)
          }
        >
          {durationOptions.map((month: any) => (
            <SelectItem key={month} title={getMonthStr(month)} />
          ))}
        </Select>
        <Text style={styles.priceText}>
          {`Precio del curso: ${
            priceByDurationMap[durationOptions[selectedDurationIndex.row]]
          } Bs.`}
        </Text>
        <Button
          onPress={handleConfirm}
          style={styles.confirmButton}
          accessoryRight={(style) => (
            <Icon {...style} name="checkmark-circle-outline" />
          )}
        >
          confirmar
        </Button>
        <Text style={styles.notice}>
          Nota: Al confirmar se iniciará una conversación de Whatsapp en la que
          podras contactarte con nosotros y continuar con el proceso de
          inscripción.
        </Text>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overview: {
    marginBottom: 40,
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  select: {
    marginBottom: 40,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  confirmButton: {
    marginVertical: 40,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
  notice: {
    textAlign: 'center',
  },
});

export default EnrollmentOptionsScreen;
