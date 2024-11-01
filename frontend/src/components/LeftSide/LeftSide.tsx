import "./LeftSide.css";
import { useLoginStore } from "../../store/login";
import { registerUser } from "../../api/api";
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
        }
        
    }

    return (
        <div className="left-side">
            {loggedIn?
            <>
                <button onClick={logOut}>Log out</button>
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
                <button onClick={logIn}>Log in</button>
                <button onClick={handleRegister}>Register</button>
            </>
            }
            <p>{successMessage}</p>
        </div>
    );

}

export default LeftSide;