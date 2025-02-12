import "./style.css";
import { setupTasks, addTask } from "./todo";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <p>Todolist</p>
     <div class="input-container">
          <input id="task-input" type="text" placeholder="type task"/>
          <button class="add-button">Add</button>
        </div>
    <div class="todo-container">
       
      </div>
    </div>
  </div>
`;

const addButton = document.querySelector<HTMLButtonElement>(".add-button")!;
const taskInput = document.querySelector<HTMLInputElement>("#task-input")!;
const todoContainer =
    document.querySelector<HTMLDivElement>(".todo-container")!;

setupTasks(todoContainer);
addTask(addButton, taskInput, todoContainer);
