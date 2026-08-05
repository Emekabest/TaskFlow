import { SORT } from "../constants/sort";


const sortTasks = (tasks = [], sortBy) => {

  switch (sortBy) {
    case SORT.NEWEST:
      return [...tasks].reverse();

    case SORT.OLDEST:
      return [...tasks];

    case SORT.DUE_DATE:
      return [...tasks].sort((a, b) => {
        // Both tasks have no due date
        if (!a.dueDate && !b.dueDate) return 0;

        // Tasks without a due date go last
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        // Sort by nearest due date first
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    default:
      return [...tasks];
  }
};


export default sortTasks;