import React, { useEffect, useState } from "react";
import { Animated, Easing, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import Fonts from "../constants/font";
import useThemeStore from "../repository/store";
import DarkTheme from "../theme/darkTheme";
import LightTheme from "../theme/lightTheme";

const statusBarHeight = Constants.statusBarHeight;

// Shows the app drawer as a sliding panel with the theme toggle.
const DrawerNavigation = ({ visible, onClose }) => {
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? DarkTheme : LightTheme;
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [slideAnim] = useState(new Animated.Value(-300));

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(-300);
    }

    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -300,
      duration: 260,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [slideAnim, visible]);

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.overlay}>
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
              backgroundColor: theme.background,
              borderRightWidth: 1,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.drawerHeader}>
            <Text style={[styles.drawerTitle, { color: theme.text }]}>Menu</Text>
          </View>

          <View style={[styles.menuItem, { borderBottomColor: theme.border }]}>
            <Text style={[styles.menuText, { color: theme.text }]}>Dark mode</Text>
            <Switch
              value={isDark}
              onValueChange={(value) => toggleTheme(value)}
              trackColor={{ false: "#d1d5db", true: theme.primary }}
              thumbColor="#fff"
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "75%",
    paddingHorizontal: 16,
    paddingTop: statusBarHeight,
    zIndex: 2,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  drawerTitle: {
    fontSize: 20,
    fontFamily: Fonts.HeaderSemiBold,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    fontFamily: Fonts.BodyRegular,
  },
});

export default DrawerNavigation;