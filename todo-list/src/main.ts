import './styles.scss'

document.addEventListener("DOMContentLoaded", () => {
  const greetingElement = document.querySelector(".header__greeting") as HTMLHeadingElement;
  const messageElement = document.querySelector(".header__message") as HTMLParagraphElement;
  const inputElement = document.getElementById("todo-input") as HTMLInputElement;
  const addButton = document.getElementById("add-btn") as HTMLButtonElement;
  const todoList = document.getElementById("todo-list") as HTMLUListElement;

    //Greeting based on TOD/
  const hours = new Date().getHours();
  let greeting = "Good morning, gorgeous!";

  if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon, gorgeous!";
  } else if (hours >= 18) {
    greeting = "Good evening, gorgeous!";
  }
  greetingElement.textContent = greeting;

    //Fetcing quotes from API -> fetch-returns promise -> response obj/
  fetch("http://quotable.io/random")
      .then(response => response.json())//takes the response from fetch/ response.json() converts the response into JSON format/
      .then(data => {//we use another .then() to handle the Promise, as json() is async func - .then() to handle parsed JSON data/
            messageElement.textContent = data.content;//data is the parsed JSON obj returned from the API/
      }) // data.content contains the quote text and with it we update the messageElement to display the quotes on the webpage/
      .catch(() => { //in case the API req fails - the .catch() block runs/
            messageElement.textContent = "Have a wonderful day! Don't forget to smile!";
      })

   // Function to create and add a new to-do item to the list
  const addTodo = () => {
     const newTodoText = inputElement.value.trim();

     if (newTodoText !== "") {
    const newTodoItem = document.createElement('li');//creates new li/
    
    //creating checkbox/
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    //creating text span/
    const textSpan = document.createElement('span');
    textSpan.textContent = newTodoText;
    textSpan.classList.add("todo-text");

    //create delete button/
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");

    //Append checkbox, text, and delete button to list item/
    newTodoItem.appendChild(checkbox);
    newTodoItem.appendChild(textSpan);
    newTodoItem.appendChild(deleteButton);
    todoList.appendChild(newTodoItem);

   // Clear the input field after adding the to do/
    inputElement.value = "";

  // Add event listener to mark completed tasks
    checkbox.addEventListener('change', () => {
      textSpan.classList.toggle("completed", checkbox.checked);
    });

    // Add event listener to remove task when delete button is clicked
    deleteButton.addEventListener('click', () => {
      todoList.removeChild(newTodoItem);
    });
  } else {
    alert("Please enter a valid to-do!");
  }
};
   // Event listener for the "Add To-Do" button
addButton.addEventListener('click', addTodo);
console.log('Button clicked');

   // Allow the user to add a to-do by pressing "Enter"
inputElement.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
          addTodo();
  }
});
})
   
  
  