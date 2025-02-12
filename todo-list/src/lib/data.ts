type Task = {
    id: number;
    text: string;
    completed: boolean;
};

const initialTask: Task = {
    id: 1,
    text: "Ngoding Typescript",
    completed: false,
};

const tasks: Task[] = [initialTask];

export { type Task, tasks };
