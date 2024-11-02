import { getAllMeetups } from "../../api/api";
import "./RightSide.css"
import Meetup from "../Meetup/Meetup";
import { useDisplayStore } from "../../store/display";
import { useEffect, useState } from "react";
import { MeetupInterface, sortByDate } from "../../interfaces/Meetup";
import { MeetupDetails } from "../MeetupDetails/MeetupDetails";

const RightSide = () => {

    const {display, swapDisplay} = useDisplayStore();

    const [showOverlay, setShowOverlay] = useState(true);
    
    const renderInitial = async () => {
        const data = await getAllMeetups();
        let meetups = data.data;
        meetups = sortByDate(meetups);
        swapDisplay(meetups.map((meetup: MeetupInterface) => <Meetup {...meetup} key={meetup.id} />))
    }
    useEffect(() => {
        renderInitial();
    }, [])

    return (
        <div className="right-side">
            {showOverlay && <MeetupDetails id="1" meetupName="Jedi Training" host="Anakin" meetupTime="2024-11-15" place="Coruscant" desc="We'll be doing some weed" attendees={["Yoda", "Kit Fisto", "Aayla Secura"]} maxattendees={4} />}
            {display}
        </div>
    );

}

export default RightSide;