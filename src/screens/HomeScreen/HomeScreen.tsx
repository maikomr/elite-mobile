import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { DrawerScreenProps } from '@react-navigation/drawer';
import ROUTES from '../../constants/routes';

const HomeScreen: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Layout style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.redText} category="h5">
        INSTITUTO{' '}
      </Text>
      <Text category="h5">ELITE</Text>
    </View>
    <View style={styles.subtitleContainer}>
      <Text category="h6" style={styles.subtitle}>
        Sé parte del cambio en la manera de enseñar y aprender.
      </Text>
      <Text category="h6" style={styles.subtitle}>
        Sé parte de la ÉLITE
      </Text>
    </View>
    <View style={styles.contactContainer}>
      <View style={styles.contactItemContainer}>
        <Icon name="phone-outline" style={styles.icon} fill='#8F9BB3' />
        <Text>4483728</Text>
      </View>
      <View style={styles.contactItemContainer}>
        <Icon name="smartphone-outline"  style={styles.icon} fill='#8F9BB3'/>
        <Text>74837382</Text>
      </View>
    </View>
    <Button
      onPress={() => navigation.navigate(ROUTES.COURSES.ROOT)}
      accessoryRight={(style) => (
        <Icon {...style} name="arrow-forward-outline" />
      )}
      size="large"
    >
      Explora nuestros cursos
    </Button>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
  },
  subtitleContainer: {
    padding: 25,
  },
  subtitle: {
    textAlign: 'center',
  },
  redText: {
    color: 'red',
  },
  contactContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20
  },
  contactItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10
  }
});

export default HomeScreen;
