import React from "react";
import { StyleSheet } from "react-native";
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
        headerStyle: styles.header,
        headerLeft: (props) => (
          <MenuButton {...props} onPress={navigation.openDrawer} />
        ),
        headerTitle: "",
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

export default HomeNavigator;
