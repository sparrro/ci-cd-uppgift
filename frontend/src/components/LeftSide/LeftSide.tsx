import "./LeftSide.css";
import { useLoginStore } from "../../store/login";
import { getAllMeetups, logInUser, registerUser } from "../../api/api";
import { useState } from "react";
import { MeetupInterface, sortByDate } from "../../interfaces/Meetup";
import { useDisplayStore } from "../../store/display";
import Meetup from "../Meetup/Meetup";
import { useOverlayStore } from "../../store/overlay";

const LeftSide = () => {

    const {loggedIn, logIn, logOut} = useLoginStore();

    const {swapDisplay} = useDisplayStore();

    const {toggleOverlay, swapOverlayContent} = useOverlayStore();

    const [successMessage, setSuccesMessage] = useState('');

    const displayMessage = (message: string) => {
        setSuccesMessage(message);
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
            logIn();
            sessionStorage.setItem('token', response.data);
            sessionStorage.setItem('user', username);
            displayMessage(`Logged in as ${username}`)
        } else displayMessage(response.message);

    }

    const handleLogout = () => {
        logOut();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        displayMessage('Logged out');
    }

    const handleSearch = async () => {
        const searchInput = (document.getElementById("search") as HTMLInputElement).value.toLowerCase();
        const data = await getAllMeetups();
        const matches = data.data.filter((meetup: MeetupInterface) => {
            return (
                meetup.meetupName.toLowerCase().includes(searchInput)
                || meetup.description.toLowerCase().includes(searchInput)
                || meetup.place.toLowerCase().includes(searchInput)
            );
        });
        const sortedMatches = sortByDate(matches);
        swapDisplay(sortedMatches.map((match: MeetupInterface) => <Meetup {...match} overlayToggler={toggleOverlay} overlayContenter={swapOverlayContent} />))
    }

    const handleMyMeetups = async () => {
        const user = sessionStorage.getItem('user');
        if (user) {    
            const data = await getAllMeetups();
            const matches = data.data.filter((meetup: MeetupInterface) => {
                return meetup.attendees.includes(user);
            });
            const myMeetups = sortByDate(matches);
            swapDisplay(myMeetups.map(meetup => <Meetup {...meetup} overlayContenter={swapOverlayContent} overlayToggler={toggleOverlay} />));
        }
    }

    return (
        <div className="left-side">
            <h2>Account & Search</h2>
            {loggedIn?
            <>
                <button onClick={handleLogout}>Log out</button>
                <button onClick={handleMyMeetups}>My meetups</button>
            </>
            :
            <>
                <label htmlFor="email">E-mail:</label>
                <input id="email" type="text" />
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" />
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" />
                <button onClick={handleLogin}>Log in</button>
                <button onClick={handleRegister}>Register</button>
            </>
            }
            <p>{successMessage}</p>
            <input type="text" id="search" />
            <button onClick={handleSearch}>Search</button>
        </div>
    );

}

export default LeftSide;