import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import Fonts from "../constants/font";
import useThemeStore from "../repository/store";
import DarkTheme from "../theme/darkTheme";
import LightTheme from "../theme/lightTheme";

// Displays a centered loading modal while a background task is in progress.
const Loader = ({ visible, text }) => {
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? DarkTheme : LightTheme;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalBox, { backgroundColor: theme.background, borderColor: theme.border }] }>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  modalBox: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  text: {
    fontFamily: Fonts.BodyMedium,
    marginTop: 8,
  },
});

export default Loader;

