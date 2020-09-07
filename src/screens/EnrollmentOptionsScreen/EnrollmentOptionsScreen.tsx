import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import stringifyDate from '../../utils/stringifyDate';

const EnrollmentOptionsScreen: React.FC<StackScreenProps<any>> = ({
  route,
}) => {
  const [enrollmentOptions, setEnrollmentOptions] = useState<any>();

  useEffect(() => {
    const fetchEnrollmentOptions = async () => {
      const snapshot = await route.params.faculty.ref
        .collection('courses')
        .get();
      const enrollmentOptions = snapshot.docs.map((s: any) => ({
        ...s.data(),
        id: s.id,
      }));
      setEnrollmentOptions(enrollmentOptions);
    };
    fetchEnrollmentOptions();
  }, [route.params.faculty]);

  if (!enrollmentOptions) {
    return (
      <Layout style={styles.loadingStateContainer}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.container}>
        {enrollmentOptions.map((enrollmentOption: any) => (
          <Text>{stringifyDate(enrollmentOption.startDate.toDate())}</Text>
        ))}
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
});

export default EnrollmentOptionsScreen;
