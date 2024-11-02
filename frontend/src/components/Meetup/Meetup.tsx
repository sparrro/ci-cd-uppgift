import { MeetupInterface } from "../../interfaces/Meetup";
import "./Meetup.css";

const Meetup = ({meetupName, host, meetupTime, place}: MeetupInterface) => {

    return (
        <div className="meetup-item">
            <h3>{meetupName}</h3>
            <p><strong>Host:</strong> {host}</p>
            <p><strong>Time:</strong> {meetupTime}</p>
            <p><strong>Place:</strong> {place}</p>
            <button id="details-btn">Details</button>
        </div>
    )
}

export default Meetup