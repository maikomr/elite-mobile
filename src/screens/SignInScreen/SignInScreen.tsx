import { Button, Icon, Spinner, Text } from "@ui-kitten/components";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const SignInScreen = () => {
  const [signInError, setSignInError] = useState();
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "720371133613-j7fugov615naq1iegs3naok75f26e0ul.apps.googleusercontent.com",
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        setIsLoadingAuth(true);
        firebase.auth().signInWithCredential(credential);
      }
    } catch (e) {
      setSignInError(e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        onPress={signInWithGoogle}
        appearance="outline"
        accessoryLeft={(props) =>
          isLoadingAuth ? (
            <View {...props} style={styles.indicator}>
              <Spinner size="small" />
            </View>
          ) : (
            <Icon {...props} name="google-outline" />
          )
        }
      >
        Iniciar Sesión Google
      </Button>
      {signInError && <Text>{signInError}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SignInScreen;
