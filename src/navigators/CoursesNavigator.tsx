import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";

import ROUTES from "../constants/routes";

import CoursesScreen from "../screens/CoursesScreen";
import CollegeListScreen from "../screens/CollegeListScreen";
import FacultyDetailsScreen from "../screens/FacultyDetailsScreen";
import PreUniversitySubjectScreen from "../screens/PreUniversitySubjectScreen";
import EnrollmentOptionsScreen from "../screens/EnrollmentOptionsScreen";
import MenuButton from "../components/MenuButton";
import PrivateCourseListScreen from "../screens/PrivateCourseListScreen";
import PrivateCourseDetailsScreen from "../screens/PrivateCourseDetailsScreen";
import AcademicLevelingScreen from "../screens/AcademicLevelingScreen";
import AcademicLevelingDetailsScreen from "../screens/AcademicLevelingDetailsScreen";
import ChessCourseScreen from "../screens/ChessCourseScreen";

const Stack = createStackNavigator();

const CoursesNavigator: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Stack.Navigator initialRouteName={ROUTES.COURSES.ROOT} screenOptions={{ headerTitleAlign: "center" }}>
    <Stack.Screen
      name={ROUTES.COURSES.ROOT}
      component={CoursesScreen}
      options={{
        headerLeft: (props) => <MenuButton {...props} onPress={navigation.openDrawer} />,
        title: "Course",
      }}
    />
    <Stack.Screen name={ROUTES.COURSES.PRE_UNIVERSITY.ROOT} component={CollegeListScreen} />
    <Stack.Screen name={ROUTES.COURSES.PRE_UNIVERSITY.FACULTY_DETAILS} component={FacultyDetailsScreen} />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITY.PRE_UNIVERSITY_SUBJECT_DETAILS}
      component={PreUniversitySubjectScreen}
    />
    <Stack.Screen name={ROUTES.COURSES.PRE_UNIVERSITY.ENROLLMENT_OPTIONS} component={EnrollmentOptionsScreen} />
    <Stack.Screen name={ROUTES.COURSES.PRIVATE.ROOT} component={PrivateCourseListScreen} />
    <Stack.Screen name={ROUTES.COURSES.PRIVATE.PRIVATE_COURSE_DETAILS} component={PrivateCourseDetailsScreen} />
    <Stack.Screen name={ROUTES.COURSES.ACADEMIC_LEVELING.ROOT} component={AcademicLevelingScreen} />
    <Stack.Screen
      name={ROUTES.COURSES.ACADEMIC_LEVELING.ACADEMIC_LEVELING_DETAILS}
      component={AcademicLevelingDetailsScreen}
    />
    <Stack.Screen name={ROUTES.COURSES.CHESS} component={ChessCourseScreen} />
  </Stack.Navigator>
);

export default CoursesNavigator;
