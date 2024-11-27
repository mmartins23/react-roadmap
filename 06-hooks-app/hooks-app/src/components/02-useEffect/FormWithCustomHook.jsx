import useForm from "../../hooks/useForm";

function FormWithCustomHook() {

    const { formState, onInputChange, onResetForm, username, password, email } = useForm({
        username: '',
        email: '',
        password: ''
    });


    return (
        <>
            <h1>Simple Form With Hooks</h1>
            <hr />

            <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange} />

            <input
                type="password"
                className="form-control mt-2"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onInputChange} />

            <input
                type="email"
                className="form-control mt-2"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />

            <button className="btn btn-danger mt-2" onClick={onResetForm}>Reset</button>
        </>
    )
}

export default FormWithCustomHook;