import React from "react";
import { Provider } from "react-redux";
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

import ROUTES from "./src/constants/routes";
import store from "./src/store";

import { default as customTheme } from "./custom-theme.json";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName={ROUTES.HOME}
            drawerContent={DrawerContent}
          >
            <Drawer.Screen name={ROUTES.HOME} component={HomeNavigator} />
            <Drawer.Screen name={ROUTES.COURSES} component={CoursesNavigator} />
            <Drawer.Screen name={ROUTES.GALLERY} component={GalleryNavigator} />
            <Drawer.Screen
              name={ROUTES.ABOUT_US}
              component={AboutUsNavigator}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
