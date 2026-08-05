import { FILTER } from "../constants/filter";


const filterTasks = (tasks = [], filterType) => {
  switch (filterType) {
    
    case FILTER.PENDING:
      return tasks.filter((task) => !task.isCompleted);

    case FILTER.COMPLETED:
      return tasks.filter((task) => task.isCompleted);

    case FILTER.ALL:
        return tasks;

    default:
      return tasks;
  }
};

export default filterTasks;