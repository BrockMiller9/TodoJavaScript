// declaring the varibles --
// will append the new elements to the ul
// will also get the the value from the input of the user
const form = document.querySelector("form");
const ul = document.querySelector("#todolist");
const input = document.querySelector("#TO-DO");
const userInput = input.value;
let todoArray;

// Here we are going to work on saving the data inputed into the local storage
// using an if statment to check if their is input inside local storage.
// if there is then we are running parse on that data so that we can read it upon its return

if (localStorage.todos) {
  todoArray = JSON.parse(localStorage.todos);
} else {
  todoArray = [];
}

// here we are looping through the array that we created above and running our addTodo function
// this function will allow us to create a new li with a delete button
for (let todo of todoArray) {
  addTodo(todo);
}

// here is the main function of the document
// we are creating a new li
// adding the user's input to the text
// then appending that li to the ul variable
// we are then checking if the li is clicked, if it is we toggle the completed class which is resposible for the line through effect
// we then do this same process with the remove button
// lastly we append the button to the new li we created

function addTodo(userInput) {
  const newToDo = document.createElement("li");

  newToDo.innerText = userInput;
  ul.appendChild(newToDo);
  newToDo.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      newToDo.classList.toggle("completed");
    }
  });
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "REMOVE";
  removeBtn.addEventListener("click", function () {
    removeBtn.parentElement.remove();
    removeFromLocalStorage(userInput);
  });
  newToDo.append(removeBtn);
}

// here we add a event listener to the ul variable
// this allows us to see if the button is clicked
// if the button is clicked we remove the todo
// we use the ul for this for proper event delegation
ul.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  } else if (e.target.tagName === "LI") {
  }
});

// we then add an event listener to the actual form when submited
// this again will allow us to create a new li and remove btn
// here we are also able to reset the input to an empty string
// we also run our function the store the data inside of local storage
form.addEventListener("submit", function submit(e) {
  e.preventDefault();

  const newToDo = document.createElement("li");
  const removeBtn = document.createElement("button");
  const userInput = input.value;

  removeBtn.innerText = "REMOVE";
  removeBtn.addEventListener("click", function () {
    removeBtn.parentElement.remove();
  });

  newToDo.innerText = userInput;
  input.value =
    ""; /* resetting the input value to be empty after we retieve value */
  ul.append(newToDo);
  newToDo.appendChild(removeBtn);
  newToDo.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      //   console.log("YOU CLICKed lI");
      newToDo.classList.toggle("completed");
    }
  });
  addToLocalStorage(userInput);
});

// these last two functions are the means by which we store and remove data from local storage
// to add we must strginify the data into our array in which we created earlier
// to remove we check to see if the data being deleted is the same as stored and if it is we delete it.
function addToLocalStorage(userInput) {
  todoArray.push(userInput);
  localStorage.setItem("todos", JSON.stringify(todoArray));
}

function removeFromLocalStorage(userInput) {
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i] === userInput) {
      todoArray.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todoArray));
}
