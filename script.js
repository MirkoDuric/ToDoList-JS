const taskLi = document.querySelectorAll(".task");
const paragraphEdit = document.querySelectorAll(".paragraph-edit");
const taskInput = document.querySelector('.input-task-input');



// FUNCTIONS TO DELETE THE TASKS START
const removeTask = (el) => {
    el.target.parentNode.parentNode.parentNode.remove();
};
function deletTaskEvent() {
    const deleteTask = document.querySelectorAll(".delete-li");
    deleteTask.forEach(deleteButton => {
        deleteButton.addEventListener("click", (el) => {
            removeTask(el);
        })
    })
};
// FUNCTIONS TO DELETE THE TASKS END

// FUNCTIONS TO EDIT THE TASKS START
const editTask = (edit) => {
    console.log("edit task click working");
    const parentElement = edit.target.parentNode.parentNode.parentNode;
    const valueInput = parentElement.querySelector('p').innerText;
    console.log(valueInput);
    parentElement.innerHTML = `
        <label>
            <input class="checkbox" type="checkbox">
            <input id="newInputValue" type='text' value='${valueInput}'>
        </label>
        <div class="settings">
            <i class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
                <li class="edit-li"><i class="uil uil-pen"></i>Edit</li>
                <li class="delete-li"><i class="uil uil-trash"></i>Delete</li>
            </ul>
        </div>
    `;
    parentElement.addEventListener('keypress', (edit) => {
        const newValue = parentElement.querySelector('#newInputValue').value;
        if (edit.key === 'Enter') {
            parentElement.innerHTML = `
                <label>
                    <input class="checkbox" type="checkbox">
                    <p>${newValue}</p>
                </label>
                <div class="settings">
                    <i class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li class="edit-li"><i class="uil uil-pen"></i>Edit</li>
                        <li class="delete-li"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>`;
            }
            deletTaskEvent ();
            editTaskEvent ();
            movingCompletedTaskToCompletedUl();
        })

    };
function editTaskEvent() {
    const editTaskButton = document.querySelectorAll(".edit-li");
    editTaskButton.forEach(editButton => {
        editButton.addEventListener("click", (edit) => {
            editTask(edit);
        })
    });
};
// FUNCTIONS TO EDIT THE TASKS END

// FUNCTIONS FOR CREATING THE TASK START
taskInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        if (taskInput.value) {
                updateTasks();
                taskInput.value = '';
                // DELETE FUNCTION LISTENER
                deletTaskEvent();
                // EDIT FUNCTION LISTENER
                editTaskEvent();
                // CHECKED FUNCTION
                movingCompletedTaskToCompletedUl();
                // LISTS
                selectingTheList();
                // CLEAR BUTTONS
                clearAllTasksFromTheList();
            }
        }
    }
);
const generateTask = (taskName) => {
    const task = document.createElement('li');

    task.innerHTML = `
        <label>
            <input class="checkbox" type="checkbox">
            <p>${taskName}</p>
            <div id="status" style="display: none;">Pending</div>
        </label>
        <div class="settings">
            <i class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
                <li class="edit-li"><i class="uil uil-pen"></i>Edit</li>
                <li class="delete-li"><i class="uil uil-trash"></i>Delete</li>
            </ul>
        </div>
    `;
    task.className = 'task';
    return task;
};
const updateTasks = () => {

    const task = generateTask(taskInput.value);
    const taskList = document.querySelector('.task-box');
    taskList.appendChild(task);

};
// FUNCTIONS FOR CREATING THE TASK END

// FUNCTION TO CHECK THE TASK AS DONE START
function movingCompletedTaskToCompletedUl(){
    const checkboxes = document.querySelectorAll('.checkbox');
    const pendingUl = document.querySelector('.pending')
    const completedUl = document.querySelector('.completed');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (checkbox.checked) {
            //   console.log("Checkbox is checked..");
                completedUl.appendChild(event.target.parentNode.parentNode);
            } else {
            //   console.log("Checkbox is not checked..");
              pendingUl.appendChild(event.target.parentNode.parentNode);
            }
          });
    })
    
}
// FUNCTION TO CHECK THE TASK AS DONE END

// ADDING FUNCTIONALITY TO PENDING/COMPLETED BUTTONS START
function selectingTheList() {
    const pendingList = document.querySelector('.pending');
    const pendingButton = document.querySelector('#pending');
    const completedList = document.querySelector('.completed');
    const completedButton = document.querySelector('#completed');
    const allButton = document.querySelector('#all'); //Replaced "#all-active" by "#all" on the html

    pendingButton.addEventListener('click', () => {
        completedList.style.display = 'none';
        pendingList.style.display = 'block';
        const buttonClearTasks = document.querySelector('.clear-tasks');
        buttonClearTasks.addEventListener('click', () => {
            //const buttonClearTasks = document.querySelector('.clear-tasks');
            const pendingList = document.querySelector('.pending').querySelectorAll('.task');
            pendingList.forEach(task => {
                task.remove();
            })
        });
    });

    completedButton.addEventListener('click', () => {
        pendingList.style.display = 'none';
        completedList.style.display = 'block';
        const buttonClearTasks = document.querySelector('.clear-tasks');
        buttonClearTasks.addEventListener('click', () => {
            //const buttonClearTasks = document.querySelector('.clear-tasks');
            const completedList = document.querySelector('.completed').querySelectorAll('.task');
            completedList.forEach(task => {
                task.remove();
            })
        });
    });

    allButton.addEventListener('click', () => {
        completedList.style.display = 'block';
        console.log('buttonworks');
        pendingList.style.display = 'block';
        const buttonClearTasks = document.querySelector('.clear-tasks');
        buttonClearTasks.addEventListener('click', () => {
            //const buttonClearTasks = document.querySelector('.clear-tasks');
            console.log('clearbuttonlistenerworks');
            const completedList = document.querySelector('.completed').querySelectorAll('.task');
            completedList.forEach(task => {
                console.log('completedList.forEachLoop');
                task.remove();
            })
            const pendingList = document.querySelector('.pending').querySelectorAll('.task');
            pendingList.forEach(task => {
                console.log('pendingList.forEachLoop');
                task.remove();
            })
        });
    });
}
// ADDING FUNCTIONALITY TO PENDING/COMPLETED BUTTONS END

// ADDING FUNCTIONALITY TO CLEAR ALL BUTTON START
//function clearAllTasksButton() {
    //const buttonClearTasks = document.querySelector('.clear-tasks');
    //const buttonClearCompleted = document.querySelector('.clear-completed'); //doesn't exist anymore

    //buttonClearTasks.addEventListener('click', (e) => {
       // const buttonClearTasks = document.querySelector('.clear-tasks');
        //if(e)
       //const pendingList = document.querySelector('.pending').querySelectorAll('.task');
        //pendingList.forEach(task => {
        //    task.remove();
       // })
   // });
//}

// ADDING FUNCTIONALITY TO CLEAR ALL BUTTON START


//SELECTED STYLE FOR ACTIVE TABS
function activeTab() {

    const tabButton = document.querySelectorAll('.filters span');
    
    function siblings(elem) {
        const nodes = [...elem.parentNode.children];
        return nodes.filter(node => node !== elem)
    }

    tabButton.forEach(el => {
        el.addEventListener('click', function() {
            this.classList.add('active');
            siblings(this).forEach(node => {
                node.classList.remove('active')
            })  
        })
    })
    
}

activeTab();






 