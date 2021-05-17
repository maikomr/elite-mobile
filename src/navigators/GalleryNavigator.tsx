import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";

import GalleryScreen from "../screens/GalleryScreen";
import MenuButton from "../components/MenuButton";

import ROUTES from "../constants/routes";

const Stack = createStackNavigator();

const GalleryNavigator: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Stack.Navigator initialRouteName={ROUTES.GALLERY}>
    <Stack.Screen
      name={ROUTES.GALLERY}
      component={GalleryScreen}
      options={{
        headerLeft: (props) => (
          <MenuButton {...props} onPress={navigation.openDrawer} />
        ),
        title: 'Galería',
        headerTitleAlign: "center"
      }}
    />
  </Stack.Navigator>
);

export default GalleryNavigator;
