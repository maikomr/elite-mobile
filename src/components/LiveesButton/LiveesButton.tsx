import { Button } from "@ui-kitten/components";
import React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

export interface IWhatsappButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}
const LiveesButton: React.FC<IWhatsappButtonProps> = ({ onPress }) => (
  <Button
    style={styles.button}
    onPress={onPress}
    accessoryRight={(_) => (
      <MaterialIcons name="payment" size={24} color="white" />
    )}
  >
    Pagar con tarjeta
  </Button>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    backgroundColor: "#0C4767",
    borderColor: "#0C4767",
    justifyContent: "space-between",
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  }
})

export default LiveesButton;
