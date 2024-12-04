## **1. TodoApp Component**

```jsx
import { TodoList } from "./components/TodoList";
import { TodoAdd } from "./components/TodoAdd";
import { useTodos } from "../../hooks/useTodos";

export const TodoApp = () => {
    const {
        todos,
        todosCount,
        pendingTodosCount,
        handleDeleteTodo,
        handleToggleTodo,
        handleNewTodo,
    } = useTodos();

    return (
        <div>
            <h1>
                TodoApp Total: {todosCount} -{" "}
                <small>Pending: {pendingTodosCount}</small>
            </h1>
            <hr />

            <div className="row">
                <div className="col-7">
                    <TodoList
                        todos={todos}
                        onDeleteTodo={handleDeleteTodo}
                        onToggleTodo={handleToggleTodo}
                    />
                </div>

                <div className="col-5">
                    <h4>Add new ToDo</h4>
                    <hr />

                    <TodoAdd onNewTodo={handleNewTodo} />
                </div>
            </div>
        </div>
    );
};
```

### **Explanation**
- **Imports**:
  - `TodoList`: Displays the list of todos.
  - `TodoAdd`: Provides a form to add new todos.
  - `useTodos`: A custom hook that manages the state and logic for todos.

- **State and Functions** (from `useTodos`):
  - `todos`: The array of current todos.
  - `todosCount`: Total number of todos.
  - `pendingTodosCount`: Number of todos not marked as "done".
  - `handleDeleteTodo`: Function to delete a todo.
  - `handleToggleTodo`: Function to toggle a todo's "done" status.
  - `handleNewTodo`: Function to add a new todo.

- **UI Layout**:
  - Header: Displays the total and pending todos count.
  - Two Sections:
    1. **Left Section** (`TodoList`): Displays the list of todos with their actions (toggle and delete).
    2. **Right Section** (`TodoAdd`): Provides a form to add new todos.

---

## **2. TodoAdd Component**

```jsx
import useForm from "../../../hooks/useForm";

export const TodoAdd = ({ onNewTodo }) => {
    const { description, onInputChange, onResetForm } = useForm({
        description: "",
    });

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (description.length <= 1) return;

        const newTodo = {
            id: Math.floor(Math.random() * 100) + 1,
            done: false,
            description: description,
        };

        onNewTodo(newTodo);
        onResetForm();
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                placeholder="Add a new todo"
                className="form-control"
                name="description"
                value={description}
                onChange={onInputChange}
            />
            <button type="submit" className="btn btn-outline-primary mt-2">
                Submit
            </button>
        </form>
    );
};
```

### **Explanation**
- **Props**:
  - `onNewTodo`: A function passed from `TodoApp` to handle adding a new todo.

- **State Management** (via `useForm`):
  - `description`: Holds the input's current value.
  - `onInputChange`: Updates the `description` value when the user types.
  - `onResetForm`: Resets the form after submission.

- **Event Handling**:
  - `onFormSubmit`:
    - Prevents the default form submission.
    - Validates the input to ensure it's at least 2 characters.
    - Creates a new todo object with:
      - `id`: A random number.
      - `done`: Initially `false`.
      - `description`: The current input value.
    - Calls `onNewTodo` to add the todo and resets the form.

- **UI**:
  - An input field for the todo description.
  - A submit button.

---

## **3. TodoItem Component**

```jsx
export const TodoItem = ({ todo, onDeleteTodo, onToggleTodo }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span
                className={`align-self-center ${todo.done ? "text-decoration-line-through" : ""}`}
                onClick={() => onToggleTodo(todo.id)}
            >
                {todo.description}
            </span>
            <button className="btn btn-danger" onClick={() => onDeleteTodo(todo.id)}>
                Delete
            </button>
        </li>
    );
};
```

### **Explanation**
- **Props**:
  - `todo`: The todo item to display.
  - `onDeleteTodo`: Function to delete the todo.
  - `onToggleTodo`: Function to toggle the todo's "done" status.

- **UI Interaction**:
  - Displays the todo description.
  - Adds a strikethrough style (`text-decoration-line-through`) if `todo.done` is true.
  - Deletes the todo when the "Delete" button is clicked.
  - Toggles the "done" status when the description is clicked.

---

## **4. TodoList Component**

```jsx
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos = [], onDeleteTodo, onToggleTodo }) => {
    return (
        <ul className="list-group">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onToggleTodo={onToggleTodo}
                />
            ))}
        </ul>
    );
};
```

### **Explanation**
- **Props**:
  - `todos`: An array of todo objects.
  - `onDeleteTodo`: Function to delete a todo.
  - `onToggleTodo`: Function to toggle a todo's "done" status.

- **Rendering**:
  - Maps through the `todos` array.
  - For each todo, renders a `TodoItem` component with the relevant props.

---

## **5. todoReducer**

```jsx
export const todoReducer = (initialState = [], action) => {
    switch (action.type) {
        case "[TODO] Add Todo":
            return [...initialState, action.payload];

        case "[TODO] Remove Todo":
            return initialState.filter((todo) => todo.id !== action.payload);

        case "[TODO] Toggle Todo":
            return initialState.map((todo) =>
                todo.id === action.payload ? { ...todo, done: !todo.done } : todo
            );

        default:
            return initialState;
    }
};
```

### **Explanation**
- **Initial State**:
  - Defaults to an empty array (`[]`).

- **Action Types**:
  - **`[TODO] Add Todo`**:
    - Adds a new todo to the state.
  - **`[TODO] Remove Todo`**:
    - Removes a todo by filtering out the one with the matching `id`.
  - **`[TODO] Toggle Todo`**:
    - Toggles the `done` status of a todo by `id`.

- **Default Case**:
  - Returns the current state if the action type is not recognized.

---

## **6. useTodos Hook**

```jsx
import { useReducer } from "react";
import { todoReducer } from "../reducers/todoReducer";

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, []);

    const handleNewTodo = (todo) => dispatch({ type: "[TODO] Add Todo", payload: todo });

    const handleDeleteTodo = (id) => dispatch({ type: "[TODO] Remove Todo", payload: id });

    const handleToggleTodo = (id) => dispatch({ type: "[TODO] Toggle Todo", payload: id });

    const todosCount = todos.length;
    const pendingTodosCount = todos.filter((todo) => !todo.done).length;

    return {
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    };
};
```

### **Explanation**
- **State Management**:
  - Uses `useReducer` with `todoReducer` to manage the todos array.

- **Functions**:
  - `handleNewTodo`: Dispatches an action to add a new todo.
  - `handleDeleteTodo`: Dispatches an action to remove a todo.
  - `handleToggleTodo`: Dispatches an action to toggle a todo's status.

- **Derived Data**:
  - `todosCount`: Total number of todos.
  - `pendingTodosCount`: Number of todos not marked as done.

---

This breakdown explains how the components and custom hooks interact to build the complete TodoApp functionality.