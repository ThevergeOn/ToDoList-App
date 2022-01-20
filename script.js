let arrayOfTasks = [];
let isLight = true;
let counter = 0;
const input = document.getElementById('myInput');
const clear = document.querySelector('.format')
const ul = document.querySelector('.todo-list-items');
let leftItemSpan = document.getElementById('left-item');
// functions
window.onload = function () {
  loadCssMode()
}
function renderTask(arrayOfTask, uiContainer) {
  while (uiContainer.lastChild) {
    uiContainer.removeChild(uiContainer.lastChild);
  }
  arrayOfTask.forEach(element => {
    preparTaskItem(ul, element, element.id);
  });
  leftItemSpan.textContent = arrayOfTask.length
}
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    let text = input.value.trim();
    if (text !== '') {
      addToDo(text, arrayOfTasks);
      input.value = '';
      renderTask(arrayOfTasks, ul);

    } else {
      alert("Pleas add a valid task")
    }
  }
});
// to creat an object ot task
function addToDo(text, array) {
  counter++;
  let task = {
    value: text,
    completed: false,
    active: false,
    id: counter
  }
  array.push(task);
}
// this function creat a li of ul with value
function creatElement(tagName) {
  return document.createElement(tagName);
}
function preparTaskItem(parent, taskObject) {
  let liElement = creatLiElement(taskObject);
  parent.append(liElement);

  let divElement = creatDivElement();
  liElement.append(divElement);
  let pElement = creatPElement(liElement, taskObject);
  let checkBox = creatCheckBox(liElement, taskObject, pElement);
  divElement.append(checkBox);
  divElement.append(pElement);
  let closeBtn = creatCloseBtn(taskObject.id);
  liElement.append(closeBtn);
}
function creatLiElement(taskObject) {
  let liElement = creatElement('li');
  liElement.id = 'li-' + taskObject.id;
  return liElement;
}
function creatDivElement() {
  let divElement = creatElement('div');
  divElement.classList.add('cursor')
  return divElement;
}
function creatPElement(liElement, taskObject) {
  let pElement = creatElement('p');
  pElement.textContent = taskObject.value;
  pElement.classList.add('p-element');
  pElement.id = 'p' + taskObject.id;
  if (taskObject.completed) {
    pElement.classList.add('done-item');
  }
  pElement.addEventListener('click', () => {
    if (isPropertyEqual(arrayOfTasks, taskObject.id, 'active', true)) {
      changeTaskState(arrayOfTasks, taskObject.id, 'completed', true);
      liElement.classList.add('completed');
      pElement.classList.add('done-item');
    } else {
      changeTaskState(arrayOfTasks, taskObject.id, 'completed', false);
      pElement.classList.remove('done-item');
    }
    leftItemSpan.textContent = arrayOfTasks.length - getCompleted(arrayOfTasks).length;
  });
  return pElement;
}
function creatCheckBox(liElement, taskObject) {
  let checkBox = creatElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = 'check' + taskObject.id;
  if (taskObject.active) {
    checkBox.checked = taskObject.active;
  }
  checkBox.addEventListener('click', () => {
    if (!taskObject.active) {
      changeTaskState(arrayOfTasks, taskObject.id, 'active', true);
    } else {
      changeTaskState(arrayOfTasks, taskObject.id, 'active', false);
    }
    console.log(arrayOfTasks)
  });
  return checkBox;
}
function creatCloseBtn(id) {
  let closeBtn = creatElement('button');
  closeBtn.id = `close-${id}`;
  closeBtn.type = "button";
  closeBtn.classList.add('close');

  let spanElement = creatElement('span');
  spanElement.textContent = '✕';
  closeBtn.addEventListener('click', () => {
    let id = getId(closeBtn);
    arrayOfTasks = arrayOfTasks.filter(element => {
      return element.id !== id
    });
    renderTask(arrayOfTasks, ul);
    leftItemSpan.textContent = arrayOfTasks.length - getCompleted(arrayOfTasks).length;
  });
  closeBtn.append(spanElement);
  return closeBtn;
}
// get id of element
function getId(element) {
  return +element.id.substring(element.id.indexOf('-') + 1);
}
// clear completed
document.querySelector('.format').addEventListener('click', () => {
  arrayOfTasks = arrayOfTasks.filter(element => {
    return element.completed !== true
  })
  renderTask(arrayOfTasks, ul);
  leftItemSpan.textContent =arrayOfTasks.length- getCompleted(arrayOfTasks).length;
});

// this line of code work for active,all,completed tab
document.getElementById('all').addEventListener('click', () => {
  renderTask(arrayOfTasks, ul);
});
// function and event for active tab
function getActive(arrayOfTasks) {
  return arrayOfTasks.filter(element => element.active === true);
}
document.getElementById('active').addEventListener('click', () => {
  renderTask(getActive(arrayOfTasks), ul);
});
// function and event for completed tab
function getCompleted(arrayOfTasks) {
  return arrayOfTasks.filter(element => element.completed === true);
}
document.getElementById('completed').addEventListener('click', () => {
  renderTask(getCompleted(arrayOfTasks), ul)
});

// json changing
function changeTaskState(arrayOfTask, id, property, newState) {
  arrayOfTask.forEach(element => {
    if (element.id === id) {
      element[property] = newState;

    }
  })
}
function isPropertyEqual(arrayOfTasks, id, property, value) {
  for (let element of arrayOfTasks) {
    if (element.id === id) {
      return element[property] === value;
    }
  }
}
// changeTheme
document.getElementById('theme-icon').addEventListener('click', () => {
  loadCssMode()
})
function loadCssMode() {
  isLight = !isLight;
  if (isLight) {
    activateLightMode();
  } else {

    activateDarkMode();
  }
}
function activateDarkMode() {
  let lightCss = document.getElementById('lightCss');
  if (lightCss) {
    lightCss.remove();
  }
  let link = document.createElement('link');
  link.href = 'dark.css';
  link.rel = "stylesheet";
  link.id = 'darkCss'
  document.head.appendChild(link);
}
function activateLightMode() {
  let darkCss = document.getElementById('darkCss');
  console.log(darkCss)
  if (darkCss) {
    darkCss.remove();
  }
  let link = document.createElement('link');
  link.href = 'light.css';
  link.rel = "stylesheet";
  link.id = 'lightCss';
  document.head.appendChild(link);
}