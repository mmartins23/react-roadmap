import useForm from "../../../hooks/useForm";

export const TodoAdd = ({ onNewTodo }) => {
    const { description, onInputChange, onResetForm } = useForm({
        description: "",
    });

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (description.lenght <= 1) return;

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
