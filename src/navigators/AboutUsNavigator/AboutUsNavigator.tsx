import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";

import AboutUsScreen from "../../screens/AboutUsScreen";
import MenuButton from "../../components/MenuButton";

import ROUTES from "../../constants/routes";

const Stack = createStackNavigator();

const AboutUsNavigator: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Stack.Navigator initialRouteName={ROUTES.ABOUT_US}>
    <Stack.Screen
      name={ROUTES.ABOUT_US}
      component={AboutUsScreen}
      options={{
        headerLeft: (props) => (
          <MenuButton {...props} onPress={navigation.openDrawer} />
        ),
        headerTitleAlign: "center"
      }}
    />
  </Stack.Navigator>
);

export default AboutUsNavigator;
