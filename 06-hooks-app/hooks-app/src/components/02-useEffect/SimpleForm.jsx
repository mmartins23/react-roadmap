import { useEffect, useState } from "react";
import Message from "./Message";

function SimpleForm() {

    const [formState, setFormState] = useState({
        username: 'johnDoe',
        email: 'johndoe@example.com'
    })

    const { username, email } = formState;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    useEffect(() => {
        console.log('useEffect has happened!!')
    }, []);

    useEffect(() => {
        console.log('formState has changed!!')
    }, [formState]);

    useEffect(() => {
        console.log('email has changed!!')
    }, [email]);

    return (
        <>
            <h1>Simple Form</h1>
            <hr />

            <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange} />

            <input
                type="email"
                className="form-control mt-2"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />

            {username === 'johnDoe2' && <Message />}
        </>
    )
}

export default SimpleForm;