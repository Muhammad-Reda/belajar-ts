import { Task, tasks } from "./lib/data.ts";

function organizeTask(taskS: Task[]) {
    const completed = taskS.filter((task) => task.completed);
    const incomplete = taskS.filter((task) => !task.completed);

    return [...incomplete, ...completed];
}

export function setupTasks(element: HTMLDivElement) {
    const organizedTask = organizeTask(tasks);

    organizedTask.map((task, i) => {
        const taskContainer: HTMLDivElement = document.createElement("div");
        taskContainer.className = "task-container";
        const taskId: HTMLParagraphElement = document.createElement("p");

        const checkbox: HTMLInputElement = document.createElement("input");
        checkbox.type = "checkbox";

        const actionContainer: HTMLDivElement = document.createElement("div");
        actionContainer.className = "action-container";

        const editButton: HTMLButtonElement = document.createElement("button");
        editButton.textContent = "Edit";

        const deleteButton: HTMLButtonElement =
            document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "button-delete";

        let editState: boolean = false;

        const delEl: HTMLElement = document.createElement("del");

        // Create a new taskText and taskTextContainer for each task
        const taskTextContainer = document.createElement("div");
        taskTextContainer.className = "task-text-container";

        const taskText = document.createElement("p");
        taskText.textContent = task.text;

        taskContainer.appendChild(taskId).textContent = (i + 1).toString();
        taskContainer.appendChild(taskTextContainer);
        taskTextContainer.appendChild(taskText);

        taskContainer.appendChild(checkbox).checked = task.completed;
        taskContainer.appendChild(actionContainer);
        actionContainer.appendChild(editButton);
        actionContainer.appendChild(deleteButton);
        element.appendChild(taskContainer);

        if (task.completed) {
            taskText.textContent = "";
            taskText.appendChild(delEl).textContent = task.text;
            taskText.style.color = "green";
        } else {
            taskText.textContent = task.text;
            taskText.style.color = "rgba(255, 255, 255, 0.87)";
        }

        editButton.addEventListener("click", () => {
            editState = !editState;

            if (editState) {
                // Switch to edit mode
                editButton.textContent = "Save";
                deleteButton.disabled;
                checkbox.disabled;
                const inputEdit = document.createElement("textarea");
                inputEdit.value = task.text;
                inputEdit.placeholder = "Edit task";
                inputEdit.className = "input-edit";
                editButton.style.backgroundColor = "rgb(16, 210, 16)";

                taskTextContainer.replaceChild(inputEdit, taskText);

                inputEdit.addEventListener("change", (e) => {
                    task.text = (e.target as HTMLInputElement).value;
                });
            } else {
                // Switch back to display mode
                editButton.textContent = "Edit";
                taskText.textContent = task.text;
                const currentInput =
                    taskTextContainer.querySelector("textarea");
                editButton.style.backgroundColor = "rgb(44, 159, 169)";
                if (currentInput) {
                    taskTextContainer.replaceChild(taskText, currentInput);
                }
            }
        });

        checkbox.addEventListener("change", () => {
            task.completed = !task.completed;
            if (task.completed) {
                taskText.textContent = "";
                taskText.appendChild(delEl).textContent = task.text;
                taskText.style.color = "green";
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                setupTasks(element);
            } else {
                taskText.textContent = task.text;
                taskText.style.color = "rgba(255, 255, 255, 0.87)";
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                setupTasks(element);
            }
        });

        deleteButton.addEventListener("click", () => {
            // Find the index of the task to delete
            const taskIndex = tasks.findIndex((t) => t.id === task.id);

            // Remove the task from the array if found
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);

                // Remove the task element from DOM
                taskContainer.remove();

                // Re-render all tasks to update IDs
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                setupTasks(element);
            }
        });
    });
}

export function addTask(
    button: HTMLButtonElement,
    input: HTMLInputElement,
    element: HTMLDivElement
) {
    button.addEventListener("click", () => {
        const text = input.value.trim();

        if (text) {
            tasks.push({
                id: tasks.length + 1,
                text: text,
                completed: false,
            });

            input.value = "";
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }

            setupTasks(element);
        }
        text.length <= 0 ? input.focus() : "";
    });
}
