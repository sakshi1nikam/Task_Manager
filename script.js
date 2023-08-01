const taskData = [];

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


function isValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
  }

// ... (existing code) ...

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
    
      //const status = getStatus(startDate, endDate);
  
      const subTask = {
        taskName,
        startDate,
        endDate,
        status
      };
  
      mainTask.subtasks.push(subTask);
  
      renderTaskTable();
  
      // Reset the form and hide it after adding the subtask
      addSubtaskForm.reset();
      addSubtaskForm.style.display = 'none';
    };
  }
  
  function cancelAddSubtask() {
    const addSubtaskForm = document.getElementById('addSubtaskForm');
    addSubtaskForm.style.display = 'none';
    addSubtaskForm.reset();
  }
  
  // ... (existing code) ...
  
function deleteMainTask(mainTaskIndex) {
  taskData.splice(mainTaskIndex, 1);
  renderTaskTable();
}

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

const statusDropdown = document.createElement('select');
  statusDropdown.innerHTML = `
    <option value="Not Started">Not Started</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    <option value="Cancelled">Cancelled</option>
    <option value="Due Passed">Due Passed</option>
  `;
  statusDropdown.value = subTask.status;
  updateStatusOptions(statusDropdown, startDate, endDate);

  statusDropdown.onchange = function() {
    subTask.status = statusDropdown.value;
    renderTaskTable();
  };

  function updateStatusOptions(statusDropdown, startDate, endDate) {
    const today = new Date().toISOString().split('T')[0];
    statusDropdown.options[0].disabled = false;
    statusDropdown.options[1].disabled = startDate > today || endDate < today;
    statusDropdown.options[2].disabled = startDate > today || endDate < today;
    statusDropdown.options[3].disabled = startDate <= today && endDate >= today;
    statusDropdown.options[4].disabled = endDate >= today;
  }
  

  //date validation while adding data
function getStatus(startDate, endDate) {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) {
    return 'Not Started';
  } else if (today >= start && today <= end) {
    return 'In Progress';
  } else if (today > end) {
    return 'Due Passed';
  }
}

function renderTaskTable() {
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

  taskData.forEach((mainTask, mainTaskIndex) => {
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
      const subTaskRow = document.createElement('tr');
      const statusClass = subTask.status === 'Due Passed' ? 'deleted' : '';

      subTaskRow.innerHTML = `
        <td></td>
        <td>${subTask.taskName}</td>
        <td>${subTask.startDate}</td>
        <td>${subTask.endDate}</td>
        <td class="${statusClass}">${subTask.status}</td>
        <td>
          <button onclick="editSubtask(${mainTaskIndex}, ${subTaskIndex})">Edit</button>
          <button onclick="deleteSubtask(${mainTaskIndex}, ${subTaskIndex})">Delete</button>
        </td>
      `;

      table.appendChild(subTaskRow);
    });
  });
}

// Initial render
renderTaskTable();


function updateOptions() {
  const statusDropdown = document.getElementById('status');
  const endDateInput = document.getElementById('endDate');
  const presentDate = new Date();
  
  const endDate = new Date(endDateInput.value);

  if (endDate < presentDate) {
      // Disable "In Progress" and "Due Passed" options
      for (let i = 0; i < statusDropdown.options.length; i++) {
          if (statusDropdown.options[i].value === 'inProgress' || statusDropdown.options[i].value === 'duePassed') {
              statusDropdown.options[i].disabled = true;
          } else {
              statusDropdown.options[i].disabled = false;
          }
      }
  } else if (endDate.toDateString() === presentDate.toDateString()) {
      // Disable "Due Passed" option
      for (let i = 0; i < statusDropdown.options.length; i++) {
          if (statusDropdown.options[i].value === 'duePassed') {
              statusDropdown.options[i].disabled = true;
          } else {
              statusDropdown.options[i].disabled = false;
          }
      }
  } else {
      // Disable "Due Passed" option
      for (let i = 0; i < statusDropdown.options.length; i++) {
          if (statusDropdown.options[i].value === 'duePassed') {
              statusDropdown.options[i].disabled = true;
          } else {
              statusDropdown.options[i].disabled = false;
          }
      }
  }
}