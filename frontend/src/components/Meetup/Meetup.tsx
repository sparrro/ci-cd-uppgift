import { MeetupInterface } from "../../interfaces/Meetup";
import { MeetupDetails } from "../MeetupDetails/MeetupDetails";
import "./Meetup.css";

const Meetup = ({id, meetupName, desc, host, meetupTime, place, attendees, maxattendees, overlayToggler, overlayContenter}: MeetupInterface) => {

    const handleDetails = () => {

        overlayToggler();
        overlayContenter(<MeetupDetails id={id} meetupName={meetupName} host={host} meetupTime={meetupTime} place={place} attendees={attendees} maxattendees={maxattendees} desc={desc} overlayContenter={overlayContenter} overlayToggler={overlayToggler} />);
    }

    return (
        <div className="meetup-item">
            <h3>{meetupName}</h3>
            <p><strong>Host:</strong> {host}</p>
            <p><strong>Time:</strong> {meetupTime}</p>
            <p><strong>Place:</strong> {place}</p>
            <button id="details-btn" onClick={handleDetails}>Details</button>
        </div>
    )
}

export default Meetup