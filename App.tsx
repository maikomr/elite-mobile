import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import SignInScreen from "./src/screens/SignInScreen";
import LoadingAuthScreen from "./src/screens/LoadingAuthScreen";
import DrawerContent from "./src/components/DrawerContent";
import HomeNavigator from "./src/navigators/HomeNavigator";
import CoursesNavigator from "./src/navigators/CoursesNavigator";
import GalleryNavigator from "./src/navigators/GalleryNavigator";
import AboutUsNavigator from "./src/navigators/AboutUsNavigator";

import ROUTES from "./src/constants/routes";
import { firebaseConfig } from "./src/firebaseConfig";

import { default as customTheme } from "./custom-theme.json";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const handleAuthStateChange = useCallback(async (user: any) => {
    setCurrentUser(user);
    setIsLoadingAuth(false);
  }, []);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(handleAuthStateChange);
    }
  }, [handleAuthStateChange]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <NavigationContainer>
          {currentUser ? (
            <Drawer.Navigator
              initialRouteName={ROUTES.HOME}
              drawerContent={DrawerContent}
            >
              <Drawer.Screen name={ROUTES.HOME} component={HomeNavigator} />
              <Drawer.Screen
                name={ROUTES.COURSES.ROOT}
                component={CoursesNavigator}
              />
              <Drawer.Screen
                name={ROUTES.GALLERY}
                component={GalleryNavigator}
              />
              <Drawer.Screen
                name={ROUTES.ABOUT_US}
                component={AboutUsNavigator}
              />
            </Drawer.Navigator>
          ) : (
            <Stack.Navigator>
              {isLoadingAuth ? (
                <Stack.Screen
                  name="LoadingAuth"
                  component={LoadingAuthScreen}
                  options={{ headerShown: false }}
                />
              ) : (
                <Stack.Screen
                  name="Iniciar Sesión"
                  component={SignInScreen}
                  options={{ headerTitleAlign: "center" }}
                />
              )}
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
