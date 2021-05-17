import React from "react";
import firebase from "firebase";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Drawer,
  DrawerItem,
  Icon,
  IndexPath,
  Text,
} from "@ui-kitten/components";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const currentUser = firebase.auth().currentUser;

  return (
    <View style={styles.container}>
      <Text category="h6" style={styles.headerTitle}>
        INSTITUTO ELITE
      </Text>
      {currentUser && (
        <View style={styles.userInfo}>
          {currentUser?.photoURL ? (
            <Avatar
              size="small"
              shape="rounded"
              source={{ uri: currentUser?.photoURL }}
            />
          ) : null}
          <Text style={styles.username}>{currentUser?.displayName || ""}</Text>
        </View>
      )}
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        <DrawerItem title="INICIO" />
        <DrawerItem title="CURSOS" />
        <DrawerItem title="GALERIA" />
        <DrawerItem title="QUIENES SOMOS" />
      </Drawer>
      <Button
        style={styles.logoutButton}
        size="medium"
        appearance="ghost"
        accessoryRight={(props) => <Icon {...props} name="log-out-outline" />}
        onPress={() => firebase.auth().signOut()}
      >
        Cerrar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 45,
    paddingHorizontal: 10,
  },
  headerTitle: {
    marginBottom: 15,
    textAlign: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  username: {
    marginLeft: 10,
    marginRight: "auto",
  },
  logoutButton: {
    marginTop: "auto",
    paddingHorizontal: 0,
    justifyContent: "space-between",
  },
});

export default DrawerContent;
