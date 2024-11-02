import { getAllMeetups } from "../../api/api";
import "./RightSide.css"
import Meetup from "../Meetup/Meetup";
import { useDisplayStore } from "../../store/display";
import { useEffect } from "react";
import { sortByDate } from "../../interfaces/Meetup";

const RightSide = () => {

    const {display, swapDisplay} = useDisplayStore();

    
    const renderInitial = async () => {
        const data = await getAllMeetups();
        let meetups = data.data;
        meetups = sortByDate(meetups);
        swapDisplay(meetups.map((meetup: any) => <Meetup 
            name={meetup.meetupName}
            host={meetup.host}
            time={meetup.meetupTime}
            place={meetup.place}
        />))
    }
    useEffect(() => {
        renderInitial();
    }, [])

    return (
        <div className="right-side">
            {display}
        </div>
    );

}

export default RightSide;