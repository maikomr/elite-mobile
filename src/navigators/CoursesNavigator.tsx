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
  <Stack.Navigator initialRouteName={ROUTES.COURSES} screenOptions={{ headerTitleAlign: "center" }}>
    <Stack.Screen
      name={ROUTES.COURSES}
      component={CoursesScreen}
      options={{
        headerLeft: (props) => <MenuButton {...props} onPress={navigation.openDrawer} />,
        title: "Cursos",
      }}
    />
    <Stack.Screen
      name={ROUTES.PRE_UNIVERSITY_COURSES}
      component={CollegeListScreen}
      options={{ title: "Cursos Pre Universitarios" }}
    />
    <Stack.Screen name={ROUTES.FACULTY_DETAILS} component={FacultyDetailsScreen} />
    <Stack.Screen name={ROUTES.PRE_UNIVERSITY_SUBJECT_DETAILS} component={PreUniversitySubjectScreen} />
    <Stack.Screen
      name={ROUTES.ENROLLMENT_OPTIONS}
      component={EnrollmentOptionsScreen}
      options={{ title: "Opciones de Inscripción" }}
    />
    <Stack.Screen
      name={ROUTES.SUBJECT_COURSES}
      component={PrivateCourseListScreen}
      options={{ title: "Cursos Particulares" }}
    />
    <Stack.Screen name={ROUTES.SUBJECT_COURSE_DETAILS} component={PrivateCourseDetailsScreen} />
    <Stack.Screen
      name={ROUTES.ACADEMIC_LEVELING}
      component={AcademicLevelingScreen}
      options={{ title: "Apoyo Escolar" }}
    />
    <Stack.Screen name={ROUTES.ACADEMIC_LEVELING_DETAILS} component={AcademicLevelingDetailsScreen} />
    <Stack.Screen name={ROUTES.CHESS} component={ChessCourseScreen} options={{ title: "Ajedrez" }} />
  </Stack.Navigator>
);

export default CoursesNavigator;
