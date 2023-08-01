function searchTasks() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

  // Initialize variables for filtering
  let searchByStartDate = false;
  let searchByEndDate = false;
  let searchByStatus = false;
  let searchByMainTask = false;
  let searchByYear = false;
  let searchQuery = searchInput;

  // Check if the searchInput has a prefix for startDate, endDate, status, main task, or year
  if (searchInput.startsWith('startdate:')) {
    searchByStartDate = true;
    searchQuery = new Date(searchInput.slice('startdate:'.length).trim());
  } else if (searchInput.startsWith('enddate:')) {
    searchByEndDate = true;
    searchQuery = new Date(searchInput.slice('enddate:'.length).trim());
  } else if (searchInput.startsWith('status:')) {
    searchByStatus = true;
    searchQuery = searchInput.slice('status:'.length).trim().toLowerCase();
  } else if (searchInput.startsWith('year:')) {
    searchByYear = true;
    searchQuery = parseInt(searchInput.slice('year:'.length).trim());
  } else if (searchInput.startsWith('maintask:')) {
    searchByMainTask = true;
    searchQuery = searchInput.slice('maintask:'.length).trim().toLowerCase();
  }

  // Perform the appropriate search based on the prefix
  let filteredTasks = [];
  if (searchByStartDate || searchByEndDate || searchByStatus || searchByYear) {

    filteredTasks = taskData.filter(mainTask => {

      const filteredSubtasks = mainTask.subtasks.filter(subTask => {
        const startDate = new Date(subTask.startDate);
        const endDate = new Date(subTask.endDate);
        const status = subTask.status.toLowerCase();
        const yearOnly = startDate.getFullYear();
        if (searchByStartDate) {
          // Exact match for start date
          return startDate.getTime() === searchQuery.getTime();
        } else if (searchByEndDate) {
          // Exact match for end date
          return endDate.getTime() === searchQuery.getTime();
        } else if (searchByStatus) {
          // Match the full status value
          return status === searchQuery;
        } else if (searchByYear) {
          // Match the full year value
          console.log("yearOnly",yearOnly)
          return yearOnly === parseInt(searchQuery);
        }
      });
      return filteredSubtasks.length > 0;
    });
  } else if (searchByMainTask) {
    // Search for a specific main task and its subtasks
    filteredTasks = taskData.filter(mainTask => {
      const mainTaskName = mainTask.taskName.toLowerCase();
      const subTasksMatched = mainTask.subtasks.filter(subTask => {
        const subTaskName = subTask.taskName.toLowerCase();
        return subTaskName.includes(searchQuery);
      });

      return mainTaskName.includes(searchQuery) || subTasksMatched.length > 0;
    });
  } else {
    // Search for main tasks and their subtasks (if no prefix, "maintask:" prefix, or exact date prefix)
    taskData.forEach(mainTask => {
      const mainTaskName = mainTask.taskName.toLowerCase();
      const subTasksMatched = mainTask.subtasks.filter(subTask => {
        const subTaskName = subTask.taskName.toLowerCase();
        return subTaskName.includes(searchQuery);
      });

      if (mainTaskName.includes(searchQuery) || subTasksMatched.length > 0) {
        filteredTasks.push({
          ...mainTask,
          subtasks: subTasksMatched,
        });
      }
    });
  }
  
  renderTaskTable(filteredTasks);
}
