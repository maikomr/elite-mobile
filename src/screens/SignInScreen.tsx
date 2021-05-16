import { Text } from "@ui-kitten/components";
import * as WebBrowser from "expo-web-browser";
import firebase from "firebase";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import SignInWithGoogleButton from "../components/SignInWithGoogleButton";

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const [signInError, setSignInError] = useState();

  const handleCredentialRetrieved = (credential: firebase.auth.OAuthCredential) => {
    try {
      firebase.auth().signInWithCredential(credential);
    } catch (error) {
      setSignInError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SignInWithGoogleButton onCredentialRetrieved={handleCredentialRetrieved} />
      {signInError && <Text>{signInError}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
export default SignInScreen;
