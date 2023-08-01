function addParentTask() {
    var table = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    newRow.innerHTML = `
      <td colspan="4" class="center-text">
        New Parent Task
      </td>
      <td>
        <button onclick="deleteParentTask(this)">Delete</button>
        <button onclick="addSubTask(this)">Add</button>
      </td>
    `;
  
    addSubTask(newRow.querySelector('button')); // Add initial subtask for the new parent task
  }
  
  function addSubTask(btn) {
    var row = btn.parentNode.parentNode;
    var subtaskCount = row.querySelectorAll('td').length - 1; // Subtracting one for the Actions column
    var subtaskData = `Sub Task ${subtaskCount} Data`;
    var newCell = row.insertCell(-1);
    newCell.textContent = subtaskData;
  }
  
  window.deleteParentTask = function(btn) {
    var row = btn.parentNode.parentNode;
    var table = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    table.removeChild(row);
  }
  // Initial call to addSubTask to populate the first subtask for the first parent task
  addSubTask(document.querySelector('tbody tr:last-of-type button'));
  