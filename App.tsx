import React from "react";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import DrawerContent from "./components/DrawerContent";
import AboutUsScreen from "./screens/AboutUsScreen";
import CoursesScreen from "./screens/CoursesScreen";
import GalleryScreen from "./screens/GalleryScreen";
import HomeScreen from "./screens/HomeScreen";

import ROUTES from "./constants/routes";

import { default as customTheme } from "./custom-theme.json";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName={ROUTES.HOME} drawerContent={DrawerContent}>
            <Drawer.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Drawer.Screen name={ROUTES.COURSES} component={CoursesScreen} />
            <Drawer.Screen name={ROUTES.GALLERY} component={GalleryScreen} />
            <Drawer.Screen name={ROUTES.ABOUT_US} component={AboutUsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
