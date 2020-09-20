import React from "react";
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

import ROUTES from "../../constants/routes";
import firebase from "firebase";

const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const currentUser = firebase.auth().currentUser;
  const username = currentUser?.displayName;
  const avatarUrl = currentUser?.photoURL;
  return (
    <View style={styles.container}>
      <Text category="h6" style={styles.headerTitle}>
        INSTITUTO ELITE
      </Text>
      {currentUser && (
        <View style={styles.userInfo}>
          {avatarUrl ? (
            <Avatar size="small" shape="rounded" source={{ uri: avatarUrl }} />
          ) : null}
          <Text style={styles.username}>{username || ""}</Text>
          <Button
            size="medium"
            appearance="ghost"
            accessoryLeft={(props) => (
              <Icon {...props} name="log-out-outline" />
            )}
          />
        </View>
      )}
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        <DrawerItem title={ROUTES.HOME} />
        <DrawerItem title={ROUTES.COURSES.ROOT} />
        <DrawerItem title={ROUTES.GALLERY} />
        <DrawerItem title={ROUTES.ABOUT_US} />
      </Drawer>
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
});

export default DrawerContent;
