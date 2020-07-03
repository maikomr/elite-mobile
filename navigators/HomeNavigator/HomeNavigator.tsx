import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";

import HomeScreen from "../../screens/HomeScreen";
import MenuButton from "../../components/MenuButton";

import ROUTES from "../../constants/routes";

const Stack = createStackNavigator();

const HomeNavigator: React.FC<DrawerScreenProps<any>> = ({ navigation }) => (
  <Stack.Navigator initialRouteName={ROUTES.HOME}>
    <Stack.Screen
      name={ROUTES.HOME}
      component={HomeScreen}
      options={{
        headerLeft: (props) => (
          <MenuButton {...props} onPress={navigation.openDrawer} />
        ),
        headerTitleAlign: "center",
        headerTitle: 'INSTITUTO ELITE'
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
