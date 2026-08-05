
export default ({ config })=> ({
    ...config,
    plugins: ["@react-native-community/datetimepicker"],
    extra: {
        ...config.expo?.extra, // Preserve existing properties
        API_URL: process.env.OPENAI_API_KEY,
        // eas: {
        //     projectId: "23723df3-76a2-4333-b942-bbd2003e47b5", // Ensure projectId is included
        // },
    }
});