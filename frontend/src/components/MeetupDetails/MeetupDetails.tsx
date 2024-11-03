import { registerToMeetup, unRegisterToMeetup } from "../../api/api";
import { useEffect, useState } from "react";
import { MeetupInterface } from "../../interfaces/Meetup";
import "./MeetupDetails.css";
import { getMeetup } from "../../api/api";

export const MeetupDetails = ({id, overlayToggler, overlayContenter}: MeetupInterface) => {

    const [meetup, setMeetup] = useState({
        meetupName: '',
        description: '',
        meetupTime: '',
        place: '',
        host: '',
        attendees: [''],
        maxAttendees: 0
    });

    const [message, setMessage] = useState('');

    const fetchMeetup = async () => {
        const data = await getMeetup(id);
        setMeetup(data.data);
    }

    useEffect(() => {
        fetchMeetup();
    }, []);

    const handleJoin = async () => {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');
        if (token && user) {
            const data = await registerToMeetup(id, token);
            if (data.data.joined) {
                setMeetup({...meetup, attendees: [...meetup.attendees, user]})
                setMessage(data.data.message);
            } else {
                setMessage(data.data.message);
            }
        }
    }

    const handleLeave = async () => {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');
        if (token && user) {
            const data = await unRegisterToMeetup(id, token);
            if (data.data.unjoined) {
                setMeetup(prevMeetup => ({
                    ...prevMeetup,
                    attendees: prevMeetup.attendees.filter(attendee => attendee != user)
                }));
                setMessage(data.data.message);
            } else {
                setMessage(data.data.message);
            }
        }
    }

    return (
        <div className="meetup-details">
            <button onClick={() => {overlayContenter(null); overlayToggler();}} >X</button>
            <h2>{meetup.meetupName}</h2>
            <p>{meetup.description}</p>
            <p><strong>When:</strong> {meetup.meetupTime}</p>
            <p><strong>Where:</strong> {meetup.place}</p>
            <p><strong>Host:</strong> {meetup.host}</p>
            <p><strong>Attendees:</strong> {meetup.attendees.length}/{meetup.maxAttendees}</p>
            <button onClick={handleJoin}>Join</button>
            <button onClick={handleLeave}>Leave</button>
            <p>{message}</p>
        </div>
    )
}