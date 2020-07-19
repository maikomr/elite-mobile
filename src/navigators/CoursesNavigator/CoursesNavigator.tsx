import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";

import CoursesScreen from "../../screens/CoursesScreen";
import CategoryListScreen from "../../screens/CategoryListScreen";
import MenuButton from "../../components/MenuButton";

import ROUTES from "../../constants/routes";

const Stack = createStackNavigator();

const CoursesNavigator: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Stack.Navigator initialRouteName={ROUTES.COURSES}>
    <Stack.Screen
      name={ROUTES.COURSES}
      component={CoursesScreen}
      options={{
        headerLeft: (props) => (
          <MenuButton {...props} onPress={navigation.openDrawer} />
        ),
        headerTitleAlign: "center",
      }}
    />
    <Stack.Screen
      name={ROUTES.CATEGORY_LIST}
      component={CategoryListScreen}
      options={{
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

export default CoursesNavigator;
