import "./LeftSide.css";
import { useLoginStore } from "../../store/login";
import { logInUser, registerUser } from "../../api/api";
import { useState } from "react";

const LeftSide = () => {

    const {loggedIn, logIn, logOut} = useLoginStore();

    const [successMessage, setSuccesMessage] = useState('');

    const displayMessage = (message: string) => {
        setSuccesMessage(message);
        setTimeout(() => {
            setSuccesMessage('');
        }, 10000
    );
    }

    const handleRegister = async () => {
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        const response = await registerUser(username, email, password);

        if (response.success) {
            displayMessage(`Registered under username ${response.data.username}`)
        } else displayMessage(response.message)
        
    }

    const handleLogin = async () => {
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        const response = await logInUser(password, email, username);

        if (response.success) {
            displayMessage('Logged in');
            logIn();
            localStorage.setItem('token', response.data);
        } else displayMessage(response.message);

    }

    const handleLogout = () => {
        logOut();
        localStorage.removeItem('token');
        displayMessage('Logged out');
    }

    return (
        <div className="left-side">
            {loggedIn?
            <>
                <button onClick={handleLogout}>Log out</button>
                <button>My account</button>
            </>
            :
            <>
                <label htmlFor="email">E-mail:</label>
                <input id="email" type="text" />
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" />
                <label htmlFor="password">Password:</label>
                <input id="password" type="text" />
                <button onClick={handleLogin}>Log in</button>
                <button onClick={handleRegister}>Register</button>
            </>
            }
            <p>{successMessage}</p>
        </div>
    );

}

export default LeftSide;