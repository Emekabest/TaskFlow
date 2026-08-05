
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "task_key"


// Handles persistence for tasks using AsyncStorage.
class TaskRepository {

    // Reads all saved tasks from storage.
    async getTasks(){
        const tasks = await AsyncStorage.getItem(STORAGE_KEY);
        

        return tasks ? JSON.parse(tasks) : [];
    }


    // Persists the full task array back to storage.
    async saveTasks(tasks){

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

    }

    
    // Removes all stored data for the task list.
    async clearAllTask(){
        await AsyncStorage.clear()
    }

}



export default new TaskRepository();