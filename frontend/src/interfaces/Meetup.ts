export interface MeetupInterface {
    id: string;
    host: string;
    meetupName: string;
    description: string;
    meetupTime: string;
    place: string;
    attendees: string[];
    maxAttendees: number;
    overlayToggler: () => void;
    overlayContenter: (content: any) => void;
}
export const sortByDate = (meetups: MeetupInterface[]) => {
    return meetups.sort((a, b) => new Date(a.meetupTime).getTime() - new Date(b.meetupTime).getTime())
}