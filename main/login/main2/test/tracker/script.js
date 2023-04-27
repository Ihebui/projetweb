const tasks = document.querySelectorAll('.task');
const sections = document.querySelectorAll('.section');
const submitb = document.querySelector("#add-task-button");
const inputs = document.querySelectorAll('input');

const updateSubmitButton = () => {
  const allInputsFilled = Array.from(inputs).every((input) => input.value.trim() !== '' && input.value.trim().length != 0);
  console.log(allInputsFilled);
  submitb.disabled = !allInputsFilled;
};

inputs.forEach((input) => {
  input.addEventListener('input', updateSubmitButton);
});

updateSubmitButton();

let currentTask = null;

tasks.forEach(task => {
    task.addEventListener('dragstart', () => {
      currentTask = task;
      setTimeout(() => {
        task.style.display = 'none';
        currentTask.classList.add('dragging'); // Add the .dragging class to the currentTask
      }, 0);
    });
  
    task.addEventListener('dragend', () => {
      currentTask.style.display = 'block';
      currentTask.classList.remove('dragging'); // Remove the .dragging class from the currentTask
      currentTask = null;
    });
  });
  

sections.forEach(section => {
    section.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(section, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        section.querySelector('.task-list').appendChild(draggable);
      } else {
        section.querySelector('.task-list').insertBefore(draggable, afterElement);
      }
    });
  
    section.addEventListener('dragenter', e => {
      e.preventDefault();
    });
  
    section.addEventListener('drop', e => {
      e.preventDefault();
      const draggable = document.querySelector('.dragging');
      section.querySelector('.task-list').appendChild(draggable);
    });
  });
  

function getDragAfterElement(section, y) {
  const draggableElements = [...section.querySelectorAll('.task:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const todo = document.querySelector("#todo");

const addTaskButton = document.getElementById('add-task-button');
addTaskButton.addEventListener('click', function() {
    const newTaskInput = document.getElementById('new-task-input');
    const newTaskText = newTaskInput.value;
    const task_el = document.createElement('li');
    task_el.classList.add('task');
    task_el.textContent = newTaskText;
    task_el.setAttribute('draggable', true);

    task_el.addEventListener('dragstart', () => {
      currentTask = task_el;
      setTimeout(() => {
        task_el.style.display = 'none';
        currentTask.classList.add('dragging');
      }, 0);
    });
  
    task_el.addEventListener('dragend', () => {
      currentTask.style.display = 'block';
      currentTask.classList.remove('dragging');
      currentTask = null;
    });

    task_el.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(section, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        section.querySelector('.task-list').appendChild(draggable);
      } else {
        section.querySelector('.task-list').insertBefore(draggable, afterElement);
      }
    });
  
    task_el.addEventListener('dragenter', e => {
      e.preventDefault();
    });
  
    task_el.addEventListener('drop', e => {
      e.preventDefault();
      const draggable = document.querySelector('.dragging');
      section.querySelector('.task-list').appendChild(draggable);
    });

    todo.appendChild(task_el);
    newTaskInput.value = '';
    
    inputs.forEach((input) => {
      input.addEventListener('input', updateSubmitButton);
    });
    
    updateSubmitButton();
});