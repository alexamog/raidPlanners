import { useState } from "react"
import axios from "axios"

export default function Test() {
    const [loginData, setLoginData] = useState({
        "email": null,
        "password": null
    });

    const setPost = (data) => {
        // axios.defaults.withCredentials = true
        axios.post("http://localhost:3001/auth/login", data, { withCredentials: true })
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err));
    }

    const setPostGet = () => {
        axios.get("http://localhost:3001/user", { withCredentials: true })
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err));
    }
    const logout = (data) => {
        axios.post("http://localhost:3001/auth/logout", data, { withCredentials: true })
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

    const handleClickLogout = (e) => {
        e.preventDefault();
        logout({ ...loginData });
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
            <button onClick={handleClickLogout}>Logout</button>

        </div>
    )
}