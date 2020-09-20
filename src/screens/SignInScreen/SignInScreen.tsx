import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text } from "react-native";

const SignInScreen = () => {
  const [signInError, setSignInError] = useState();

  // const isUserEqual = (googleUser: any, firebaseUser: any) => {
  //   console.log(googleUser.user.id);
  //   console.log(firebaseUser.providerData[0].uid);
  //   if (firebaseUser) {
  //     var providerData = firebaseUser.providerData;
  //     for (var i = 0; i < providerData.length; i++) {
  //       if (
  //         providerData[i].providerId ===
  //           firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
  //         providerData[i].uid === googleUser.user.id
  //       ) {
  //         // We don't need to reauth the Firebase connection.
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };

  // const onSignIn = (googleUser: any) => {
  //   var unsubscribe = firebase
  //     .auth()
  //     .onAuthStateChanged(async (firebaseUser) => {
  //       unsubscribe();
  //       if (!isUserEqual(googleUser, firebaseUser)) {
  //         const credential = firebase.auth.GoogleAuthProvider.credential(
  //           googleUser.idToken,
  //           googleUser.accessToken
  //         );
  //         try {
  //           await firebase.auth().signInWithCredential(credential);
  //         } catch (error) {
  //           // Handle Errors here.
  //           // var errorCode = error.code;
  //           // var errorMessage = error.message;
  //           // The email of the user's account used.
  //           // var email = error.email;
  //           // The firebase.auth.AuthCredential type that was used.
  //           // var credential = error.credential;
  //           // ...
  //         }
  //       } else {
  //         console.log("User already signed-in Firebase.");
  //       }
  //     });
  // };

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
        // onSignIn(result);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        await firebase.auth().signInWithCredential(credential);
      }
    } catch (e) {
      setSignInError(e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Sign In With Google" onPress={signInWithGoogle} />
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
});
export default SignInScreen;
