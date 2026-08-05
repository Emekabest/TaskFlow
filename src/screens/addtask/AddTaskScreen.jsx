import { Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Constants from 'expo-constants';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import Fonts from "../../constants/font";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native"
import GenerateTaskId from "../../utils/generateTaskId";
import TaskService from "../../services/TaskService";
import useThemeStore from "../../repository/store";
import DarkTheme from "../../theme/darkTheme";
import LightTheme from "../../theme/lightTheme";
import { Ionicons } from "@expo/vector-icons";


const statusBarHeight = Constants.statusBarHeight;

const AddTaskScreen = () => {
    const navigation = useNavigation();
    const taskInputLimit = 30;
    const descriptionInputLimit = 100;
    const isDark = useThemeStore((state) => state.isDark);
    const theme = isDark ? DarkTheme : LightTheme;


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [taskErrorMsg, setTaskErrorMsg] = useState("");

    // Formats a selected date for user-friendly display in the form.
    const formatDueDate = (date) => {
        if (!date) {
            return "No due date";
        }

        return date.toLocaleDateString();
    };

    // Stores the chosen due date whenever the picker value changes.
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dueDate || new Date();
        setDueDate(currentDate);
        setShowDatePicker(false);
    };

    // Clears the selected due date when the user changes their mind.
    const handleClearDueDate = () => {
        setDueDate(null);
        setShowDatePicker(false);
    };

    // Validates the form and persists a new task before returning to the list.
    const handleSaveTask = async ()=>{

        if (title.trim() === ""){

            setTaskErrorMsg("Title is required.");
            return;
        }
        setTaskErrorMsg("");


        const newTask = {
            id:GenerateTaskId(),
            title: title.trim(),
            description:description.trim(),
            dueDate: dueDate ? dueDate.toISOString() : null,
            isCompleted:false,
        }

        console.log(newTask)
        const updatedTask =  await TaskService.addTask(newTask);

        if (updatedTask){
            navigation.goBack();
        }

    }





    

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}> 
            <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}> 
                <TouchableOpacity activeOpacity={1} onPress={()=> navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} color={theme.icon} />
                </TouchableOpacity>

                <View style={styles.addTaskTxtCont}>
                    <Text style={[styles.addTaskTxt, { color: theme.primary }]}>Add Task</Text>
                </View>
            </View>


            <View style={styles.InputSection}>
                <View style={[styles.inputCard, {marginTop:0, backgroundColor: theme.button, borderColor: theme.border}]}> 
                    <Text style={[styles.label, { color: theme.text }]}>Title</Text>
                    <TextInput
                        style={[styles.input, { color: theme.text }]}
                        placeholder="Write your title"
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor={theme.textSecondary}
                        maxLength={taskInputLimit}
                    />
                </View>
                <View style ={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={[styles.errorMsg, { color: theme.danger }]}>{taskErrorMsg}</Text>
                    <Text style={[styles.characterCount, { color: theme.textSecondary }]}>{title.length}/{taskInputLimit}</Text>
                </View>


                <View style={[styles.inputCard, { backgroundColor: theme.button, borderColor: theme.border }]}> 
                    <Text style={[styles.label, { color: theme.text }]}>Description (optional)</Text>
                    <TextInput
                        style={[styles.input, styles.descInput, { color: theme.text }]}
                        placeholder="Write a short description"
                        value={description}
                        onChangeText={setDescription}
                        placeholderTextColor={theme.textSecondary}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        maxLength={descriptionInputLimit}
                    />
                </View>
                <View>
                    <Text style={[styles.characterCount, { color: theme.textSecondary }]}>{description.length}/{descriptionInputLimit}</Text>
                </View>

                <View style={[styles.inputCard, { backgroundColor: theme.button, borderColor: theme.border, marginTop: 16 }]}> 
                    <Text style={[styles.label, { color: theme.text }]}>Due date (optional)</Text>
                    <View style={styles.dueDateRow}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.8} style={styles.dueDateValueWrapper}>
                            <Text style={[styles.input, { color: dueDate ? theme.text : theme.textSecondary }]}>
                                {formatDueDate(dueDate)}
                            </Text>
                        </TouchableOpacity>

                        {dueDate ? (
                            <TouchableOpacity onPress={handleClearDueDate} activeOpacity={0.8} style={styles.clearButton}>
                                <Text style={[styles.clearButtonText, { color: theme.danger }]}>Clear</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    {showDatePicker ? (
                        <DateTimePicker
                            value={dueDate || new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={handleDateChange}
                            themeVariant={isDark ? "dark" : "light"}
                        />
                    ) : null}
                </View>

                
                    <TouchableOpacity onPress={handleSaveTask} style={[styles.saveButton, { backgroundColor: theme.primary }]} activeOpacity={1}>
                        <Ionicons name="checkmark-circle-outline" color={isDark ? "#fff" : "#fff"} size={24} />
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
               
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: statusBarHeight,
        flex: 1,
    },

    header: {
        height: 50,
        width: "100%",
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        alignItems: "center",
        flexDirection: "row",
    },

    addTaskTxtCont: {
        marginLeft: 20,
    },

    addTaskTxt: {
        fontSize: 20,
        fontFamily: Fonts.HeaderSemiBold,
    },

    InputSection: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 24,
        
    },

    inputCard: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 14,
        marginTop: 16,
    },

    label: {
        fontSize: 14,
        fontFamily: Fonts.BodyMedium,
        marginBottom: 8,
    },

    input: {
        fontSize: 16,
        fontFamily: Fonts.BodyRegular,
        paddingVertical: 4,
    },

    dueDateRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },

    dueDateValueWrapper: {
        flex: 1,
    },

    clearButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
    },

    clearButtonText: {
        fontSize: 12,
        fontFamily: Fonts.BodySemiBold,
    },

    errorMsg:{
        fontSize: 12,
        fontFamily: Fonts.BodyMedium,
    },

    characterCount: {
        fontSize: 12,
        fontFamily: Fonts.BodyRegular,
        textAlign: "right",
        marginTop: 4,
    },

    descInput: {
        minHeight: 140,
        textAlignVertical: "top",
    },

    saveButton: {
        width:200,
        marginTop: "auto",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        position:"absolute",
        bottom:15,
        display:"flex",
        flexDirection:"row",
        left: (Dimensions.get("window").width - 200) / 2
    },

    saveButtonText: {
        fontSize: 16,
        fontFamily: Fonts.BodySemiBold,
        color: "#fff",
        paddingLeft:5
    },
});

export default AddTaskScreen;