import { Spinner } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";

const LoadingAuthScreen = () => {
  return (
    <View style={styles.container}>
      <Spinner size='giant'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LoadingAuthScreen;
