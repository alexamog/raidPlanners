import { useState } from "react"
import axios from "axios"

export default function Test() {
    const [loginData, setLoginData] = useState({
        "email": null,
        "password": null
    });

    const setPost = (data) => {
        axios.post("http://localhost:3001/auth/login", data)
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err));
    }

    const setPostGet = async () => {
        await fetch('http://localhost:8080/auth/testAPI', { mode: 'cors' })
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err));
    }

    const handleClick = (e) => {
        e.preventDefault();
        setPost({ ...loginData })
    };

    const handleClickGET = (e) => {
        e.preventDefault();
        setPostGet()
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <label>Email: </label>
                <input type='email' onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                <label>Password: </label>
                <input type='password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                <button onClick={handleClick} type='submit'>Test POST</button>
            </form>
            <button onClick={handleClickGET} type='submit'>Test GET</button>

        </div>
    )
}