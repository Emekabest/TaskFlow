import ThemeRepository from "../repository/ThemeRepository";

class ThemeService {
  async setTheme(theme) {
    await ThemeRepository.setTheme(theme);
  }

  async getTheme() {
    return await ThemeRepository.getTheme();
  }
}

export default new ThemeService();
