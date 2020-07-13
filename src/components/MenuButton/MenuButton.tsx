import React from "react";
import { StyleSheet } from "react-native";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack";
import { Button, Icon } from "@ui-kitten/components";

const MenuButton = (props: StackHeaderLeftButtonProps) => (
  <Button
    {...props}
    style={styles.leftBtn}
    appearance="ghost"
    status="basic"
    accessoryLeft={(style) => (
      <Icon {...style} style={styles.icon} fill="#222B45" name="menu" />
    )}
  />
);

const styles = StyleSheet.create({
  leftBtn: {
    marginLeft: 5,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default MenuButton;
