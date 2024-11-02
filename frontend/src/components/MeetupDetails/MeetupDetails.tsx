import { useEffect, useState } from "react";
import { registerToMeetup, unRegisterToMeetup } from "../../api/api";
import { MeetupInterface } from "../../interfaces/Meetup";
import "./MeetupDetails.css";

export const MeetupDetails = ({id, meetupName, host, meetupTime, place, attendees, maxattendees, desc}: MeetupInterface) => {
    
    const [registrationMessage, setRegistrationMessage] = useState('');

    const [isRegistered, setIsRegistered] = useState(false);

    const [localAttendees, setLocalAttendees] = useState(attendees);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user && attendees.includes(user)) {
            if (attendees.includes(localStorage.user)) setIsRegistered(true);
        }
    }, []);

    const displayRegMess = (message: string) => {
        setRegistrationMessage(message);
        setTimeout(() => {
            setRegistrationMessage('');
        }, 10000);
    }

    const handleRegisterAttendance = async (id: string) => {
        const user = localStorage.user;
        const token = localStorage.token;

        if (user && token) {
            const response = await registerToMeetup(id, token);
            if (response.data.joined) {
                setLocalAttendees([...localAttendees, user]);
                setIsRegistered(true);
                displayRegMess(response.data.message);
            } else displayRegMess(`${response.data.message}`);
        } else displayRegMess("You're not logged in");
    }
    
    const handleUnRegister = async (id: string) => {
        const user = localStorage.user;
        const token = localStorage.token;

        if (user && token) {
            const response = await unRegisterToMeetup(id, token);
            if (response.data.unJoined) {
                setLocalAttendees(attendees.filter(attendee => attendee != user))
                setIsRegistered(false);
                displayRegMess(response.data.message);
            } else displayRegMess(response.data.message);
        } else displayRegMess("You're not logged in");
    }

    return (
        <div className="meetup-details">
            <h2>{meetupName}</h2>
            <p>{desc}</p>
            <p><strong>When:</strong> {meetupTime}</p>
            <p><strong>Where:</strong> {place}</p>
            <p><strong>Host:</strong> {host}</p>
            <p><strong>Attendees:</strong> {attendees.length}/{maxattendees}</p>
            {isRegistered?
            <button onClick={() => handleUnRegister(id)}>Leave</button>:
            <button onClick={() => handleRegisterAttendance(id)}>Join</button>}
            <p>{registrationMessage}</p>
        </div>
    )
}