import React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

import CoursesScreen from '../../screens/CoursesScreen';
import FacultyListScreen from '../../screens/FacultyListScreen';
import FacultyDetailsScreen from '../../screens/FacultyDetailsScreen';
import MenuButton from '../../components/MenuButton';

import ROUTES from '../../constants/routes';
import CareerListScreen from '../../screens/CareerListScreen';

const Stack = createStackNavigator();

const CoursesNavigator: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName={ROUTES.COURSES.ROOT}
    screenOptions={{ headerTitleAlign: 'center' }}
  >
    <Stack.Screen
      name={ROUTES.COURSES.ROOT}
      component={CoursesScreen}
      options={{
        headerLeft: (props) => (
          <MenuButton {...props} onPress={navigation.openDrawer} />
        ),
      }}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITARIOS.ROOT}
      component={FacultyListScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITARIOS.FACULTY_DETAILS}
      component={FacultyDetailsScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITARIOS.CAREER_LIST}
      component={CareerListScreen}
    />
  </Stack.Navigator>
);

export default CoursesNavigator;
