import AsyncStorage from "@react-native-async-storage/async-storage";

class ThemeRepository {
  STORAGE_KEY = "theme_";

  async setTheme(theme) {
    await AsyncStorage.setItem(this.STORAGE_KEY, theme);
  }

  async getTheme() {
    return await AsyncStorage.getItem(this.STORAGE_KEY);
  }
}

export default new ThemeRepository();
