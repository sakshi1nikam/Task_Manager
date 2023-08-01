const taskData = [
  
];


//To add main task
function addMainTask() {
  const mainTaskNameInput = document.getElementById('mainTaskName');
  const mainTaskName = mainTaskNameInput.value.trim();
  
  if (mainTaskName === '') return;

  const mainTask = {
    taskName: mainTaskName,
    subtasks: []
  };

  taskData.push(mainTask);
  mainTaskNameInput.value = '';

  renderTaskTable();
}


//validation for date 
function isValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
  }

  function isdatebefore(dateString1 , dateString2 )
  {
      if(dateString1 < dateString2)
      {
         return true ;
      }
      else
      {
        alert("error");
        return false;
      }
  }

//To add sub task on table 
function addSubtask(mainTaskIndex) {
    const mainTask = taskData[mainTaskIndex];
  
    const addSubtaskForm = document.getElementById('addSubtaskForm');
    addSubtaskForm.style.display = 'block';
  
    addSubtaskForm.onsubmit = function(event) {
      event.preventDefault();
      const subtaskNameInput = document.getElementById('subtaskName');
      const startDateInput = document.getElementById('startDate');
      const endDateInput = document.getElementById('endDate');
      const status = document.getElementById('status').value;
  
      const taskName = subtaskNameInput.value.trim();
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;

  
  
      if (taskName === '' || startDate === '' || endDate === '') {
        return;
      }

      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        alert('Please enter valid dates in the format YYYY-MM-DD.');
        return;
      }
      if(isdatebefore(startDate , endDate))
      {

      
    
      //const status = getStatus(startDate, endDate);
  
      const subTask = {
        taskName,
        startDate,
        endDate,
        status
      };
  
      mainTask.subtasks.push(subTask);
  
      renderTaskTable();
    }
      // Reset the form and hide it after adding the subtask
      addSubtaskForm.reset();
      addSubtaskForm.style.display = 'none';
    };
  }
  

//cancel button while adding subtask
  function cancelAddSubtask() {
    const addSubtaskForm = document.getElementById('addSubtaskForm');
    addSubtaskForm.style.display = 'none';
    addSubtaskForm.reset();

    document.getElementById('searchInput').value = '';
  renderTaskTable();
  }
  

//deletion of main task
function deleteMainTask(mainTaskIndex) {
  taskData.splice(mainTaskIndex, 1);
  renderTaskTable();
}

//deletion of
function deleteSubtask(mainTaskIndex, subTaskIndex) {
  taskData[mainTaskIndex].subtasks.splice(subTaskIndex, 1);
  renderTaskTable();
}

function editSubtask(mainTaskIndex, subTaskIndex) {
  const mainTask = taskData[mainTaskIndex];
  const subTask = mainTask.subtasks[subTaskIndex];

  const taskName = prompt('Enter subtask name:', subTask.taskName);
  if (taskName === null || taskName.trim() === '') return;

  const startDate = prompt('Enter start date (YYYY-MM-DD):', subTask.startDate);
  const endDate = prompt('Enter end date (YYYY-MM-DD):', subTask.endDate);

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    alert('Please enter valid dates in the format YYYY-MM-DD.');
    return;
  }

  const status = getStatus(startDate, endDate);

  subTask.taskName = taskName;
  subTask.startDate = startDate;
  subTask.endDate = endDate;
  subTask.status = status;

  renderTaskTable();
}


  //date validation while adding data
  function getStatus(startDate, endDate) {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (today < start) {
      return 'not started';
    } else if (today >= start && today <= end) {
      return 'in progress';
    } else if (today > end) {
      return 'due passed';
    }
  }

//To render data on table while handling filters for searchs
function renderTaskTable(filteredTasks = taskData) {

  console.log("filteredTasks:", filteredTasks); // Add this line to check the filtered data
  const table = document.getElementById('taskTable');
  table.innerHTML = `
    <tr>
      <th>Main Task</th>
      <th>Sub Task</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  `;

  filteredTasks.forEach((mainTask, mainTaskIndex) => {
    const mainTaskRow = document.createElement('tr');
    mainTaskRow.innerHTML = `
      <td>${mainTask.taskName}</td>
      <td colspan="5">
        <button onclick="addSubtask(${mainTaskIndex})">Add Subtask</button>
        <button onclick="deleteMainTask(${mainTaskIndex})">Delete</button>
      </td>
    `;

    table.appendChild(mainTaskRow);

    mainTask.subtasks.forEach((subTask, subTaskIndex) => {
      // Check if the subtask matches the search criteria
      
      const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
      const startDateSearch = searchInput.startsWith('startdate:');
      const endDateSearch = searchInput.startsWith('enddate:');
      const statusSearch = searchInput.startsWith('status:');
      const yearSearch = searchInput.startsWith('year');

      var startDateString = new Date(subTask.startDate).getFullYear();
      var endDateString = new Date(subTask.endDate).getFullYear();

      if (
        (startDateSearch && subTask.startDate === searchInput.slice('startdate:'.length).trim()) ||
        (endDateSearch && subTask.endDate === searchInput.slice('enddate:'.length).trim()) ||
        (yearSearch && startDateString == parseInt(searchInput.slice('year:'.length).trim()) || endDateString == parseInt(searchInput.slice('year:'.length).trim())) ||
        (statusSearch && subTask.status.toLowerCase() === searchInput.slice('status:'.length).trim().toLowerCase()) ||
        (!startDateSearch && !endDateSearch && !statusSearch && !yearSearch && subTask.taskName.toLowerCase().includes(searchInput))
      ) {
        // alert("dsifgi")

       /*const subTaskRow = document.createElement('tr');
        const statusClass = subTask.status === 'due passed' ? 'deleted' : '';
        const subTaskStatusClass = subTask.status === 'completed' ? 'completed-task' : '';

        // Format startDate and endDate as "YYYY-MM-DD" before rendering
        const formattedStartDate = new Date(subTask.startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(subTask.endDate).toISOString().split('T')[0];
*/
        subTaskRow.innerHTML = `
          <td></td>
          <td class="${subTaskStatusClass}">${subTask.taskName}</td>
          <td>${formattedStartDate}</td>
          <td>${formattedEndDate}</td>
          <td class="${statusClass}">${subTask.status}</td>
          <td>
            <button onclick="editSubtask(${mainTaskIndex}, ${subTaskIndex})">Edit</button>
            <button onclick="deleteSubtask(${mainTaskIndex}, ${subTaskIndex})">Delete</button>
          </td>
        `;

        table.appendChild(subTaskRow);
      }
    });
  });
}

// Initial render
renderTaskTable();





