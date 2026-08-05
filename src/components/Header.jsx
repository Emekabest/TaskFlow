import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Fonts from "../constants/font"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faAdd } from "@fortawesome/free-solid-svg-icons";

import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons";
import LightTheme from "../theme/lightTheme";
import DarkTheme from "../theme/darkTheme";
import useThemeStore from "../repository/store";


const Header = ({ title, onMenuPress }) => {

  const navigation = useNavigation();

  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? DarkTheme : LightTheme;

  // Navigates to the add-task screen when the plus button is pressed.
  const handleMoveToAddTaskScreen =()=>{
    navigation.navigate("addtask");
  }

  
  return(
     <View style={[styles.container, {backgroundColor:theme.background, borderBottomColor:theme.border }]}>
        <TouchableOpacity onPress={onMenuPress} activeOpacity={0.8} 
        style={[styles.menuButton, {backgroundColor:theme.button, borderWidth:0.6, borderColor:theme.border}]}>
          <Ionicons name="menu-outline" size={26} color={theme.icon} />
        </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>{title}</Text>

      <TouchableOpacity onPress={handleMoveToAddTaskScreen} activeOpacity={0.8} 
      style={[styles.addTaskCont, {backgroundColor:theme.button, borderWidth:0.6, borderColor:theme.border}]}>
        <FontAwesomeIcon icon={faAdd} size={24} color={theme.icon} />
      </TouchableOpacity>
     </View>
   )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: "100%",
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
    },

    menuButton:{
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems:"center",
      justifyContent:"center",
    },

    addTaskCont:{
      borderRadius:50,
      height:44,
      width:44,
      alignItems:"center",
      justifyContent:"center"
    },

    title: {
        fontSize: 20,
        fontFamily:Fonts.HeaderSemiBold,
        flex: 1,
        textAlign: "center",
    }
})

export default Header