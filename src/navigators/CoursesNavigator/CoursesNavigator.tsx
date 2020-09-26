import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

import ROUTES from '../../constants/routes';

import CoursesScreen from '../../screens/CoursesScreen';
import FacultyListScreen from '../../screens/FacultyListScreen';
import FacultyDetailsScreen from '../../screens/FacultyDetailsScreen';
import CareerListScreen from '../../screens/CareerListScreen';
import SubjectListScreen from '../../screens/SubjectlistScreen';
import PreUniversitySubjectScreen from '../../screens/PreUniversitySubjectScreen';
import SchoolSupportScreen from '../../screens/SchoolSupportScreen';
import EnrollmentOptionsScreen from '../../screens/EnrollmentOptionsScreen';
import MenuButton from '../../components/MenuButton';
import AcademicLevelingScreen from '../../screens/AcademicLeveling';
import AcademicLevelingDetailsScreen from '../../screens/AcademicLevelingDetailsScreen';
import ChessCourseScreen from '../../screens/ChessCourseScreen';

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
        title: 'Course'
      }}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITY.ROOT}
      component={FacultyListScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITY.FACULTY_DETAILS}
      component={FacultyDetailsScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITY.CAREER_LIST}
      component={CareerListScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITY.SUBJECT_LIST}
      component={SubjectListScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITY.PRE_UNIVERSITY_SUBJECT_DETAILS}
      component={PreUniversitySubjectScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITY.ENROLLMENT_OPTIONS}
      component={EnrollmentOptionsScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.SCHOOL_SUPPORT.ROOT}
      component={SchoolSupportScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.SCHOOL_SUPPORT.ACADEMIC_LEVELING}
      component={AcademicLevelingScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.SCHOOL_SUPPORT.ACADEMIC_LEVELING_DETAILS}
      component={AcademicLevelingDetailsScreen}
    />
    <Stack.Screen
      name={ROUTES.COURSES.CHESS}
      component={ChessCourseScreen}
    />
  </Stack.Navigator>
);

export default CoursesNavigator;
