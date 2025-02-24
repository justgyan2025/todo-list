



// Add Task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() === "") return;

    let task = {
        text: taskInput.value,
        completed: false
    };

    db.push(task); // Push task to Firebase
    taskInput.value = "";
}

// Fetch Tasks from Firebase
db.on("child_added", function(snapshot) {
    let task = snapshot.val();
    let taskList = document.getElementById("taskList");
    
    let li = document.createElement("li");
    li.textContent = task.text;
    
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        db.child(snapshot.key).remove(); // Remove task from Firebase
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
});

// Remove task from UI when deleted in Firebase
db.on("child_removed", function(snapshot) {
    let taskList = document.getElementById("taskList");
    let items = taskList.getElementsByTagName("li");
    
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.includes(snapshot.val().text)) {
            taskList.removeChild(items[i]);
            break;
        }
    }
});