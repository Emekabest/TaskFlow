import TaskRepository from "../repository/TaskRepository";
import GenerateTaskId from "../utils/generateTaskId";


// Coordinates task persistence and business actions between the UI and storage layer.
class TaskService{

    // Retrieves all saved tasks from storage.
    async getAllTasks() {

        return await TaskRepository.getTasks();
    }


    // Adds a newly created task to storage and returns the updated task list.
    async addTask(task) {

        const tasks = await TaskRepository.getTasks();

        tasks.push(task);

        await TaskRepository.saveTasks(tasks);

        return tasks;
  }

  // Converts voice-transcribed items into task entries and saves them.
  async addTranscribedTask(rawTasks){
    const tasks = await TaskRepository.getTasks();
    
    rawTasks.forEach(rawTask => {

        const newTask = {
            id:GenerateTaskId(),
            title: rawTask.title.trim(),
            description:rawTask.description.trim(),
            dueDate:rawTask.dueDate,
            isCompleted:false,
        }

        tasks.push(newTask);
    });
    
    await TaskRepository.saveTasks(tasks);


    // return t;
  }


   // Removes a task by ID from storage.
   async deleteTask(id) {

        const tasks = await TaskRepository.getTasks();

        const updated = tasks.filter(task => task.id !== id);

        await TaskRepository.saveTasks(updated);

        return updated;
    }


    // Toggles the completion flag for a task and saves the change.
    async toggleTask(id) {

        const tasks = await TaskRepository.getTasks();

        const updatedTasks = tasks.map(task =>
        task.id === id
            ? {
                ...task,
                isCompleted: !task.isCompleted
            }
            : task
        );

        await TaskRepository.saveTasks(updatedTasks);

        return updatedTasks;
    }

    // Clears all persisted tasks from storage.
    async clearAllTask(){

        await TaskRepository.clearAllTask();
    }



}


export default new TaskService();