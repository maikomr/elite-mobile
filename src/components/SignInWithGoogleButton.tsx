import React, { useEffect, useState } from "react";
import { Button, Icon, Spinner } from "@ui-kitten/components";
import firebase from "firebase";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, View } from "react-native";

import googleSignInConfig from "../config/googleSignInConfig";

export interface SignInWithGoogleButtonProps {
  onCredentialRetrieved: (credential: firebase.auth.OAuthCredential) => void;
}

const SignInWithGoogleButton = ({ onCredentialRetrieved }: SignInWithGoogleButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleSignInConfig.webClientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      onCredentialRetrieved(credential);
    }
  }, [response]);

  const handleOnPress = () => {
    setIsLoading(true);
    promptAsync();
  };

  return (
    <Button
      disabled={!request}
      appearance="outline"
      onPress={handleOnPress}
      accessoryLeft={(props) =>
        isLoading ? (
          <View {...props} style={styles.indicator}>
            <Spinner size="small" />
          </View>
        ) : (
          <Icon {...props} name="google-outline" />
        )
      }
    >
      Iniciar Sesión con Google
    </Button>
  );
};

const styles = StyleSheet.create({
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SignInWithGoogleButton;
