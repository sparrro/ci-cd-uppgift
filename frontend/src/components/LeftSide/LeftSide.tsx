import "./LeftSide.css";
import { useLoginStore } from "../../store/login";
import { registerUser } from "../../api/api";

const LeftSide = () => {

    const {loggedIn, logIn, logOut} = useLoginStore();

    const handleRegister = () => {
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        const user = registerUser(username, email, password);

        console.log(user);
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
        </div>
    );

}

export default LeftSide;