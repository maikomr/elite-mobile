import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";

import AboutUsScreen from "../screens/AboutUsScreen";
import MenuButton from "../components/MenuButton";

import ROUTES from "../constants/routes";

const Stack = createStackNavigator();

const AboutUsNavigator: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Stack.Navigator initialRouteName={ROUTES.ABOUT_US}>
    <Stack.Screen
      name={ROUTES.ABOUT_US}
      component={AboutUsScreen}
      options={{
        headerStyle: styles.header,
        headerLeft: (props) => (
          <MenuButton {...props} onPress={navigation.openDrawer} />
        ),
        title: 'Quienes somos',
        headerTitleAlign: "center"
      }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default AboutUsNavigator;
