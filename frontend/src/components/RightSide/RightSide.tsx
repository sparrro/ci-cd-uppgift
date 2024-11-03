import { getAllMeetups } from "../../api/api";
import "./RightSide.css"
import Meetup from "../Meetup/Meetup";
import { useDisplayStore } from "../../store/display";
import { useOverlayStore } from "../../store/overlay";
import { useEffect } from "react";
import { MeetupInterface, sortByDate } from "../../interfaces/Meetup";

const RightSide = () => {

    const {display, swapDisplay} = useDisplayStore();

    const {showOverlay, overlayContent, swapOverlayContent, toggleOverlay} = useOverlayStore();
    
    const renderInitial = async () => {
        const data = await getAllMeetups();
        let meetups = data.data;
        meetups = sortByDate(meetups);
        swapDisplay(meetups.map((meetup: MeetupInterface) => <Meetup {...meetup} overlayToggler={toggleOverlay} overlayContenter={swapOverlayContent} key={meetup.id} />))
    }
    useEffect(() => {
        renderInitial();
    }, [])

    return (
        <div className="right-side">
            <h2>Meetups:</h2>
            {showOverlay && overlayContent}
            {display}
        </div>
    );

}

export default RightSide;