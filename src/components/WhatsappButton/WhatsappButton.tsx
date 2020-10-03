import { Button } from "@ui-kitten/components";
import React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export interface IWhatsappButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}
const WhatsappButton: React.FC<IWhatsappButtonProps> = ({ onPress }) => (
  <Button
    style={styles.button}
    onPress={onPress}
    accessoryRight={(_) => (
      <FontAwesome name="whatsapp" size={24} color="white" />
    )}
  >
    Reservar por Whatsapp
  </Button>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    backgroundColor: "#128c7e",
    borderColor: "#128c7e",
    justifyContent: "space-between",
    borderRadius: 10,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  }
})

export default WhatsappButton;
