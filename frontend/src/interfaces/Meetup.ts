export interface MeetupInterface {
    id: string;
    host: string;
    meetupName: string;
    desc: string;
    meetupTime: string;
    place: string;
    attendees: string[];
    maxattendees: number;
    overlayToggler: () => void;
    overlayContenter: (content: any) => void;
}
export const sortByDate = (meetups: MeetupInterface[]) => {
    return meetups.sort((a, b) => new Date(a.meetupTime).getTime() - new Date(b.meetupTime).getTime())
}