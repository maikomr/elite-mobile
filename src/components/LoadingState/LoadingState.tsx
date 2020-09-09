import React from 'react';
import { Spinner, Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const LoadingState = () => (
  <Layout style={styles.loadingStateContainer}>
    <Spinner size="giant" />
  </Layout>
);

const styles = StyleSheet.create({
  loadingStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingState;
