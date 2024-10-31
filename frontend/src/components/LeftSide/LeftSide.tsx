import "./LeftSide.css";
import { useLoginStore } from "../../store/login";
import { registerUser } from "../../api/api";

const LeftSide = () => {

    const {loggedIn, logIn, logOut} = useLoginStore();

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
                <button >Register</button>
            </>
            }
        </div>
    );

}

export default LeftSide;