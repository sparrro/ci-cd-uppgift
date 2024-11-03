import { getAllMeetups } from "../../api/api";
import "./RightSide.css"
import Meetup from "../Meetup/Meetup";
import { useDisplayStore } from "../../store/display";
import { useEffect, useState } from "react";
import { MeetupInterface, sortByDate } from "../../interfaces/Meetup";

const RightSide = () => {

    const {display, swapDisplay} = useDisplayStore();

    const [showOverlay, setShowOverlay] = useState(false);

    const [overlayContent, setOverlayContent] = useState(null);

    const overlayContenter = (content: any) => {
        setOverlayContent(content)
    }

    const overlayToggler = () => {
        setShowOverlay(!showOverlay);
    }
    
    const renderInitial = async () => {
        const data = await getAllMeetups();
        let meetups = data.data;
        meetups = sortByDate(meetups);
        swapDisplay(meetups.map((meetup: MeetupInterface) => <Meetup {...meetup} overlayToggler={overlayToggler} overlayContenter={overlayContenter} key={meetup.id} />))
    }
    useEffect(() => {
        renderInitial();
    }, [])

    return (
        <div className="right-side">
            {showOverlay && overlayContent}
            {display}
        </div>
    );

}

export default RightSide;