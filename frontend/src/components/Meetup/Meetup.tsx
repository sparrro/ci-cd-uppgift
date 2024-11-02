import "./Meetup.css";

const Meetup = ({name, host, time, place}: {name: string, host: string, time: string, place: string}) => {



    return (
        <div className="meetup-item">
            <h3>{name}</h3>
            <p><strong>Host:</strong> {host}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Place:</strong> {place}</p>
            <button id="details-btn">Details</button>
        </div>
    )
}

export default Meetup