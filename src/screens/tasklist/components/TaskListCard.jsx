import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Checkbox from 'expo-checkbox';
import { memo, useMemo, useState } from "react";
import Fonts from "../../../constants/font";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TaskService from "../../../services/TaskService";
import Alert from "../../../components/Alert";
import useThemeStore from "../../../repository/store";
import DarkTheme from "../../../theme/darkTheme";
import LightTheme from "../../../theme/lightTheme";
import FormatDate from "../../../utils/formatDate";

// Displays a single task card with its title, description, due date, and delete action.
const TaskListCard = ({ id, title, desc, dueDate, isCompleted, fetchTasks }) => {
  const [isChecked, setChecked] = useState(isCompleted);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? DarkTheme : LightTheme;
  const isDescription = desc !== "";

  // Updates the completion state for the task and reflects it immediately in the UI.
  const handleCheck = async (value) => {
    setChecked(value);
    await TaskService.toggleTask(id);
  };

  // Removes the task after confirmation and refreshes the list from storage.
  const handleTaskDelete = async () => {
    await TaskService.deleteTask(id);
    setIsAlertVisible(false);
    fetchTasks();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.card,
        { maxHeight: isDescription ? 170 : 70, minHeight: 70 },
        
      ]}
    >
      <View style={styles.left}>
        <Checkbox
          value={isChecked}
          onValueChange={handleCheck}
          color={isChecked ? theme.primary : theme.checkbox}
          
        />
      </View>

      <View style={[styles.center, ]}> 
        <View style={[styles.textBlock, {justifyContent:"center"}]}>
          <Text style={[styles.taskTitle, { color: theme.text }]}>{title}</Text>
          {isDescription ? (
            <View style={styles.taskDescriptionCont}>
              <Text style={[styles.taskDescription, { color: theme.textSecondary }]}>{desc}</Text>
            </View>
          ) : null}

            {
                dueDate ?

                <View style={styles.dueDateContainer}>
                    <Text style={[styles.dueDateText, { color: theme.textSecondary }]}>{dueDate ? FormatDate(dueDate) : ""}</Text>
                </View>

                :

                <View />

            }

          
        </View>
      </View>

      <TouchableOpacity onPress={() => setIsAlertVisible(true)} activeOpacity={1} style={styles.right}>
        <FontAwesomeIcon icon={faTrash} size={19} color={theme.danger} />
      </TouchableOpacity>

      <Alert
        visible={isAlertVisible}
        question={`Delete "${title}"?`}
        onCancel={() => setIsAlertVisible(false)}
        onConfirm={handleTaskDelete}
        confirmText="Delete"
      />
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  
  left: {
    height: "100%",
    width: "10%",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 8,
    // backgroundColor:"green"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
    // backgroundColor:"red"
  },
  textBlock: {
    // backgroundColor:"green",
    paddingRight: 6,
  },
  taskDescriptionCont: {
    // marginTop: 4,
  },
  dueDateContainer: {
    marginTop: 8,

  },
  dueDateText: {
    fontSize: 12,
    fontFamily: Fonts.BodyMedium,
  },
  right: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  taskTitle: {
    // backgroundColor:"red",
    fontSize: 17,
    fontFamily: Fonts.BodySemiBold,
  },
  taskDescription: {
    fontSize: 14,
    fontFamily: Fonts.BodyRegular,
  },
});

export default memo(TaskListCard)

