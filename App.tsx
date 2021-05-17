import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase";
import "@firebase/firestore";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import SignInScreen from "./src/screens/SignInScreen";
import LoadingAuthScreen from "./src/screens/LoadingAuthScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DrawerContent from "./src/components/DrawerContent";
import HomeNavigator from "./src/navigators/HomeNavigator";
import CoursesNavigator from "./src/navigators/CoursesNavigator";
import GalleryNavigator from "./src/navigators/GalleryNavigator";
import AboutUsNavigator from "./src/navigators/AboutUsNavigator";

import firebaseConfig from "./src/config/firebaseConfig";
import { default as customTheme } from "./custom-theme.json";
import { createStackNavigator } from "@react-navigation/stack";
import { docType } from "./src/utils/docType";

import ROUTES from "./src/constants/routes";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User>();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState<docType | null>();

  const fetchCurrentUser = useCallback(async () => {
    try {
      const userDoc = await firebase.firestore().collection("users").doc(firebaseUser?.uid).get();
      if (userDoc.exists) {
        setCurrentUser(userDoc as docType);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAuth(false);
    }
  }, [firebaseUser]);

  const handleAuthStateChange = useCallback(
    async (user: firebase.User | null) => {
      setFirebaseUser(user as any);
      if (user && (!firebaseUser || firebaseUser.uid !== user.uid)) {
        setIsLoadingAuth(true);
      } else {
        setCurrentUser(null);
        setIsLoadingAuth(false);
      }
    },
    [firebaseUser]
  );

  useEffect(() => {
    if (firebaseUser) fetchCurrentUser();
  }, [firebaseUser, fetchCurrentUser]);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(handleAuthStateChange);
    }
  }, [firebase.apps.length, handleAuthStateChange]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <NavigationContainer>
          {isLoadingAuth ? (
            <Stack.Navigator>
              <Stack.Screen name="LoadingAuth" component={LoadingAuthScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          ) : firebaseUser ? (
            currentUser ? (
              <Drawer.Navigator initialRouteName={ROUTES.HOME} drawerContent={DrawerContent}>
                <Drawer.Screen name={ROUTES.HOME} component={HomeNavigator} />
                <Drawer.Screen name={ROUTES.COURSES} component={CoursesNavigator} />
                <Drawer.Screen name={ROUTES.GALLERY} component={GalleryNavigator} />
                <Drawer.Screen name={ROUTES.ABOUT_US} component={AboutUsNavigator} />
              </Drawer.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen
                  name="Datos del Estudiante"
                  component={RegisterScreen}
                  options={{ headerTitleAlign: "center" }}
                  initialParams={{ onCreateUser: fetchCurrentUser }}
                />
              </Stack.Navigator>
            )
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Iniciar Sesión" component={SignInScreen} options={{ headerTitleAlign: "center" }} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
