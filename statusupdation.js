function updateOptions() {
    const statusDropdown = document.getElementById('status');
    const endDateInput = document.getElementById('endDate');
    const presentDate = new Date();
    
    const endDate = new Date(endDateInput.value);
  
    if (endDate < presentDate) {
        // Disable "In Progress" and "Due Passed" options
        for (let i = 0; i < statusDropdown.options.length; i++) {
            if (statusDropdown.options[i].value === 'inProgress') {
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
  






  /*const statusDropdown = document.createElement('select');
  statusDropdown.innerHTML = `
  <option value="not started">Not started</option>
        <option value="completed">Completed</option>
        <option value="inProgress">In Progress</option>
        <option value="duePassed">Due Passed</option>
        <option value="cancelled">Cancelled</option>
  `;
  statusDropdown.value = subTask.status;
  updateStatusOptions(statusDropdown, startDate, endDate);

  statusDropdown.onchange = function() {
    subTask.status = statusDropdown.value;
    renderTaskTable();
  };

  function updateStatusOptions(statusDropdown, startDate, endDate) {
    const today = new Date().toISOString().split('T')[0];
    statusDropdown.options[2].disabled = startDate < today && endDate < today;
    statusDropdown.options[0].disabled = startDate < today && endDate < today;
    statusDropdown.options[3].disabled = endDate > today;
    statusDropdown.options[3].disabled = startDate == today && endDate == today;
    statusDropdown.options[3].disabled = endDate >= today;
    statusDropdown.options[3].disabled = startDate >= today;
    statusDropdown.options[1].disabled = startDate >= today;
  
  }
  */