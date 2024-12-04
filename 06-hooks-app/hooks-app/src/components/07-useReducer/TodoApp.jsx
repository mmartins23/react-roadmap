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
