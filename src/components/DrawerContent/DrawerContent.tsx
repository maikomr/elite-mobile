import React from "react";
import { StyleSheet, View } from 'react-native';
import { Drawer, DrawerItem, IndexPath, Text } from "@ui-kitten/components";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

import ROUTES from "../../constants/routes";

const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => (
  <View style={styles.container}>
    <Text category="h6" style={styles.headerText}>INSTITUTO ELITE</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 45,
    paddingHorizontal: 10
  },
  headerText: {
    marginBottom: 15
  }
});

export default DrawerContent;
