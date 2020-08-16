import React, { useEffect } from "react";
import firebase from 'firebase';
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import DrawerContent from "./src/components/DrawerContent";
import HomeNavigator from "./src/navigators/HomeNavigator";
import CoursesNavigator from "./src/navigators/CoursesNavigator";
import GalleryNavigator from "./src/navigators/GalleryNavigator";
import AboutUsNavigator from "./src/navigators/AboutUsNavigator";

import { firebaseConfig } from "./src/constants/general";
import ROUTES from "./src/constants/routes";

import { default as customTheme } from "./custom-theme.json";

const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName={ROUTES.HOME}
            drawerContent={DrawerContent}
          >
            <Drawer.Screen name={ROUTES.HOME} component={HomeNavigator} />
            <Drawer.Screen name={ROUTES.COURSES.ROOT} component={CoursesNavigator} />
            <Drawer.Screen name={ROUTES.GALLERY} component={GalleryNavigator} />
            <Drawer.Screen
              name={ROUTES.ABOUT_US}
              component={AboutUsNavigator}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
