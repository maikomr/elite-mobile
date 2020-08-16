import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";

import CoursesScreen from "../../screens/CoursesScreen";
import FacultyListScreen from "../../screens/FacultyListScreen";
import MenuButton from "../../components/MenuButton";

import ROUTES from "../../constants/routes";

const Stack = createStackNavigator();

const CoursesNavigator: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Stack.Navigator initialRouteName={ROUTES.COURSES.ROOT}>
    <Stack.Screen
      name={ROUTES.COURSES.ROOT}
      component={CoursesScreen}
      options={{
        headerLeft: (props) => (
          <MenuButton {...props} onPress={navigation.openDrawer} />
        ),
        headerTitleAlign: "center",
      }}
    />
    <Stack.Screen
      name={ROUTES.COURSES.PRE_UNIVERSITARIOS.ROOT}
      component={FacultyListScreen}
      options={{
        headerTitleAlign: "center",
        title: "Pre Universitarios",
      }}
    />
  </Stack.Navigator>
);

export default CoursesNavigator;
